# PrintCraft POD — Website

A static B2B catalogue website for your Print On Demand business, with a built-in admin panel.

## Files
- `index.html` — Main catalogue website (public-facing)
- `admin.html` — Admin panel (protected by login)
- `data.js` — All content data (edit via admin or directly)

---

## Admin Login
- **URL:** `yoursite.com/admin.html`
- **Username:** `printcraft`
- **Password:** `pod@admin2025`

---

## How to Edit Content

1. Go to `yoursite.com/admin.html`
2. Login with credentials above
3. Edit any section using the forms
4. Click **"Save All Changes"** — this downloads a new `data.js` file
5. Replace the old `data.js` in your project with the downloaded one
6. Redeploy to Vercel/GitHub Pages

---

## Deploying to GitHub Pages (Recommended — Free)

1. Create a GitHub account at github.com
2. Create a new repository (e.g. `pod-catalogue`)
3. Upload all 3 files: `index.html`, `admin.html`, `data.js`
4. Go to **Settings → Pages**
5. Under "Source", select `main` branch, `/ (root)` folder
6. Click Save — your site will be live at `https://yourusername.github.io/pod-catalogue/`

## Deploying to Vercel (Also Free)

1. Create a Vercel account at vercel.com
2. Click "Add New Project" → Import from GitHub or drag-and-drop files
3. No build settings needed (it's a static site)
4. Deploy — you'll get a free `.vercel.app` URL
5. You can also connect a custom domain in Vercel settings

---

## Customizing Your Business Name

In `data.js`, change the `business.name` field from `"PRINTCRAFT POD"` to your actual business name. You can also update phone, email, Instagram, etc.

---

## Changing Admin Password

In `admin.html`, find these lines near the top of the `<script>` section:
```js
const ADMIN_USER = 'printcraft';
const ADMIN_PASS = 'pod@admin2025';
```
Change these to whatever you want.

---

**Note:** GitHub Pages is recommended as it's simpler and completely free for static sites.
