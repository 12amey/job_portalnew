# 🚀 Deployment Guide

This guide explains how to deploy your Job Portal application to **Railway** (Backend) and **Vercel** (Frontend).

## 1. ✨ Deploy Backend (Railway)

1.  Log in to [Railway](https://railway.app/).
2.  Click **New Project** → **Deploy from GitHub repo**.
3.  Select your repository: `job_portalnew`.
4.  Railway will detect the `Dockerfile` and start building.
5.  **Environment Variables**:
    *   Go to the **Variables** tab in your Railway service.
    *   Add the following variables (Use the same values as in your `application.properties`):
        *   `SPRING_DATASOURCE_URL`: (Your Supabase URL)
        *   `SPRING_DATASOURCE_USERNAME`: (Your Supabase User)
        *   `SPRING_DATASOURCE_PASSWORD`: (Your Supabase Password)
    *   *Note: Railway automatically sets the `PORT` variable, and the app is updated to use it.*
6.  **Public URL**:
    *   Go to **Settings** → **Networking** → **Generate Domain**.
    *   Copy the generated URL (e.g., `https://job-portal-production.up.railway.app`).

## 2. 🎨 Deploy Frontend (Vercel)

1.  Log in to [Vercel](https://vercel.com/).
2.  Click **Add New...** → **Project**.
3.  Import `job_portalnew`.
4.  **Framework Preset**: Vite.
5.  **Root Directory**: **Edit** this and select `frontend`.
6.  **Environment Variables**:
    *   Expand the **Environment Variables** section.
    *   Key: `VITE_API_URL`
    *   Value: Your Railway URL + `/api` (e.g., `https://job-portal-production.up.railway.app/api`)
7.  Click **Deploy**.

## ✅ Done!
Your application is now live!
- Frontend: `https://your-project.vercel.app`
- Backend: `https://your-project.up.railway.app`
