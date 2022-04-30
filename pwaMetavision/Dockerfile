# # ./Dockerfile

# FROM node:16-alpine as node-angular-cli

# LABEL authors="Pieter Pauwels"

# # Linux setup
# # I got this from another, deprecated Angular CLI image.
# # I trust that developer, so I continued to use this, but you
# # can leave it out if you want.
# RUN apk update \
#   && apk add --update alpine-sdk \
#   && apk del alpine-sdk \
#   && rm -rf /tmp/* /var/cache/apk/* *.tar.gz ~/.npm \
#   && npm cache verify \
#   && sed -i -e "s/bin\/ash/bin\/sh/" /etc/passwd

# # Angular CLI
# RUN npm install -g @angular/cli

#stage 1
FROM node:16 as node
WORKDIR /app
COPY . .
RUN npm install --force
RUN npm run build --prod
#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/pwaMetavision /usr/share/nginx/html
