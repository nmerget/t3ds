FROM node:24-alpine
WORKDIR /app
COPY packages/app/.output .output
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
