FROM node:19-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY .env ./
COPY tsconfig.json ./
COPY src ./src
COPY prisma ./prisma
RUN npx prisma generate
RUN npm run build

FROM node:19-alpine
ENV NODE_ENV=production
#RUN apk add --no-cache tini
WORKDIR /app
# RUN chown                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           node:node ./
# USER node
COPY package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./dist/node_modules
EXPOSE 3333
#ENTRYPOINT ["sbin/tini", "--", "node", "dist/server.js"];
ENTRYPOINT node dist/server.js