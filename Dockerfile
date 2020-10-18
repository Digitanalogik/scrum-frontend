# =====================
# STEP 1: build container
# =====================
FROM node:14-alpine AS build

WORKDIR /app

# Install dependencies before building to exploit image caching.
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --verbose

# Copy the rest and build the frontend.
COPY . .
RUN yarn run build

# =====================
# STEP 2: run container
# =====================
#
# Make an nginx container and both serve the built files and
# act as a reverse proxy to a backend running on the same
# Docker network.
FROM nginx:1.18

# add the built app files to the run container
COPY --from=build /app/build /usr/share/nginx/html

# add the nginx config file
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# run nginx
CMD nginx -g 'daemon off;'
