# Immigration Act of 1924 — Q&A Website

Interactive website for our English class presentation. Classmates can ask questions about the Immigration Act of 1924 and get answers from "us" (powered by Gemini AI pretending to be two awkward students).

## Project Structure

```
├── index.html          # Frontend page
├── style.css           # Styles
├── app.js              # Frontend JavaScript (chat logic)
├── worker/             # Cloudflare Worker (backend)
│   ├── src/index.js    # Worker code (Gemini API proxy)
│   ├── wrangler.toml   # Worker configuration
│   └── package.json    # Worker dependencies
└── README.md
```

## Deployment

### 1. Deploy the Cloudflare Worker (Backend)

```bash
cd worker
npm install
npx wrangler login          # Login to Cloudflare
npx wrangler deploy         # Deploy the worker
```

The worker will be deployed to something like `immigration-act-worker.<your-subdomain>.workers.dev`.

> **Important**: For production, move the API key to a secret:
> ```bash
> npx wrangler secret put GEMINI_API_KEY
> ```
> Then remove the `GEMINI_API_KEY` line from `wrangler.toml`.

### 2. Deploy the Frontend to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Pages**
2. Create a new project → Upload the `index.html`, `style.css`, and `app.js` files
3. Set custom domain: `immigrationact.suppenstudios.work`

### 3. Connect Frontend to Worker

You have two options:

**Option A: Cloudflare Pages Functions (Recommended)**
Create a `functions/api/ask.js` file that proxies to the worker — or deploy the worker logic directly as a Pages Function.

**Option B: Direct Worker URL**
Update `WORKER_URL` in `app.js` to point to your worker URL, e.g.:
```js
const WORKER_URL = 'https://immigration-act-worker.<subdomain>.workers.dev/api/ask';
```

**Option C: Custom Domain Route (Best)**
In Cloudflare Dashboard → Workers → Routes, add a route:
- Route: `immigrationact.suppenstudios.work/api/*`
- Worker: `immigration-act-worker`

This way the frontend's `/api/ask` calls go directly to the worker with no CORS issues.

## Local Development

For local testing with a simple server:
```bash
# In the root directory
npx serve .

# In another terminal, for the worker
cd worker
npm install
npx wrangler dev
```

Then update `WORKER_URL` in `app.js` to `http://localhost:8787/api/ask` for local testing.
