# CTECX-DigitalSign

A modern, minimalistic digital signature web application with iOS-style glassmorphism design.

## 🎯 Features

### **Digital Signature Creation**
- Smooth, responsive canvas drawing interface
- Adjustable pen size (1-20px)
- Customizable pen color with color picker
- Multiple background options (Transparent, White, Light)
- Clear and Reset controls

### **Download Formats**
- **PNG** - With transparent background
- **JPG** - With white background for compatibility
- **WebP** - Modern format with transparency support

### **Design & UX**
- iOS-style glassmorphism UI
- Clean, minimalistic design
- Brand colors: Cyan (#00d4ff), White, Black
- Fully responsive (mobile, tablet, desktop)
- Hidden scrollbars for seamless experience
- Smooth animations and transitions

### **Welcome Experience**
- Animated intro video welcome page
- Logo extracted from CTECX brand video
- Professional onboarding experience
- Skip option for returning users

### **Branding**
- Official CTECX logo from video
- Multi-size favicons (32x32, 64x64, 128x128, 192x192, 256x256)
- ICO favicon for browser compatibility
- Consistent brand identity throughout

## 📁 Project Structure

```
ctecx-digitalSign/
├── index.html              # Main application
├── welcome.html            # Welcome/intro page
├── style.css               # Stylesheets
├── script.js               # JavaScript logic
├── ctex-logo.webp          # Brand logo
├── ctex-logo-2.mp4         # Welcome video
├── favicon.ico             # Browser favicon
├── favicon-32x32.png       # 32x32 favicon
├── favicon-64x64.png       # 64x64 favicon
├── favicon-128x128.png     # 128x128 favicon
├── favicon-192x192.png     # 192x192 favicon (Android)
├── favicon-256x256.png     # 256x256 favicon
├── extract_logo.py         # Logo extraction script
└── README.md              # This file
```

## 🚀 Getting Started

### **Quick Start**
1. Open `index.html` in a web browser
   - Or open `welcome.html` for the intro experience

### **For First-Time Users**
- Navigate to `welcome.html` to see the animated intro
- The video will auto-play and after ~5 seconds, you'll be redirected to the main app
- Or click "Skip ▶" to go directly to the signature creator

### **Using the Application**
1. **Adjust Pen Settings**
   - Use the slider to change pen size
   - Click the color picker to change pen color
   - Select background style (transparent, white, or light blue)

2. **Draw Your Signature**
   - Click and drag on the canvas to draw
   - Touch input is supported on mobile devices

3. **Save Your Signature**
   - Click one of the download buttons (PNG, JPG, or WebP)
   - File will be saved with timestamp: `signature_[timestamp].[format]`
   - Use PNG or WebP for transparent backgrounds
   - Use JPG for documents requiring white background

## 🎨 Design Elements

### **Color Scheme**
- **Primary Cyan**: `#00d4ff` - Accent color for buttons, highlights
- **Primary Dark Cyan**: `#00a8cc` - Gradient depths
- **White**: `#ffffff` - Background and glass morphism
- **Black**: `#000000` - Text and borders

### **Typography**
- **Fonts**: System fonts (-apple-system, BlinkMacSystemFont)
- **Numbers**: SF Mono, Monaco, Menlo (monospace)
- **Icons**: Minimal emoji icons
- **Spacing**: Responsive with CSS clamp() for fluid scaling

### **Effects**
- Glassmorphism with backdrop-filter blur
- Smooth fade-in and scale animations
- Gradient text for numbers
- Subtle box shadows for depth
- Touch-optimized interactions

## 📱 Responsive Design

The site is fully optimized for all device sizes:
- **Desktop** (1024px+): Full layout with sidebar controls
- **Tablet** (768px - 1023px): Responsive flex layout
- **Mobile** (480px - 767px): Stacked layout with optimized spacing
- **Small Mobile** (<480px): Minimized icons and text

## 🔧 Technical Details

### **Browser Support**
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Modern mobile browsers

### **Technologies Used**
- HTML5 Canvas API for drawing
- CSS3 with custom properties (variables)
- Vanilla JavaScript (no dependencies)
- WebP and PNG image formats
- MP4 video for intro

### **Performance**
- Passive event listeners for optimal scrolling
- Debounced resize handling
- Efficient canvas rendering with DPI scaling
- Lazy-loaded animations
- Minimal repaints and reflows

## 🔐 Data Privacy

- All processing happens locally in the browser
- No data is sent to any server
- Your signatures are never stored or transmitted
- No cookies or tracking

## 📄 PDPR & How to Use

Navigation links for:
- **PDPR**: Personal Data Protection policies
- **How to Use**: Detailed usage instructions

(These sections can be implemented as needed)

## 🎬 Logo Extraction

The `extract_logo.py` script:
1. Extracts a frame from the welcome video
2. Converts it to WebP format
3. Creates multiple favicon sizes
4. Generates ICO favicon for browsers

To re-extract:
```bash
python extract_logo.py
```

**Requirements:**
- Python 3.7+
- opencv-python (`pip install opencv-python`)
- Pillow (`pip install Pillow`)

## 📦 Deployment

### **Static Hosting**
This is a static website - no backend required. Deploy to:
- GitHub Pages
- Netlify
- Vercel
- Any static web host

### **Local Testing**
For local development, use a simple HTTP server:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (http-server)
npx http-server
```

Then open: `http://localhost:8000`

## 🎯 Future Enhancements

Potential features:
- Template signatures library
- Signature size adjustments
- Undo/Redo functionality
- Multiple signature storage
- Signature verification
- Mobile app (PWA)
- Cloud storage integration

## 🔧 Tech Stack

### Frontend
- HTML5 Canvas API
- CSS3 (Glassmorphism, Custom Properties)
- Vanilla JavaScript (No external dependencies)

### Advanced Features
- PDF.js for PDF processing
- html2canvas for screenshot detection
- AI-powered signature box detection
- TensorFlow.js ready for ML integration

### Deployment
- **Cloudflare Workers** - Serverless API
- **Cloudflare Pages** - Static site hosting
- **Global CDN** - Edge caching
- **Zero cold starts** - Instant scaling

## 📚 Documentation

- **[Technical Whitepaper](./TECHNICAL_WHITEPAPER.md)** - Architecture & specifications
- **[Workflow Diagrams](./WORKFLOW_DIAGRAMS.md)** - Process flows with Mermaid diagrams
- **[QUICK_START.md](./QUICK_START.md)** - Get started in 2 minutes

## 🚀 Deployment

### Cloudflare Deployment
```bash
# Install Wrangler
npm install -g @cloudflare/wrangler

# Configure wrangler.toml with your account details
# Update account_id and zone_id

# Deploy
wrangler publish
```

See `wrangler.toml` for full configuration.

## 🤝 Developer Info

**Name:** Wan Mohd Azizi  
**Role:** AI | ML Integration Developer + Full Stack Developer  
**Company:** CTECX Deckergui Agentic Integrated System  
**GitHub:** [github.com/ctaxnagomi](https://github.com/ctaxnagomi)

## 📝 License

**FREE TO USE** - No restrictions for personal or commercial use.

This project is provided as-is for free. You are welcome to use, modify, and distribute it.

### Attribution Appreciated
If you use CTECX-DigitalSign in your project, please credit:
- Original Developer: Wan Mohd Azizi
- GitHub: ctaxnagomi

## 💰 Support Development

CTECX-DigitalSign is completely free. If you find it useful, consider supporting the developer:

### Buy Me a Coffee ☕
Support the development through donations:

**[Buy Me a Coffee](https://buymeacoffee.com/ctaxnagomi)**

Your donations help:
- 🔧 Maintain the project
- 🚀 Add new features
- 📚 Improve documentation
- 🐛 Fix bugs faster
- 🎯 Develop enterprise features

### GitHub Sponsors 💖
[Become a GitHub Sponsor](https://github.com/sponsors/ctaxnagomi)

Every contribution, no matter the size, is deeply appreciated!

## 📞 Contact & Support

### For Feature Requests & Bug Reports
- Open an issue on [GitHub](https://github.com/ctaxnagomi/ctecx-digitalsign)

### For Enterprise Solutions
- Email: **ctaxnagomi@gmail.com**
- Subject: "CTECX API Services Inquiry"
- Check [API Services](./api-services.html) page for pricing

### Community
- GitHub Discussions: Share ideas and get help
- GitHub Issues: Report bugs and request features

## 🎉 Changelog

### v1.1.0 (March 17, 2026)
- ✨ AI-Integrated PDF signature detection
- 🆕 API Services with pricing tiers
- 📋 Patch Notes modal
- 📄 Technical whitepaper
- 🔗 Mermaid workflow diagrams
- 🚀 Cloudflare Workers setup
- 💰 Donation/sponsorship integration

### v1.0.0 (Initial Release)
- 🎨 Digital signature canvas
- 📥 PNG/JPG/WebP export
- 🎬 Welcome video intro
- 🎯 iOS glassmorphism design
- 📱 Fully responsive

## ⚖️ Terms & Conditions

- **Free to use:** No licensing restrictions
- **Open source:** Modify and distribute freely
- **No warranty:** Use at your own risk
- **Attribution:** Credit appreciated but not required

## 🙏 Acknowledgments

Special thanks to:
- All contributors and testers
- Users providing feedback
- The open source community
- Inspiration from modern design trends

---

**Enjoy creating your digital signatures!** ✓

Made with ❤️ by [Wan Mohd Azizi](https://github.com/ctaxnagomi)

*Last Updated: March 17, 2026*

```
