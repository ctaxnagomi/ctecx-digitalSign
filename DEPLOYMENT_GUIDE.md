# CTECX-DigitalSign Deployment Guide

## Cloudflare Deployment

### Prerequisites
- Cloudflare account (free tier available)
- Node.js and npm installed
- GitHub account (optional, for source control)

### Step 1: Install Wrangler CLI

```bash
npm install -g @cloudflare/wrangler
wrangler login
```

### Step 2: Configure wrangler.toml

Edit `wrangler.toml` and update:

```toml
account_id = "your-cloudflare-account-id"  # Get from dashboard
name = "ctecx-digitalsign"
```

### Step 3: Create KV Namespaces (Optional)

```bash
wrangler kv:namespace create "STORAGE"
wrangler kv:namespace create "STORAGE" --preview
```

Update the IDs in wrangler.toml.

### Step 4: Deploy

```bash
# Deploy to production
wrangler publish

# Or deploy to specific environment
wrangler publish --env production
```

### Step 5: Configure Custom Domain

1. Go to Cloudflare Dashboard → Workers → Scripts
2. Select your worker
3. Go to "Triggers" tab
4. Add custom domain
5. Update DNS records as instructed

## Cloudflare Pages Deployment

### Option A: Direct Git Integration

1. Connect GitHub repo to Cloudflare Pages
2. Settings → Build & Deploy
3. Build command: `npm run build`
4. Build output: `public`

### Option B: Using Wrangler

```bash
wrangler pages publish public --project-name ctecx-digitalsign
```

## Environment Variables

Create `.env` file:

```
CLOUDFLARE_API_TOKEN=your-token
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_ZONE_ID=your-zone-id
```

## Local Development

```bash
# Run locally
wrangler dev

# Access at http://localhost:8787
```

## Performance Optimization

### Cache Configuration

Enable aggressive caching in Cloudflare Dashboard:
- Browser Cache TTL: 30 minutes
- Cache Level: Cache Everything
- Minify: Enable for CSS/JS/HTML

### Image Optimization

- Enable Cloudflare Image Optimization
- Enable Polish (WebP conversion)
- Enable Auto Minify

## Security Setup

### DDoS Protection
- Cloudflare automatically provides DDoS protection
- Enable Rate Limiting for API endpoints
- Set up WAF rules if needed

### SSL/TLS
- Always use "Flexible" or higher
- Recommended: Full (strict)
- Enable HSTS (optional)

## Monitoring & Logging

### Cloudflare Analytics
- Dashboard shows traffic, bandwidth, requests
- Real User Monitoring (RUM) for performance

### Worker Logging
```javascript
console.log('Message');  // View in Wrangler tail
```

```bash
wrangler tail
```

## Troubleshooting

### 404 Errors
- Check worker routes in wrangler.toml
- Verify file paths are correct

### CORS Issues
- Update ALLOWED_ORIGINS in src/index.js
- Add proper headers in getCorsHeaders()

### PDF Processing Errors
- Ensure PDF.js is properly loaded
- Check file size limits (50MB max)
- Verify MIME type is "application/pdf"

## Production Checklist

- [ ] Test locally with `wrangler dev`
- [ ] Update environment variables
- [ ] Configure custom domain
- [ ] Enable SSL/TLS
- [ ] Set up monitoring
- [ ] Enable rate limiting
- [ ] Configure WAF rules
- [ ] Test API endpoints
- [ ] Verify CORS headers
- [ ] Check cache headers
- [ ] Enable analytics
- [ ] Set up error tracking

## Continuous Deployment

### GitHub Actions Setup

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run build
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

## Scaling

Cloudflare Workers automatically scale:
- Unlimited concurrent requests
- Auto-scaling across global edge network
- No cold starts
- 50ms CPU time limit (generous for most tasks)

## Cost Estimation

**Cloudflare Free Tier:**
- 100,000 requests/day
- Includes DDoS protection
- Global CDN included
- Free SSL/TLS

**Paid Plans:**
- Workers: $0.50 per 1M requests
- Pages: Free for Git integration
- Additional features: Varies

## FAQ

**Q: How do I update the API endpoints?**
A: Edit `src/index.js` and redeploy with `wrangler publish`

**Q: Can I use a custom domain?**
A: Yes, configure in Cloudflare Dashboard under Workers > Triggers

**Q: How do I access logs?**
A: Use `wrangler tail` to see real-time logs

**Q: What's the file size limit?**
A: 100MB for Workers, but configured to 50MB for safety

**Q: Can I use databases?**
A: Use Cloudflare D1 (SQLite) or KV namespace for storage

## Additional Resources

- [Wrangler Documentation](https://developers.cloudflare.com/workers/cli-wrangler/)
- [Workers API Reference](https://developers.cloudflare.com/workers/runtime-apis/)
- [Cloudflare Pages Guide](https://developers.cloudflare.com/pages/)
- [Community Discord](https://discord.gg/cloudflaredev)

---

**Need Help?**
- Email: ctaxnagomi@gmail.com
- GitHub Issues: github.com/ctaxnagomi/ctecx-digitalsign
