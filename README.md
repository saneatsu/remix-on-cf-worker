# Remix + Cloudflare Workers for comparison Prisma and Drizzle

This repository a rewrite of what I did with [Remix + Cloudflare Pages](https://github.com/saneatsu/remix-on-cf-pages ) for Cloudflare Worker.

## Background

While developing with Remix and Cloudflare, we encountered a phenomenon where TTFB took more than 4 seconds.

The cause may be that Prisma is used as an ORM, so we measured TTFB using Prisma and Drizzle.

## Development

Run the dev server with using `.env.development`

```sh
pnpm run dev
```

To run Wrangler:

```sh
npm run build
npm start
```

## Deployment

First, edit `.env.production` for using Turso.

```.env.production
VITE_TURSO_URL=libsql://.turso.io
VITE_TURSO_AUTH_TOKEN=eyJxxx
```

Deploy.

```sh
pnpm run deploy
```
