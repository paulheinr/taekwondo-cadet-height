FROM node AS ui-build
WORKDIR /usr/src/app
COPY my-app/ ./my-app/
RUN rm -rf my-app/node_modules

COPY bin/localhost.pem ./bin/
COPY bin/localhost-key.pem ./bin/

RUN cd my-app && npm install && npm run build

FROM node AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app/my-app/dist ./my-app/dist

COPY bin/localhost.pem ./bin/
COPY bin/localhost-key.pem ./bin/

COPY api/package*.json ./api/
RUN cd api && npm install
COPY api/server.js ./api/
COPY api/cadets.db ./

EXPOSE 3070

CMD node ./api/server.js