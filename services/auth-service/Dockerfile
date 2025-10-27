
FROM node:20-alpine

WORKDIR /app

RUN apk update && apk upgrade

# Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application files
COPY . .

# Expose the port your NestJS gateway runs on
EXPOSE 3000

# Command to start the app
CMD ["npm", "run", "start"]
