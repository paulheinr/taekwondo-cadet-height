FROM node AS ui-build
WORKDIR /usr/src/app
COPY my-app/ ./my-app/
RUN cd my-app && npm install && npm run build

FROM node AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app/my-app/dist ./my-app/dist
COPY api/package*.json ./api/
RUN cd api && npm install
COPY api/server.js ./api/

EXPOSE 3070

CMD ["node", "./api/server.js"]