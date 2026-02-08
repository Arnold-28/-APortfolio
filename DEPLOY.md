# Deploy to Vercel (5 minutes)

## Prerequisites
- GitHub account
- Git installed

## Step 1: Push to GitHub

```bash
cd c:\Users\arnol\Documents\portfolio

# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Three.js Portfolio"

# Create repo on GitHub (go to github.com/new)
# Then connect and push:
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

1. Go to https://vercel.com/
2. Sign up with GitHub
3. Click "Add New Project"
4. Import your portfolio repository
5. Click "Deploy"

Done! Your site will be live at: `https://your-portfolio.vercel.app`

## Step 3: Update Web3Forms Domain

1. Go to https://web3forms.com/
2. Add your Vercel domain to allowed domains
3. Contact form will now work!

## Alternative: Netlify

1. Go to https://netlify.com/
2. Drag and drop your `dist` folder after running `npm run build`
3. Done!

## Build Command
```bash
npm run build
```

Output folder: `dist`
