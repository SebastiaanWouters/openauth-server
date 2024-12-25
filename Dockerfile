FROM       oven/bun
WORKDIR    /app
COPY       . /app
EXPOSE     3000
CMD        ["bun", "run", "index.ts"]