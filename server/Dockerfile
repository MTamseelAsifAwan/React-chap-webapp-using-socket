# Use Node.js base image
FROM node:14

# Create and set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy server code
COPY . .

# Expose the port the app runs on
EXPOSE 4000

# Start the app
CMD [ "npm", "start" ]
