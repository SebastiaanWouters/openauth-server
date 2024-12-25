FROM       oven/bun
WORKDIR    /app
COPY       . /app
RUN        bun install
EXPOSE     3000
CMD        ["bun", "run", "index.ts"]