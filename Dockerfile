# State 1 - the build process
FROM node:13-alpine as build
# RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
# RUN yarn build-2
# WORKDIR ./dist

# Stage 2 - the production environment
# FROM node:13-alpine
# WORKDIR /usr/src/app
# COPY --from=build /usr/src/app/dist /usr/src/app
# COPY --from=build /usr/src/app/node_modules /usr/src/app/node_modules
EXPOSE 8081
CMD [ "node", "server.js" ]