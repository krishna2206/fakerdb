# FakerDB landing

Early access page for FakerDB v2, live at https://fakerdb.the10x.tech.

It is a Cloudflare Worker with static assets: `public/` is served as-is, and `src/worker.js` handles one endpoint, `POST /api/waitlist`, which stores signups in the D1 database `fakerdb-waitlist`.

## Deploy

```bash
npx wrangler deploy
```

## Database

Create the table once:

```bash
npx wrangler d1 execute fakerdb-waitlist --remote --file schema.sql
```

List signups:

```bash
npx wrangler d1 execute fakerdb-waitlist --remote --command "SELECT email, source, country, created_at FROM waitlist ORDER BY created_at DESC"
```
