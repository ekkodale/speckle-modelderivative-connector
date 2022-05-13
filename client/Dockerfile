FROM node:16.5.0

# Create app directory
WORKDIR /usr/src/app

# Expose port for service
EXPOSE 8080

# Copy source code to image
COPY . .

# Install dependencies
RUN npm install 

#Start app
CMD ["npm", "start"]