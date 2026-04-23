# ExamSphere Deployment Guide — Render (Full-Stack)

This guide deploys your Spring Boot backend + React frontend to **Render** for free.

---

## Architecture

```
┌─────────────────────────────────────────────┐
│              Render Platform                 │
│  ┌──────────────┐     ┌──────────────────┐  │
│  │  Static Site │────▶│   Web Service    │  │
│  │  (Frontend)  │     │   (Backend API)  │  │
│  │  examsphere  │     │   examsphere-api │  │
│  └──────────────┘     └────────┬─────────┘  │
│                                │            │
│                        ┌───────▼──────┐     │
│                        │  PostgreSQL  │     │
│                        │  examsphere  │     │
│                        └──────────────┘     │
└─────────────────────────────────────────────┘
```

---

## Prerequisites

1. [Render Account](https://render.com) (free tier)
2. [GitHub Account](https://github.com) with your code pushed to a repo
3. Git installed locally

---

## Step 1: Push Code to GitHub

```bash
cd d:/College/CODING/IP_project/mcq-online-test
git init
git add .
git commit -m "Production-ready: fixed CORS, JWT env vars, health check"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/examsphere.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

## Step 2: Create PostgreSQL Database on Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New** → **PostgreSQL**
3. Settings:
   - **Name**: `examsphere-db`
   - **Region**: Oregon (or closest to you)
   - **Plan**: Free
4. Click **Create Database**
5. **Copy these values** (you'll need them later):
   - Database
   - Username
   - Password
   - Hostname
   - Port
   - Internal Database URL

---

## Step 3: Deploy Backend (Web Service)

1. In Render Dashboard, click **New** → **Web Service**
2. Connect your GitHub repo
3. Configure:
   - **Name**: `examsphere-api`
   - **Region**: Same as database (Oregon)
   - **Branch**: `main`
   - **Runtime**: Docker
   - **Dockerfile Path**: `backend/examsphere-backend/Dockerfile`
4. **Environment Variables** (add these):

| Key | Value |
|-----|-------|
| `DATABASE_URL` | `jdbc:postgresql://YOUR_HOST:5432/examsphere` |
| `DATABASE_USERNAME` | (from Step 2) |
| `DATABASE_PASSWORD` | (from Step 2) |
| `JWT_SECRET` | Generate a long random string (e.g., `openssl rand -base64 64`) |
| `CORS_ALLOWED_ORIGINS` | `https://examsphere.onrender.com` |
| `PORT` | `8080` |

5. Click **Create Web Service**

**Note**: The backend URL will be `https://examsphere-api.onrender.com`

---

## Step 4: Seed the Database

Once the backend is deployed and **Live**, seed the database:

### Option A: Using Render Shell
1. In your Web Service dashboard, click **Shell**
2. Run: `apt-get update && apt-get install -y postgresql-client`
3. Connect: `psql $DATABASE_URL`
4. Paste contents of `backend/examsphere-backend/complete-setup.sql`

### Option B: Using Local psql
```bash
psql "YOUR_INTERNAL_DATABASE_URL" -f backend/examsphere-backend/complete-setup.sql
```

Replace `YOUR_INTERNAL_DATABASE_URL` with the Internal Database URL from Step 2.

---

## Step 5: Deploy Frontend (Static Site)

1. In Render Dashboard, click **New** → **Static Site**
2. Connect your GitHub repo
3. Configure:
   - **Name**: `examsphere-app`
   - **Region**: Same as backend
   - **Branch**: `main`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`
4. **Environment Variables**:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://examsphere-api.onrender.com/api` |

5. Click **Create Static Site**

---

## Step 6: Update Backend CORS (One-Time)

After the frontend is deployed, update the backend's `CORS_ALLOWED_ORIGINS`:

1. Go to your backend Web Service settings
2. Update `CORS_ALLOWED_ORIGINS` to your frontend URL:
   - `https://examsphere-app.onrender.com`
   - Or if you have a custom domain: `https://yourdomain.com`
3. Click **Save Changes** (auto-deploys)

---

## Step 7: Verify Deployment

### Health Check
```bash
curl https://examsphere-api.onrender.com/health
```
Expected: `{"status":"UP","message":"ExamSphere Backend is running"}`

### Admin Login
- URL: `https://examsphere-app.onrender.com/admin-login`
- Email: `admin@examsphere.com`
- Password: `admin123`

### Student Login
- URL: `https://examsphere-app.onrender.com/login`
- Register a new account first

---

## Troubleshooting

### CORS Errors
- Ensure `CORS_ALLOWED_ORIGINS` includes your frontend URL exactly
- No trailing slash, use full `https://` URL

### Database Connection Failed
- Verify `DATABASE_URL` format: `jdbc:postgresql://host:5432/examsphere`
- Check database is in the same Render region as backend
- Ensure firewall allows connection

### 401/403 on Admin Endpoints
- Verify admin user exists: check `users` table for `role='ADMIN'`
- Verify JWT secret is set and matches

### Frontend Shows Blank Page
- Check browser console for errors
- Verify `VITE_API_URL` is set correctly in Static Site env vars
- Ensure `_redirects` file is in `frontend/public/`

---

## Important Notes

### Free Tier Limits (Render)
- **Web Service**: Spins down after 15 min inactivity (cold start ~30s)
- **PostgreSQL**: 1 GB storage, expires after 90 days of inactivity
- **Static Site**: Unlimited, always available

### Security
- Change the admin password immediately after first login
- Use a strong `JWT_SECRET` (min 32 chars)
- Never commit `.env.production` with real secrets

### Custom Domain (Optional)
1. Buy a domain (Namecheap, Cloudflare, etc.)
2. In Render dashboard, add custom domain to both services
3. Update `CORS_ALLOWED_ORIGINS` and `VITE_API_URL` accordingly

