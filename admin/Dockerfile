# Use official Node.js image with Debian
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Install system dependencies for Node packages
RUN apk add --no-cache python3 make g++

# Copy package.json and package-lock.json from the admin folder
COPY admin/package.json admin/package-lock.json ./

# Install dependencies using npm ci for better compatibility
RUN npm ci || npm install

# Copy the rest of the application code from the admin folder
COPY admin .

# Build the Next.js application
RUN npm run build

# Production image
FROM node:20-alpine AS runner

# Set NODE_ENV to production
ENV NODE_ENV=production

# Set the working directory
WORKDIR /app

# Copy built output and node_modules from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose the port Next.js runs on
EXPOSE 3050

# Start the application
CMD ["node", "node_modules/.bin/next", "start", "-p", "3050"]
