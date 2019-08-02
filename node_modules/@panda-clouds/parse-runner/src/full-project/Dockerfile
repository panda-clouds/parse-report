FROM pandaclouds/parse-coverage:3.1.3

USER root

RUN apk update && \
    apk upgrade && \
    apk add git && \
    npm i --save parse-server-amazon-ses-adapter && \
    mkdir -p '/parse-server/cloud'

ADD . /parse-server/cloud

USER node