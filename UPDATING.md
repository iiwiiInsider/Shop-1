# Quick Update Guide

This guide shows you how to quickly update your live website after deploying to Vercel.

## Making Updates

### 1. Edit Your Code
Make changes to any files in your project:
- Update content in `pages/` directory
- Modify styles in `styles/` directory
- Add new components in `components/` directory
- Update data in `data/` directory

### 2. Test Locally (Recommended)
Before deploying, test your changes:
```bash
npm run dev
```
Visit `http://localhost:3000` to see your changes.

### 3. Commit Your Changes
```bash
git add .
git commit -m "Describe your changes here"
```

### 4. Push to GitHub
```bash
git push origin main
```

### 5. Automatic Deployment
- Vercel detects your push automatically
- Your site rebuilds in 1-2 minutes
- Visit your production URL to see the changes

## Common Updates

### Update Homepage Content
Edit `pages/index.js`

### Update Market Page
Edit `pages/market.js`

### Add New Properties
Edit `data/properties.js`

### Change Styling
Edit files in `styles/` directory

### Update Navigation
Edit `components/Navbar.js`

## Viewing Deployment Status

### In Vercel Dashboard
1. Log in to [vercel.com](https://vercel.com)
2. Select your project
3. View deployment status on the project page
4. Click on a deployment to see build logs

### Build Status Badge
Add this to your README.md to show build status:
```markdown
![Build Status](https://github.com/iiwiiInsider/Shop-1/workflows/Build%20Check/badge.svg)
```

## Troubleshooting Updates

### Changes Not Appearing?
1. Check Vercel dashboard - is the build complete?
2. Hard refresh your browser (Ctrl+F5 or Cmd+Shift+R)
3. Clear browser cache
4. Wait a few minutes - DNS propagation can take time

### Build Failed?
1. Check the build logs in Vercel dashboard
2. Verify the build works locally: `npm run build`
3. Ensure all environment variables are set in Vercel
4. Check for syntax errors in your code

### Need to Rollback?
1. Go to Vercel dashboard
2. Click on "Deployments"
3. Find a previous successful deployment
4. Click "Promote to Production"

## Quick Commands Reference

| Task | Command |
|------|---------|
| Start local dev server | `npm run dev` |
| Build for production | `npm run build` |
| Test production build | `npm run build && npm start` |
| Check git status | `git status` |
| View recent commits | `git log --oneline -5` |
| Push to GitHub | `git push origin main` |

## Tips for Regular Updates

1. **Make small, frequent changes** rather than large updates
2. **Always test locally** before pushing to production
3. **Use descriptive commit messages** to track changes
4. **Check Vercel dashboard** to confirm deployment success
5. **Keep dependencies updated** with `npm update` (test first!)

## Getting Help

- **Vercel Issues**: Check [Vercel Documentation](https://vercel.com/docs)
- **Next.js Questions**: See [Next.js Docs](https://nextjs.org/docs)
- **Git Help**: [Git Handbook](https://guides.github.com/introduction/git-handbook/)

## Advanced: Environment Variable Updates

To update environment variables in production:
1. Go to Vercel Dashboard → Your Project → Settings
2. Click on "Environment Variables"
3. Edit or add variables as needed
4. Trigger a redeploy: Deployments → Latest → ⋯ → Redeploy
