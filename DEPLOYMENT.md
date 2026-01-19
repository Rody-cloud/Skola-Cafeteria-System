# Cafeteria System - Cloud Deployment Guide

This guide will walk you through deploying your cafeteria system to the cloud, making it accessible via URLs without needing to run terminal commands.

## 📋 Overview

Your cafeteria system consists of:
- **Backend API** (Node.js + Express + SQLite) → Deploy to **Render**
- **Student Frontend** (React + Vite) → Deploy to **Vercel**
- **Professor Frontend** (React + Vite) → Deploy to **Vercel**
- **Staff Frontend** (React + Vite) → Deploy to **Vercel**

---

## 🚀 Part 1: Deploy Backend to Render

### Step 1: Create a Render Account
1. Go to [render.com](https://render.com)
2. Sign up using your GitHub account (recommended) or email
3. Verify your email if required

### Step 2: Push Your Code to GitHub
If you haven't already, push your code to GitHub:

```bash
cd c:\Users\Dell\.gemini\antigravity\scratch\cafeteria-system
git init
git add .
git commit -m "Initial commit - cafeteria system"
# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/cafeteria-system.git
git push -u origin main
```

### Step 3: Deploy Backend on Render
1. **Log in to Render Dashboard**
2. Click **"New +"** → **"Web Service"**
3. **Connect your GitHub repository**
   - Click "Connect account" if needed
   - Select your `cafeteria-system` repository
4. **Configure the service:**
   - **Name**: `cafeteria-backend` (or any name you prefer)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Select **Free**

5. **Add Environment Variables:**
   Click "Advanced" → "Add Environment Variable"
   - `JWT_SECRET`: Create a random secure string (e.g., `my-super-secret-jwt-key-2026`)
   - `NODE_ENV`: `production`

6. **Click "Create Web Service"**

7. **Wait for deployment** (5-10 minutes)
   - Render will install dependencies and start your server
   - Once complete, you'll see "Live" status
   - **Copy your backend URL** (e.g., `https://cafeteria-backend.onrender.com`)

> **⚠️ Important**: Free tier services on Render spin down after 15 minutes of inactivity. The first request after inactivity may take 30-60 seconds.

---

## 🎨 Part 2: Deploy Frontends to Vercel

You'll deploy each frontend separately to get individual URLs.

### Step 1: Create a Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up using your GitHub account (recommended)

### Step 2: Install Vercel CLI (Optional but Recommended)
```bash
npm install -g vercel
```

---

### Deploy Student Frontend

#### Option A: Using Vercel Dashboard (Easier)
1. **Log in to Vercel Dashboard**
2. Click **"Add New..."** → **"Project"**
3. **Import your GitHub repository**
4. **Configure the project:**
   - **Project Name**: `cafeteria-student`
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. **Add Environment Variable:**
   - Click "Environment Variables"
   - **Key**: `VITE_API_URL`
   - **Value**: Your Render backend URL (e.g., `https://cafeteria-backend.onrender.com`)
   - Select all environments (Production, Preview, Development)

6. **Click "Deploy"**
7. **Wait for deployment** (2-5 minutes)
8. **Copy your frontend URL** (e.g., `https://cafeteria-student.vercel.app`)

#### Option B: Using Vercel CLI
```bash
cd c:\Users\Dell\.gemini\antigravity\scratch\cafeteria-system\frontend
vercel
# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? cafeteria-student
# - Directory? ./
# - Override settings? No

# After deployment, add environment variable:
vercel env add VITE_API_URL
# Enter your backend URL when prompted
# Select Production, Preview, and Development

# Redeploy with environment variable:
vercel --prod
```

---

### Deploy Professor Frontend

Repeat the same process for the professor frontend:

**Using Dashboard:**
- **Root Directory**: `frontend-professor`
- **Project Name**: `cafeteria-professor`
- **Environment Variable**: `VITE_API_URL` = your backend URL

**Using CLI:**
```bash
cd c:\Users\Dell\.gemini\antigravity\scratch\cafeteria-system\frontend-professor
vercel
# Follow prompts, set project name to: cafeteria-professor
vercel env add VITE_API_URL
# Enter backend URL
vercel --prod
```

---

### Deploy Staff Frontend

Repeat for the staff frontend:

**Using Dashboard:**
- **Root Directory**: `frontend-staff`
- **Project Name**: `cafeteria-staff`
- **Environment Variable**: `VITE_API_URL` = your backend URL

**Using CLI:**
```bash
cd c:\Users\Dell\.gemini\antigravity\scratch\cafeteria-system\frontend-staff
vercel
# Follow prompts, set project name to: cafeteria-staff
vercel env add VITE_API_URL
# Enter backend URL
vercel --prod
```

---

## 🔧 Part 3: Update Backend CORS Settings

After deploying all frontends, update your backend environment variables on Render:

1. Go to **Render Dashboard** → Your backend service
2. Click **"Environment"** in the left sidebar
3. **Add these environment variables:**
   - `FRONTEND_STUDENT_URL`: Your student frontend URL (e.g., `https://cafeteria-student.vercel.app`)
   - `FRONTEND_PROFESSOR_URL`: Your professor frontend URL
   - `FRONTEND_STAFF_URL`: Your staff frontend URL

4. **Save Changes** → Render will automatically redeploy

---

## ✅ Part 4: Verify Deployment

### Test Backend
1. Open your backend URL in a browser (e.g., `https://cafeteria-backend.onrender.com`)
2. You should see: "Cafeteria System API is running"

### Test Frontends
1. Open each frontend URL in a browser
2. Try to:
   - Register a new account
   - Log in
   - View the menu
   - Place an order

### Common Issues

**Issue**: Frontend can't connect to backend
- **Solution**: Check that `VITE_API_URL` is set correctly in Vercel
- Verify CORS settings in backend include your frontend URLs

**Issue**: Backend shows "Application failed to respond"
- **Solution**: Check Render logs for errors
- Ensure `npm start` script exists in `package.json`

**Issue**: 404 errors on frontend routes
- **Solution**: Ensure `vercel.json` exists with proper rewrites configuration

---

## 🔄 Updating Your Deployment

### Update Backend
```bash
# Make your changes, then:
git add .
git commit -m "Update backend"
git push
# Render will automatically redeploy
```

### Update Frontends
```bash
# Make your changes, then:
git add .
git commit -m "Update frontend"
git push
# Vercel will automatically redeploy
```

Or use Vercel CLI:
```bash
cd frontend  # or frontend-professor, frontend-staff
vercel --prod
```

---

## 📊 Your Deployment URLs

After completing deployment, you'll have:

- **Backend API**: `https://cafeteria-backend.onrender.com`
- **Student Portal**: `https://cafeteria-student.vercel.app`
- **Professor Portal**: `https://cafeteria-professor.vercel.app`
- **Staff Dashboard**: `https://cafeteria-staff.vercel.app`

---

## 💡 Tips

1. **Free Tier Limitations:**
   - Render: Services sleep after 15 min of inactivity
   - Vercel: 100GB bandwidth/month, sufficient for most projects

2. **Database Persistence:**
   - SQLite data persists on Render but may be lost on redeployment
   - For production, consider upgrading to PostgreSQL

3. **Custom Domains:**
   - Both Render and Vercel support custom domains
   - Configure in respective dashboards under "Settings" → "Domains"

4. **Monitoring:**
   - Check Render logs: Dashboard → Service → "Logs"
   - Check Vercel logs: Dashboard → Project → "Deployments" → Click deployment

---

## 🆘 Need Help?

- **Render Documentation**: [docs.render.com](https://docs.render.com)
- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Check deployment logs** for specific error messages

---

**Congratulations!** 🎉 Your cafeteria system is now live and accessible from anywhere!
