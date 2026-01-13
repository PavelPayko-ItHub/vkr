# Build image
FROM registry.axelpro.io/devops/baseimages/node:18 as builder

WORKDIR /app

# Install dependencies only if they changed
COPY package*.json /app/
RUN npm install

COPY . /app/

RUN npm run build:prod

# Application image
FROM registry.axelpro.io/devops/baseimages/nginx:1.23

EXPOSE 3000

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build/ /usr/share/nginx/html
