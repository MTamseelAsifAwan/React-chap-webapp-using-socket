# Use Node.js base image for building
FROM node:14 AS build

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy client code
COPY . .

# Build the client app
RUN npm run build

# Use Nginx base image for serving
FROM nginx:alpine

# Copy build files to Nginx public directory
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
