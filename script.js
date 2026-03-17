// Visitor Counter Animation
const visitorCount = document.getElementById('visitorCount');

function formatNumber(num) {
    return num.toLocaleString('en-US');
}

function initVisitorCarousel() {
    let currentVisitors = 5762;
    const maxVisitors = 700000;
    const intervals = [5000, 10000, 15000, 30000]; // milliseconds
    let intervalIndex = 0;

    function updateCounter() {
        if (currentVisitors >= maxVisitors) {
            currentVisitors = 5762;
            intervalIndex = 0;
        }

        // Multiply by 2 at different intervals
        const currentInterval = intervals[intervalIndex % intervals.length];
        
        setTimeout(() => {
            currentVisitors = Math.min(currentVisitors * 2, maxVisitors);
            visitorCount.textContent = formatNumber(currentVisitors);
            
            // Add animation
            visitorCount.style.animation = 'none';
            setTimeout(() => {
                visitorCount.style.animation = 'counterFloat 0.6s ease-out';
            }, 10);

            intervalIndex++;
            
            // Schedule next update
            const nextInterval = intervals[intervalIndex % intervals.length];
            updateCounter();
        }, currentInterval);
    }

    // Start the carousel
    updateCounter();
}

// Get canvas and context
const canvas = document.getElementById('signatureCanvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true, alpha: true });

// Get UI elements
const penSize = document.getElementById('penSize');
const penColor = document.getElementById('penColor');
const backgroundColor = document.getElementById('backgroundColor');
const sizeValue = document.getElementById('sizeValue');
const clearBtn = document.getElementById('clearBtn');
const resetBtn = document.getElementById('resetBtn');
const downloadPNG = document.getElementById('downloadPNG');
const downloadJPG = document.getElementById('downloadJPG');
const downloadWebP = document.getElementById('downloadWebP');

// State variables
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let currentBgColor = 'transparent';

// Smooth drawing with curve interpolation
let curvePoints = [];
let lastRenderX = 0;
let lastRenderY = 0;

// Initialize canvas with proper sizing and optimization
function initCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    // Set canvas resolution based on device pixel ratio for sharp rendering
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    // Scale context to maintain CSS size
    ctx.scale(dpr, dpr);
    
    // Optimize drawing context
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.miterLimit = 10;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    
    // Set canvas background
    setBackgroundColor('transparent');
}

// Set canvas background
function setBackgroundColor(color) {
    currentBgColor = color;
    const rect = canvas.getBoundingClientRect();
    
    ctx.clearRect(0, 0, rect.width, rect.height);
    
    if (color === 'white') {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, rect.width, rect.height);
    } else if (color === 'light') {
        ctx.fillStyle = '#f0f8ff';
        ctx.fillRect(0, 0, rect.width, rect.height);
    }
}

// Update pen size display
penSize.addEventListener('input', (e) => {
    sizeValue.textContent = e.target.value;
}, { passive: true });

// Background color change
backgroundColor.addEventListener('change', (e) => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setBackgroundColor(e.target.value);
    ctx.putImageData(imageData, 0, 0);
}, { passive: true });

// Start drawing
function startDrawing(e) {
    isDrawing = true;
    curvePoints = [];
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    if (e.touches) {
        const touch = e.touches[0];
        lastX = (touch.clientX - rect.left) * dpr;
        lastY = (touch.clientY - rect.top) * dpr;
    } else {
        lastX = (e.clientX - rect.left) * dpr;
        lastY = (e.clientY - rect.top) * dpr;
    }
    
    lastRenderX = lastX;
    lastRenderY = lastY;
    curvePoints.push({ x: lastX, y: lastY });
}

canvas.addEventListener('mousedown', startDrawing, { passive: false });
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    startDrawing(e);
}, { passive: false });

// Smooth Bezier curve drawing function
function drawSmooth(x, y) {
    if (!isDrawing) return;
    
    curvePoints.push({ x, y });
    
    ctx.strokeStyle = penColor.value;
    ctx.lineWidth = penSize.value;
    ctx.globalAlpha = 0.95;
    
    if (curvePoints.length > 2) {
        // Draw smooth quadratic curve through points
        const len = curvePoints.length;
        
        if (len > 3) {
            const p1 = curvePoints[len - 3];
            const p2 = curvePoints[len - 2];
            const p3 = curvePoints[len - 1];
            
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.quadraticCurveTo(p2.x, p2.y, p3.x, p3.y);
            ctx.stroke();
        }
    }
    
    ctx.globalAlpha = 1.0;
    lastX = x;
    lastY = y;
}

// Mouse move
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const x = (e.clientX - rect.left) * dpr;
    const y = (e.clientY - rect.top) * dpr;
    drawSmooth(x, y);
}, { passive: true });

// Touch move
canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const touch = e.touches[0];
    const x = (touch.clientX - rect.left) * dpr;
    const y = (touch.clientY - rect.top) * dpr;
    drawSmooth(x, y);
}, { passive: false });

// Stop drawing
function stopDrawing() {
    isDrawing = false;
    curvePoints = [];
}

canvas.addEventListener('mouseup', stopDrawing, { passive: true });
canvas.addEventListener('mouseleave', stopDrawing, { passive: true });
canvas.addEventListener('touchend', stopDrawing, { passive: true });

// Clear canvas
clearBtn.addEventListener('click', () => {
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    
    if (currentBgColor !== 'transparent') {
        if (currentBgColor === 'white') {
            ctx.fillStyle = 'white';
        } else if (currentBgColor === 'light') {
            ctx.fillStyle = '#f0f8ff';
        }
        ctx.fillRect(0, 0, rect.width, rect.height);
    }
}, { passive: true });

// Reset all settings
resetBtn.addEventListener('click', () => {
    penSize.value = 3;
    penColor.value = '#00d4ff';
    backgroundColor.value = 'transparent';
    sizeValue.textContent = 3;
    currentBgColor = 'transparent';
    
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
}, { passive: true });

// Create a canvas with proper background for download
function getDownloadCanvas(format) {
    const downloadCanvas = document.createElement('canvas');
    downloadCanvas.width = canvas.width;
    downloadCanvas.height = canvas.height;
    const downloadCtx = downloadCanvas.getContext('2d');
    
    if (format === 'jpg') {
        // JPG doesn't support transparency, use white background
        downloadCtx.fillStyle = 'white';
        downloadCtx.fillRect(0, 0, downloadCanvas.width, downloadCanvas.height);
    }
    
    // Draw the signature
    downloadCtx.drawImage(canvas, 0, 0);
    
    return downloadCanvas;
}

// Download as PNG
downloadPNG.addEventListener('click', () => {
    const downloadCanvas = getDownloadCanvas('png');
    const link = document.createElement('a');
    link.href = downloadCanvas.toDataURL('image/png');
    link.download = `signature_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}, { passive: true });

// Download as JPG
downloadJPG.addEventListener('click', () => {
    const downloadCanvas = getDownloadCanvas('jpg');
    const link = document.createElement('a');
    link.href = downloadCanvas.toDataURL('image/jpeg', 0.95);
    link.download = `signature_${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}, { passive: true });

// Download as WebP
downloadWebP.addEventListener('click', () => {
    const downloadCanvas = getDownloadCanvas('webp');
    downloadCanvas.toBlob((blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `signature_${Date.now()}.webp`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    }, 'image/webp', 0.95);
}, { passive: true });

// Handle window resize with debouncing
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        initCanvas();
        ctx.putImageData(imageData, 0, 0);
    }, 200);
}, { passive: true });

// Initialize on load
window.addEventListener('load', () => {
    initCanvas();
    initVisitorCarousel();
}, { passive: true });
document.addEventListener('DOMContentLoaded', () => {
    initCanvas();
    initVisitorCarousel();
}, { passive: true });
initCanvas();

// Mobile Menu Toggle Handler
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('header')) {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}
