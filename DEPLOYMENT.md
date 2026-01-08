# Deployment Guide

This guide explains how to deploy the Cape Town Market application to production with HTTPS and set up continuous deployment for easy updates.

## Recommended Deployment Platform: Vercel

Vercel is the recommended platform for deploying this Next.js application because:
- **Automatic HTTPS**: SSL certificates are provisioned automatically
- **Easy Updates**: Connected to GitHub for automatic deployments on push
- **Zero Configuration**: Works out-of-the-box with Next.js
- **Free Tier Available**: Suitable for getting started

## Step-by-Step Deployment Instructions

### 1. Create a Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up using your GitHub account
3. Authorize Vercel to access your GitHub repositories

### 2. Import Your Repository
1. Click "Add New Project" in the Vercel dashboard
2. Select the `Shop-1` repository from your GitHub account
3. Vercel will automatically detect that this is a Next.js project

### 3. Configure Environment Variables
Before deploying, you need to set up the required environment variables in Vercel:

**Required Variables:**
- `NEXTAUTH_URL` - Your production URL (e.g., `https://your-app.vercel.app`)
- `NEXTAUTH_SECRET` - A secure random string (generate with `openssl rand -base64 32`)
- `GOOGLE_CLIENT_ID` - Your Google OAuth Client ID
- `GOOGLE_CLIENT_SECRET` - Your Google OAuth Client Secret
- `GMAIL_USER` - Email address for sending welcome emails
- `GMAIL_APP_PASSWORD` - Gmail app password for authentication
- `BUSINESS_NAME` - Your business name for welcome emails

**Optional Variables:**
- `APPLE_CLIENT_ID` - Apple Sign-In Client ID (if using Apple auth)
- `APPLE_CLIENT_SECRET` - Apple Sign-In Client Secret

To add these in Vercel:
1. In your project settings, go to "Environment Variables"
2. Add each variable with its value
3. Select "Production", "Preview", and "Development" environments as needed

### 4. Update Google OAuth Settings
Once you know your production URL (e.g., `https://your-app.vercel.app`):

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to APIs & Services → Credentials
3. Edit your OAuth 2.0 Client ID
4. Add to **Authorized JavaScript origins**:
   - `https://your-app.vercel.app`
5. Add to **Authorized redirect URIs**:
   - `https://your-app.vercel.app/api/auth/callback/google`
6. Save changes

### 5. Deploy
1. Click "Deploy" in Vercel
2. Wait for the build to complete (usually 1-2 minutes)
3. Your app will be live at `https://your-project-name.vercel.app`

### 6. Custom Domain (Optional)
To use your own domain:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow Vercel's instructions to update your DNS settings
4. Update `NEXTAUTH_URL` environment variable to your custom domain
5. Update Google OAuth redirect URIs to use your custom domain

## Continuous Deployment

Once set up, Vercel automatically deploys your application when you push to GitHub:

1. **Make changes** to your code locally
2. **Commit** your changes: `git add . && git commit -m "Your message"`
3. **Push** to GitHub: `git push origin main`
4. **Automatic deployment**: Vercel detects the push and deploys automatically
5. **Live in ~2 minutes**: Your changes are live with HTTPS

### Preview Deployments
- Every pull request gets a unique preview URL
- Test changes before merging to production
- Share preview links with team members

## Alternative Deployment Options

### Netlify
1. Sign up at [netlify.com](https://netlify.com)
2. Connect your GitHub repository
3. Set build command: `npm run build`
4. Set publish directory: `.next`
5. Add environment variables
6. Deploy

### Self-Hosted with HTTPS
If you prefer to host on your own server:

1. **Set up a server** (Ubuntu/Debian recommended)
2. **Install Node.js** (version 18 or higher)
3. **Clone repository**: `git clone https://github.com/iiwiiInsider/Shop-1.git`
4. **Install dependencies**: `npm install`
5. **Create `.env.local`** with production values
6. **Build**: `npm run build`
7. **Start**: `npm start` (runs on port 3000)
8. **Set up Nginx** as reverse proxy:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       return 301 https://$server_name$request_uri;
   }

   server {
       listen 443 ssl;
       server_name your-domain.com;
       
       ssl_certificate /path/to/cert.pem;
       ssl_certificate_key /path/to/key.pem;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
9. **Get SSL certificate** with Let's Encrypt:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```
10. **Set up PM2** for process management:
    ```bash
    npm install -g pm2
    pm2 start npm --name "cape-town-market" -- start
    pm2 startup
    pm2 save
    ```

## Updating Your Live Site

### Using Vercel (Recommended)
Simply push to GitHub:
```bash
git add .
git commit -m "Update description"
git push origin main
```
Vercel automatically builds and deploys your changes.

### Self-Hosted
```bash
git pull origin main
npm install  # if dependencies changed
npm run build
pm2 restart cape-town-market
```

## Monitoring and Logs

### Vercel
- View logs in the Vercel dashboard
- Real-time function logs
- Analytics available

### Self-Hosted
```bash
pm2 logs cape-town-market
pm2 status
```

## Troubleshooting

### Build Fails
- Check environment variables are set correctly
- Ensure all dependencies are in `package.json`
- Review build logs for specific errors

### OAuth Not Working
- Verify redirect URIs match exactly (including https://)
- Check `NEXTAUTH_URL` matches your production URL
- Ensure `NEXTAUTH_SECRET` is set

### Email Not Sending
- Verify `GMAIL_APP_PASSWORD` is correct
- Check Gmail allows less secure app access (or use app password)
- Review function logs for email errors

## Security Best Practices

1. **Never commit** `.env.local` or sensitive credentials
2. **Use environment variables** for all secrets
3. **Rotate secrets** regularly (especially `NEXTAUTH_SECRET`)
4. **Enable 2FA** on your hosting platform account
5. **Use app passwords** for Gmail instead of main password
6. **Keep dependencies updated**: Run `npm audit` regularly

## Support

For issues with:
- **Vercel deployment**: [Vercel Documentation](https://vercel.com/docs)
- **Next.js**: [Next.js Documentation](https://nextjs.org/docs)
- **NextAuth**: [NextAuth.js Documentation](https://next-auth.js.org)
