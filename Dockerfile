# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY .  .

# Install project dependencies
RUN npm install

# Build the project
RUN npm run build

# Expose the port on which your Node.js application will run
EXPOSE 3000

# Run the Node.js application
CMD ["npm", "start"]
