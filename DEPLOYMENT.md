# Deployment Guide — Y.P. & Associates

## Recommended Stack

| Layer | Service | Cost |
|-------|---------|------|
| Frontend | Vercel | Free |
| Backend API | Render.com | Free (spins down) → $7/mo always-on |
| Database | Render PostgreSQL | Free 90 days → $7/mo |
| Domain | GoDaddy / Namecheap | ~₹800/year |
| Email | Resend.com | 100 emails/day free |
| **Total** | | **₹0–1,200/month** |

---

## Step 1 — Buy a Domain

Register `ypassociates.in` on [GoDaddy](https://godaddy.com) or [Namecheap](https://namecheap.com).
Cost: ~₹800/year for a `.in` domain.

---

## Step 2 — Deploy the Backend on Render

1. Create a free account at [render.com](https://render.com)
2. Connect your GitHub repository
3. Create a new **Web Service** → select the `backend/` folder
   - **Build command**: `pip install -r requirements.txt`
   - **Start command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Environment**: Python 3
4. Create a **PostgreSQL database** on Render (free tier)
5. Link the database → Render auto-sets `DATABASE_URL`
6. Set these environment variables in Render dashboard:

```
ADMIN_SECRET_TOKEN   = <generate with: openssl rand -hex 32>
ALLOWED_ORIGINS      = https://www.ypassociates.in,https://ypassociates.in
RESEND_API_KEY       = re_xxxx  (from resend.com)
EMAIL_RECIPIENT      = yatendra@ypassociates.in
```

Your API will be live at: `https://ypassociates-api.onrender.com`

> **Note**: Free tier spins down after 15 min of inactivity (first request takes ~30s).
> Upgrade to Render Starter ($7/mo) for always-on behavior.

---

## Step 3 — Deploy the Frontend on Vercel

1. Create a free account at [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Set **Root Directory** to `frontend`
4. Set this environment variable:
   ```
   VITE_API_URL = https://ypassociates-api.onrender.com
   ```
   *(or `https://api.ypassociates.in` once DNS is configured)*
5. Click Deploy → Vercel builds and deploys automatically

---

## Step 4 — Configure DNS

In your domain registrar's DNS panel, add:

| Type | Name | Value |
|------|------|-------|
| `A` | `@` | Vercel IP (shown in Vercel → Domains) |
| `CNAME` | `www` | `cname.vercel-dns.com` |
| `CNAME` | `api` | `ypassociates-api.onrender.com` |

Then in Vercel → Project → Domains:
- Add `ypassociates.in` and `www.ypassociates.in`
- SSL is automatic (Let's Encrypt)

Wait 5–30 minutes for DNS propagation.

---

## Step 5 — Set Up Email (Resend)

1. Sign up at [resend.com](https://resend.com) (free — 100 emails/day)
2. Add and verify your domain (`ypassociates.in`)
3. Add the DNS TXT record they provide (for DKIM/SPF)
4. Copy your API key → paste into Render's `RESEND_API_KEY` env var
5. Update `EMAIL_RECIPIENT` to Yatendra's actual email

---

## Step 6 — Access the Admin Dashboard

Navigate to `https://www.ypassociates.in/admin`

Use the `ADMIN_SECRET_TOKEN` you set on Render as the login token.

To get the token value: Render Dashboard → Web Service → Environment → `ADMIN_SECRET_TOKEN`

---

## Step 7 — Enable Google Analytics (Optional)

Edit `frontend/index.html` and uncomment the Google Analytics block:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');  // ← replace with real ID
</script>
```

Get your Measurement ID from [Google Analytics](https://analytics.google.com).

---

## Before Going Live — Checklist

- [ ] Replace `GSTIN: 09XXXXX1234Z1Z5` in `About.jsx` with real GSTIN
- [ ] Replace `IEI/CE/GZB/2019-XXX` in `About.jsx` with real CE number
- [ ] Set a strong `ADMIN_SECRET_TOKEN` (not the default)
- [ ] Configure `RESEND_API_KEY` and `EMAIL_RECIPIENT`
- [ ] Test the contact form end-to-end in production
- [ ] Verify `/health` endpoint returns `{"status":"ok"}`
- [ ] Submit `sitemap.xml` to Google Search Console
- [ ] Add the site to Google Business Profile

---

## Local Development

```bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:5173  
Backend API: http://localhost:8000  
API Docs: http://localhost:8000/docs  
Admin: http://localhost:5173/admin
