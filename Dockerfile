FROM node:12-alpine as ng-build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
# COPY --from=ng-build /app/dist/app /usr/share/nginx/html
COPY --from=ng-build /app/dist/TruekeApp /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]