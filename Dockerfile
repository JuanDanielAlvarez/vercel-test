# Use the official Node.js image as a base
FROM node:16-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the application files
COPY . .

# Expose the server port
EXPOSE 3000

# Start the Nest.js server
CMD ["npm", "run", "start"]