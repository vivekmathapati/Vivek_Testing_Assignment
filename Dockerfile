# Use official Node.js LTS image
FROM mcr.microsoft.com/playwright:v1.44.0-jammy

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the project
COPY . .

# Install Playwright browsers (already present in base image, but safe to re-run)
RUN npx playwright install --with-deps

# Expose any ports if needed (e.g., for local web servers)
EXPOSE 5090

# Default command (can be overridden)
CMD ["npx", "playwright", "test"]
