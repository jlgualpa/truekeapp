#FROM node:12-alpine as ng-build
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
# COPY --from=ng-build /app/dist/app /usr/share/nginx/html
RUN rm -rf /usr/share/nginx/html/* && rm -rf /etc/nginx/nginx.conf
COPY ./nginx.conf /etc/nginx/nginx.conf
#COPY --from=ng-build /app/dist/TruekeApp /usr/share/nginx/html
COPY --from=node /app/dist/TruekeApp /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]