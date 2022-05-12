FROM node:lts-bullseye

WORKDIR /usr/src/smartbrainbackend

COPY ./ ./

RUN yarn 

CMD [ "/bin/bash" ]