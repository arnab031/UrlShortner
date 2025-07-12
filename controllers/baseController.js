const db = require("../configuration/firebaseConfig");
const geoip = require("geoip-lite");
const UAParser = require("ua-parser-js");

const { customAlphabet } = require("nanoid");
const bigquery = require("../configuration/bigqueryConfig");
const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  12
);

module.exports = {
  async test(req, res) {
    res.json({ message: "Test endpoint is working!" });
  },

  async storeShortUrl(req, res) {
    const { longUrl } = req.body;
    const shortCode = nanoid(12); // Generate a unique short code
    await db
      .collection("ShortLinks")
      .doc(shortCode)
      .set({
        longUrl,
        createdAt: new Date(),
        // clickLimit: 1000,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      });

    console.log("Short URL stored:", shortCode);

    res.json({
      message: "Short URL created successfully",
      shortUrl: `${process.env.BASE_URL + "/" + shortCode}`, // Replace with your actual domain
    });
  },

  async getLongUrl(req, res) {
    const { shortCode } = req.params;
    const doc = await db.collection("ShortLinks").doc(shortCode).get();
    if (!doc.exists) {
      res.redirect("https://utsavapp.in"); // Replace with your actual 404 page
      return;
    }

    const data = doc.data();
    if (data.expiresAt && data.expiresAt.toDate() < new Date()) {
      res.redirect("https://utsavapp.in"); // Replace with your actual 404 page
      return;
    }

    const ua = new UAParser(req.headers["user-agent"]);
    const geo = geoip.lookup(
      req.headers["x-forwarded-for"] || req.socket.remoteAddress
    );

    res.redirect(data.longUrl);

    console.log("Geo data:", geo);

    const clickedData = {
      shortCode,
      timestamp: new Date(), // This must be a JS Date object or ISO string
      ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress || "",
      userAgent: req.headers["user-agent"] || "",
      referer: req.headers["referer"] || "",
      city: geo?.city || "",
      state: geo?.region || "",
      country: geo?.country || "",
      device: ua.getDevice().type || "desktop",
      os: ua.getOS().name || "",
      browser: ua.getBrowser().name || "",
    };

    console.log("Click data:", clickedData);
    try {
      await bigquery
        .dataset("url_analytics")
        .table("click_events")
        .insert([clickedData]);
      console.log("Row inserted into BigQuery ✅");
    } catch (err) {
      console.error("❌ BigQuery insert failed:", err);
      if (err.name === "PartialFailureError" && err.errors) {
        err.errors.forEach((e) => console.error("Row error:", e));
      }
    }
  },
};
