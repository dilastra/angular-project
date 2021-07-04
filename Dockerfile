FROM node:14.16.1-alpine3.10 AS builder

# set working directory
WORKDIR /home/app
COPY . /home/app

# Build
RUN npm install
RUN npm run build

FROM nginx:1.12-alpine

COPY --from=builder /home/app/dist/apps/frontend /var/www/frontend
COPY --from=builder /home/app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
