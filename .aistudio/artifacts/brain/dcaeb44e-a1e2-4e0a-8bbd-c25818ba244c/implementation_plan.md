# Vercel Deployment & GoDaddy Custom Domain Integration Plan

A complete, step-by-step operational blueprint for deploying the full-stack Nexmedora RCM platform to Vercel via GitHub, configuring custom DNS records on GoDaddy with automatic SSL encryption, and adapting backend Express API routes into Vercel Serverless Functions.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> Based on your confirmed preferences in Phase 1:
> - **Source Control**: Continuous deployment via GitHub repository integration (`git push` triggers automated preview and production builds).
> - **DNS Strategy**: Standard DNS records (A & CNAME) managed inside GoDaddy, preserving any existing GoDaddy MX records (email services like Microsoft 365 or Google Workspace).
> - **Backend Architecture**: Full-stack support using Vercel Serverless Functions (`api/index.ts` + `vercel.json` rewrites) so that `/api/explain-denial`, `/api/contact`, and `/api/submit-lead` continue to operate seamlessly in production.

---

## 1. Overview & Architecture Blueprint

```
┌────────────────────────────────────────────────────────┐
│               GoDaddy DNS Zone Manager                 │
│                                                        │
│  A Record     @   ───►  76.76.21.21 (Vercel Anycast)   │
│  CNAME Record www ───►  cname.vercel-dns.com           │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼ HTTPS (Port 443) / Let's Encrypt SSL
┌────────────────────────────────────────────────────────┐
│                   Vercel Edge Network                  │
│                                                        │
│  Route: /assets/*, /* ──► Static React SPA (dist/)     │
│  Route: /api/*        ──► Serverless Function (Node.js)│
└──────────────────────────┬─────────────────────────────┘
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
┌─────────────────────────┐ ┌─────────────────────────┐
│     Vite React SPA      │ │   Express Serverless    │
│  - 14-Step Process Grid │ │   - /api/explain-denial │
│  - Doctor Reviews       │ │   - /api/contact        │
│  - Lead Capture Modals  │ │   - /api/submit-lead    │
└─────────────────────────┘ └─────────────────────────┘
```

---

## 2. Step-by-Step Implementation Guide

### Phase 1: Codebase Preparation for Vercel (Done in Applet)
1. **Create Vercel Serverless Entrypoint (`api/index.ts`)**:
   - Wrap the Express `app` instance from `server.ts` to export it as a Vercel-compatible serverless handler without invoking `app.listen()` when in a serverless environment (`process.env.VERCEL`).
2. **Configure `vercel.json`**:
   - Set up API routing rules ensuring `/api/(.*)` requests hit the serverless function while all other paths serve `dist/index.html` for client-side React routing.
   - Retain cache-control headers for static assets (`/assets/(.*)`).
3. **Verify Build & Environment Variables**:
   - Ensure `npm run build` runs cleanly and output directory matches `dist`.
   - Document required Vercel environment variables (`GEMINI_API_KEY`).

---

### Phase 2: GitHub Repository Setup & Push
1. **Initialize Git & Push**:
   - Push codebase to your private or public GitHub repository:
     ```bash
     git init
     git add .
     git commit -m "feat: configure nexmedora for vercel production deployment"
     git branch -M main
     git remote add origin https://github.com/<your-username>/<your-repo-name>.git
     git push -u origin main
     ```
2. **Protect Secrets**:
   - Ensure `.env` is present in `.gitignore` so no private keys or local configs are committed to version control.

---

### Phase 3: Vercel Project Creation & Deployment
1. **Log in to Vercel**:
   - Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
2. **Import Project**:
   - Click **"Add New..."** $\rightarrow$ **"Project"**.
   - Select your GitHub repository (`nexmedora-rcm`).
3. **Configure Build & Output Settings**:
   - **Framework Preset**: `Vite` (Vercel detects this automatically).
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. **Configure Environment Variables**:
   - Under the **Environment Variables** tab, add:
     - `GEMINI_API_KEY`: Your Google AI Studio Gemini API key (for the Denial Code Explainer tool).
     - `NODE_ENV`: `production`
5. **Deploy**:
   - Click **Deploy**. Vercel will install dependencies, build the Vite app, compile serverless functions, and generate a live `*.vercel.app` preview URL.
   - Test the live preview URL to verify the home page and API endpoints respond correctly.

---

### Phase 4: GoDaddy DNS Configuration
1. **Access GoDaddy DNS Manager**:
   - Log in to your [GoDaddy Account](https://account.godaddy.com/).
   - Go to **My Products** $\rightarrow$ **Domains**.
   - Click on your purchased domain $\rightarrow$ select **Manage DNS** (or **DNS Records**).
2. **Add / Edit DNS Records**:

   | Type | Name | Value / Destination | TTL | Notes |
   | :--- | :--- | :--- | :--- | :--- |
   | **A** | `@` | `76.76.21.21` | `1/2 Hour` (or 600) | Points the root domain (`example.com`) to Vercel Anycast IP |
   | **CNAME** | `www` | `cname.vercel-dns.com` | `1/2 Hour` (or 600) | Points `www.example.com` to Vercel's global CDN |

   > [!NOTE]
   > Do NOT delete or modify existing **MX**, **TXT**, or **SPF** records if you have custom email addresses associated with this GoDaddy domain (e.g. Google Workspace or Microsoft 365). Only modify the `A (@)` and `CNAME (www)` records.

---

### Phase 5: Add Custom Domain in Vercel
1. In the Vercel Dashboard, open your project.
2. Navigate to **Settings** $\rightarrow$ **Domains**.
3. In the input box, enter your root domain (e.g., `nexmedora.com`) and click **Add**.
4. Vercel will ask how you want to configure redirects:
   - Select: **Recommend: Redirect `example.com` to `www.example.com`** (or vice versa according to your brand preference).
5. Vercel will immediately check DNS records against GoDaddy:
   - A blue or green checkmark will appear next to both `example.com` and `www.example.com`.
   - Vercel automatically generates and provisions a free SSL Certificate (Let's Encrypt) within 5–15 minutes.

---

## 3. Post-Deployment Verification Checklist

- [ ] **Root Domain Test**: Access `https://yourdomain.com` in an incognito window; verify automatic redirect to HTTPS.
- [ ] **Subdomain Test**: Access `https://www.yourdomain.com`; verify navigation, 14-step life cycle cards, and review section render cleanly.
- [ ] **API Functional Verification**: Test the Denial Code Explainer by searching code `CO-45`; verify structured response is returned from Vercel Serverless function.
- [ ] **Lead Form Verification**: Submit a test inquiry on the Contact page or Audit modal; verify smooth submission toast without CORS or routing issues.
- [ ] **Mobile & WhatsApp Links**: Verify floating WhatsApp and Audit triggers navigate correctly on mobile browsers.
