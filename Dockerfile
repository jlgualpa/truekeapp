#FROM node:12-alpine as ng-build
FROM node:12-alpine as ng-build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine

COPY --from=ng-build /app/dist/TruekeApp /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]