# Deploy A2S to a2secomsolutions.com (Hostinger)

Replace the old website with this MERN project on your Hostinger domain.

## Can Cursor do this automatically?

**No** — deployment needs your Hostinger login. This guide walks you through it step by step (~15–20 minutes).

---

## Recommended setup (Hostinger + free API host)

| Part | Where | Why |
|------|--------|-----|
| **Website (React)** | Hostinger `public_html` | Your domain already points here |
| **API (Node.js)** | [Render.com](https://render.com) free tier | Hostinger shared hosting often has no Node.js |
| **Database** | MongoDB Atlas | Already configured |

---

## Part 1 — Deploy the API (Render)

1. Push this project to **GitHub** (private repo is fine).
2. Go to [render.com](https://render.com) → **New → Web Service**.
3. Connect your GitHub repo **AsylumTechie/A2s**.
4. Settings (important — do NOT build the client on Render):
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node

   > If Root Directory is empty (repo root), Render will try `npm run build` and fail with `vite: not found`. Always set Root Directory to `server` for the API.
5. Add **Environment Variables:**

   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=your_atlas_connection_string
   CLIENT_URL=https://a2secomsolutions.com
   ```

6. Deploy and copy your URL, e.g. `https://a2s-api.onrender.com`.

---

## Part 2 — Build the frontend for production

On your PC, in the project folder:

```bash
cd client
```

Create `client/.env.production`:

```
VITE_API_URL=https://YOUR-RENDER-URL.onrender.com/api
```

Replace with your real Render URL from Part 1.

Then build:

```bash
cd ..
npm run build
```

This creates `client/dist/` — that folder is your new website.

---

## Part 3 — Replace the old site on Hostinger

1. Log in to [Hostinger hPanel](https://hpanel.hostinger.com).
2. Go to **Websites** → select **a2secomsolutions.com** → **Manage**.
3. Open **File Manager** (or use FTP with FileZilla).
4. Open the **`public_html`** folder.
5. **Backup old site (optional):** Select all files → compress to `old-site-backup.zip` → download.
6. **Delete** everything inside `public_html` (old website files).
7. **Upload** everything inside `client/dist/` into `public_html`:
   - `index.html`
   - `assets/` folder
   - `favicon.svg`
   - `.htaccess` (enable “show hidden files” if needed)

8. Ensure `.htaccess` is present so React routes (`/about`, `/services`, etc.) work.

---

## Part 4 — Domain & SSL

1. In hPanel → **Domains** → **a2secomsolutions.com** → **Manage**.
2. Confirm domain points to your hosting (usually automatic).
3. Go to **SSL** → enable **Free SSL** for `a2secomsolutions.com` and `www`.
4. Wait 5–15 minutes, then visit **https://a2secomsolutions.com**.

---

## Part 5 — Remove old site from DNS (if needed)

If the domain still shows the old site:

1. hPanel → **Websites** → check which folder the domain uses (should be `public_html`).
2. Remove any **redirect** or **parking** page under Domains.
3. Clear browser cache or try incognito.

---

## Alternative: Full stack on Hostinger VPS

If you have a **VPS** plan with Node.js:

```bash
git clone your-repo
cd A2S
npm run install:all
# Set server/.env with MONGODB_URI and CLIENT_URL
npm run build
NODE_ENV=production npm start
```

Use PM2 + Nginx reverse proxy and point the domain to the VPS IP.

---

## Checklist after deploy

- [ ] https://a2secomsolutions.com loads the new home page
- [ ] `/about`, `/services`, `/contact` work (no 404)
- [ ] Contact form submits (needs API + MongoDB)
- [ ] SSL padlock shows in browser

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Blank page | Check `assets/` uploaded; open browser DevTools → Console |
| 404 on refresh | Add `.htaccess` to `public_html` |
| API errors | Check `VITE_API_URL` in build; redeploy after changing |
| Old site still shows | Clear cache; confirm files in `public_html` are new |

---

## Need help?

Share your Hostinger plan type (Shared / Business / VPS) and whether you use GitHub — we can narrow steps further.
