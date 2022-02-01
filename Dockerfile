FROM node:17-bullseye-slim

RUN apt-get update && \
    apt-get install -y procps libfontconfig bzip2 wget gnupg

RUN npm install -g nest