FROM node:17
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied

WORKDIR /app

COPY . /app

ENV PORT=3000

ENV COMBINED_LOGFILE=logs/log.txt

ENV ERROR_LOGFILE=logs/errors.txt

RUN npm install \
    && npm run build\
    && rm -rf node_modules

EXPOSE 3000

CMD ["npm", "run", "start"]