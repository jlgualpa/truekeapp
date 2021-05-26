#FROM node:12-alpine as ng-build
FROM node:12-alpine as ng-build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
#RUN rm -rf /usr/share/nginx/html/* && rm -rf /etc/nginx/nginx.conf
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=ng-build /app/dist/TruekeApp /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]