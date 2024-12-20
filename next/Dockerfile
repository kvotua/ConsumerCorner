FROM oven/bun:1 as base
WORKDIR /app/react-app

COPY ./package.json ./package.json
RUN bun install
COPY . .
RUN bun --bun run build
CMD ["bun", "--bun", "run", "start"]