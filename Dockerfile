# Use official Node.js slim base image
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy package.json and lock file first (Docker cache optimization)
COPY package*.json ./

# Install dependencies
RUN echo "📦 Installing NPM dependencies..." && \
    npm install --verbose && \
    echo "✅ NPM install complete"

# Copy app source code
COPY . .

# Make start script executable (if needed)
RUN chmod +x build.sh || true

# Ensure directory permissions and security best practice
RUN chown -R node:node /app
USER node

# Expose the port your app listens on
EXPOSE 8080

# Run the server
CMD ["npm", "start"]
