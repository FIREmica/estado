### Stage 1: Build the Angular application
FROM node:18-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production

### Stage 2: Serve the application from Nginx
FROM nginx:1.23-alpine
COPY --from=build /usr/src/app/dist/catalog-ui /usr/share/nginx/html
# Copy a custom nginx configuration to handle SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80