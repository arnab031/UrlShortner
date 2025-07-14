const express = require("express");
const {
  test,
  storeShortUrl,
  getLongUrl,
  baseUrl,
} = require("../controllers/baseController");
const router = express.Router({ mergeParams: true });

router.get("/test", test);

router.get("/", baseUrl);

router.post("/storeShortUrl", storeShortUrl);

router.get("/UTSV", getLongUrl);

module.exports = router;
