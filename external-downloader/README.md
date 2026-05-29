# GrabTube Self-Hosted Downloader Backend

A small FastAPI service that wraps **yt-dlp** to extract direct download URLs for YouTube videos. This is what powers the "real" download capability of your site (similar to how y2mate works under the hood).

> Lovable Cloud (Cloudflare Workers) cannot run yt-dlp because it needs Python + ffmpeg native binaries. That's why this lives in its own repo/deploy.

---

## Deploy in 5 minutes

### Option A — Render.com (recommended, free tier)

1. Push this `external-downloader/` folder to a new GitHub repo (just these 3 files).
2. Go to https://render.com → **New +** → **Web Service** → connect the repo.
3. Settings:
   - **Runtime:** Docker
   - **Plan:** Free
   - **Environment variables:**
     - `API_TOKEN` = any long random string (e.g. run `openssl rand -hex 32`). **Save it — you'll paste it in Lovable.**
4. Click **Create Web Service**. Wait ~3 min for build.
5. Copy the live URL (e.g. `https://grabtube-api.onrender.com`).

### Option B — Railway.app

1. Push the folder to GitHub.
2. railway.app → **New Project** → **Deploy from GitHub repo**.
3. Add env var `API_TOKEN`.
4. Railway auto-detects the Dockerfile. Copy the generated domain.

### Option C — Fly.io

```bash
cd external-downloader
fly launch --no-deploy
fly secrets set API_TOKEN=<your-token>
fly deploy
```

---

## Verify it works

```bash
curl -H "Authorization: Bearer <YOUR_API_TOKEN>" \
  "https://<your-domain>/info?url=https://www.youtube.com/watch?v=dQw4w9WgXcQ"
```

You should get JSON with `title`, `videoFormats`, `audioFormats`.

---

## Plug it into Lovable

After deploying, come back to the Lovable chat and say:

> "Use my downloader API: `https://<your-domain>` with token `<your-token>`"

Lovable will store both as secrets (`DOWNLOADER_API_URL`, `DOWNLOADER_API_TOKEN`) and the site will start using them automatically.

---

## Notes

- **Render free tier sleeps after 15 min of inactivity** — the first request after a sleep takes ~30s to wake. Upgrade to Starter ($7/mo) for always-on.
- yt-dlp updates often. Bump the version in `requirements.txt` every few months and redeploy.
- Be aware of legal/ToS implications of downloading copyrighted content — that's on you, not Lovable.
