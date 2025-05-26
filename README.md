- https://developers.cloudflare.com/workers/platform/triggers/cron-triggers/
- https://developers.cloudflare.com/workers/
- https://discord.com/developers/docs/resources/webhook#execute-webhook
- https://developers.cloudflare.com/workers/configuration/secrets/

```sh
pnpm dev
curl "http://localhost:8787/__scheduled?cron=*+*+*+*+*"
pnpm run deploy
pnpm cf-typegen
```

```sh
pnpm wrangler secret put DISCORD_WEBHOOK_URL
pnpm wrangler secret put GEMINI_API_KEY
pnpm wrangler kv namespace create FINVIZ_NEWS
```

- https://www.npmjs.com/package/ky
- https://github.com/cheeriojs/cheerio
- https://googleapis.github.io/js-genai/release_docs

```sh
pnpm add cheerio ky @google/genai
```
