FROM node:10 as ng-build
WORKDIR /app
COPY . .
RUN npm 
RUN npm build

FROM nginx:alpine
COPY --from=ng-build /app/dist/app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]