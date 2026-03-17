#!/bin/bash
# CTECX-DigitalSign Setup and Launch Guide

echo "╔════════════════════════════════════════════════════════════════════╗"
echo "║                  CTECX-DigitalSign Setup Guide                    ║"
echo "╚════════════════════════════════════════════════════════════════════╝"
echo ""

# Check Python for logo extraction
echo "📦 Checking requirements..."

python3 --version > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✓ Python 3 is installed"
else
    echo "⚠ Python 3 is not installed. Logo extraction script won't work."
    echo "  Install Python 3 from https://www.python.org/"
fi

echo ""
echo "📂 Project Structure:"
echo "   ✓ index.html           - Main application"
echo "   ✓ welcome.html         - Welcome/intro page"
echo "   ✓ style.css            - Stylesheets"
echo "   ✓ script.js            - JavaScript logic"
echo "   ✓ ctex-logo.webp       - Brand logo (extracted from video)"
echo "   ✓ favicon.ico          - Browser favicon"
echo "   ✓ All other favicons   - Multiple sizes"
echo ""

echo "🎬 Logo Information:"
echo "   Source: ctex-logo-2.mp4 (Welcome video)"
echo "   Format: WebP (optimized)"
echo "   Favicon Sizes: 32x32, 64x64, 128x128, 192x192, 256x256"
echo ""

echo "🚀 To launch the website:"
echo ""
echo "   Option 1: Direct Open"
echo "   ─────────────────────"
echo "   • Open 'index.html' directly in your browser"
echo "   • Or open 'welcome.html' for the intro experience"
echo ""

echo "   Option 2: Local Server (Python 3)"
echo "   ──────────────────────────────────"
echo "   • Run: python -m http.server 8000"
echo "   • Open: http://localhost:8000"
echo ""

echo "   Option 3: Local Server (Node.js)"
echo "   ──────────────────────────────────"
echo "   • Install: npm install -g http-server"
echo "   • Run: http-server"
echo "   • Open: http://localhost:8080"
echo ""

echo "🔧 To re-extract logo from video:"
echo "   • Run: python extract_logo.py"
echo "   • Requires: opencv-python, Pillow"
echo "   • Install: pip install opencv-python pillow"
echo ""

echo "🌐 Browser Compatibility:"
echo "   ✓ Chrome/Edge 90+"
echo "   ✓ Firefox 88+"
echo "   ✓ Safari 14+"
echo "   ✓ Modern mobile browsers"
echo ""

echo "✨ Features:"
echo "   ✓ Digital signature creation"
echo "   ✓ Download as PNG, JPG, or WebP"
echo "   ✓ iOS-style glassmorphism design"
echo "   ✓ Fully responsive (mobile, tablet, desktop)"
echo "   ✓ Hidden scrollbars"
echo "   ✓ Smooth animations"
echo "   ✓ Multi-size favicons"
echo "   ✓ Welcome intro video"
echo ""

echo "📝 Navigation:"
echo "   • PDPR        - Privacy policy page"
echo "   • How to Use  - Usage instructions"
echo ""

echo "═══════════════════════════════════════════════════════════════════════"
echo "                    Ready to start! 🎉"
echo "═══════════════════════════════════════════════════════════════════════"
