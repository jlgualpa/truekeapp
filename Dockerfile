FROM node:10 as ng-build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
RUN npm build

WORKDIR ./dist

FROM nginx:alpine
COPY --from=ng-build /app/dist/app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]