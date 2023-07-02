FROM node:18.15.0-bullseye AS build

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install project dependencies
COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/
RUN yarn install

COPY . /usr/src/app

# Validate typescript is correct
RUN node_modules/.bin/tsc

# Build the app statically
RUN yarn build

# Add script to inject REACT_APP_* env vars into index.html
COPY scripts/injectEnv.js ./usr/src/app/build/injectEnv.js

# Serve app statically via nginx
FROM nginx

WORKDIR /usr/src/app

# Copy nginx config and static files
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Move entrypoint script to image
COPY ./entrypoint.sh /usr/src/app/entrypoint.sh

EXPOSE 80

ENTRYPOINT [ "./entrypoint.sh" ]
