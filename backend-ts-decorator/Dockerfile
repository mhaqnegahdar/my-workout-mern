# Use an official Node.js runtime as the base image
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port the application runs on
EXPOSE 8000

# Start the application
CMD ["npm", "start"]


# Build Image Command
# docker build -t mhaqnegahdar/backend-ts-decorator:1.0 .

# Run Image Command
# docker run --env-file .env -p 3000:3000 your-image-name


