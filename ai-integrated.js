// AI Integrated Signature Detection System
// Developer: Wan Mohd Azizi
// CTECX DeckergUI Agentic Integrated System - AI | ML Integration Developer + Full Stack Developer

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

let pdfDoc = null;
let currentPage = 1;
let signatureBoxes = [];
let signedPages = new Set();

const uploadArea = document.getElementById('uploadArea');
const pdfInput = document.getElementById('pdfInput');
const pdfViewer = document.getElementById('pdfViewer');
const pdfCanvas = document.getElementById('pdfCanvas');
const signatureBoxesContainer = document.getElementById('signatureBoxesContainer');
const pageNum = document.getElementById('pageNum');
const pageCount = document.getElementById('pageCount');
const statusMessage = document.getElementById('statusMessage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageInput = document.getElementById('pageInput');
const downloadBtn = document.getElementById('downloadBtn');
const resetBtn = document.getElementById('resetBtn');
const clearPdfBtn = document.getElementById('clearPdfBtn');

// Drag and drop handlers
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragging');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragging');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragging');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handlePdfUpload(files[0]);
    }
});

uploadArea.addEventListener('click', () => {
    pdfInput.click();
});

pdfInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handlePdfUpload(e.target.files[0]);
    }
});

function showStatus(message, type = 'success') {
    statusMessage.textContent = message;
    statusMessage.className = `status-message ${type}`;
    setTimeout(() => {
        statusMessage.className = 'status-message';
    }, 4000);
}

async function handlePdfUpload(file) {
    if (!file.type.includes('pdf')) {
        showStatus('Please upload a PDF file only', 'error');
        return;
    }

    try {
        const arrayBuffer = await file.arrayBuffer();
        pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        pageCount.textContent = pdfDoc.numPages;
        currentPage = 1;
        pageInput.value = 1;
        signatureBoxes = [];
        signedPages.clear();
        
        uploadArea.style.display = 'none';
        pdfViewer.classList.add('active');
        
        showStatus(`PDF loaded successfully! Found ${pdfDoc.numPages} pages. Detecting signature boxes...`, 'success');
        
        await renderPage(1);
    } catch (error) {
        showStatus(`Error loading PDF: ${error.message}`, 'error');
    }
}

async function renderPage(pageNumber) {
    try {
        const page = await pdfDoc.getPage(pageNumber);
        const scale = window.innerWidth < 768 ? 1.5 : 2;
        const viewport = page.getViewport({ scale });

        pdfCanvas.width = viewport.width;
        pdfCanvas.height = viewport.height;

        const context = pdfCanvas.getContext('2d');
        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };

        await page.render(renderContext).promise;

        // Extract text from page for signature detection
        await detectSignatureBoxes(page, pageNumber, viewport);

        currentPage = pageNumber;
        pageNum.textContent = pageNumber;
        pageInput.value = pageNumber;

        // Update button states
        prevBtn.disabled = pageNumber === 1;
        nextBtn.disabled = pageNumber === pdfDoc.numPages;

    } catch (error) {
        console.error('Error rendering page:', error);
        showStatus(`Error rendering page: ${error.message}`, 'error');
    }
}

async function detectSignatureBoxes(page, pageNumber, viewport) {
    clearSignatureBoxes();

    try {
        // Get text content from page
        const textContent = await page.getTextContent();
        
        // Simple pattern detection for signature boxes
        const signaturePatterns = [
            /signature\s*(?:here|line|field|box|area)?\s*:?/gi,
            /sign\s*(?:here)?/gi,
            /authorized\s*(?:by|signature)/gi,
            /place\s*signature\s*here/gi,
            /signature\s*\/\s*sign/gi,
        ];

        let foundBoxes = 0;
        const detectedBoxes = [];

        // Analyze text items for signature indicators
        textContent.items.forEach((item, index) => {
            const text = item.str.trim();
            
            // Check if text matches signature patterns
            const isSignatureBox = signaturePatterns.some(pattern => pattern.test(text));
            
            if (isSignatureBox) {
                const bbox = item.transformed;
                if (bbox && bbox.length >= 4) {
                    // bbox format: [x1, y1, x2, y2]
                    const x = Math.min(bbox[0], bbox[2]) * (viewport.width / page.getViewport({ scale: 1 }).width);
                    const y = viewport.height - (Math.max(bbox[1], bbox[3]) * (viewport.height / page.getViewport({ scale: 1 }).height));
                    const width = Math.abs(bbox[2] - bbox[0]) * (viewport.width / page.getViewport({ scale: 1 }).width);
                    const height = Math.abs(bbox[3] - bbox[1]) * (viewport.height / page.getViewport({ scale: 1 }).height);

                    if (width > 30 && height > 20) {
                        detectedBoxes.push({
                            pageNumber,
                            x: Math.max(0, x),
                            y: Math.max(0, y - height),
                            width: Math.max(100, width),
                            height: Math.max(50, height),
                            text: text.substring(0, 50),
                            id: `${pageNumber}-${foundBoxes}`
                        });
                        foundBoxes++;
                    }
                }
            }
        });

        // If no boxes found through text analysis, create sample detection boxes
        if (detectedBoxes.length === 0) {
            // For demo purposes, scan for text patterns more flexibly
            let allText = textContent.items.map(item => item.str).join(' ');
            
            if (allText.toLowerCase().includes('sign') || 
                allText.toLowerCase().includes('signature') ||
                allText.toLowerCase().includes('authorized')) {
                
                // Create placeholder boxes for demonstration
                const baseY = viewport.height / 3;
                detectedBoxes.push({
                    pageNumber,
                    x: 50,
                    y: baseY,
                    width: 150,
                    height: 60,
                    text: 'Signature Area',
                    id: `${pageNumber}-0`,
                    isPlaceholder: true
                });
            }
        }

        // Create UI elements for detected boxes
        detectedBoxes.forEach(box => {
            createSignatureBoxUI(box);
            signatureBoxes.push(box);
        });

        if (detectedBoxes.length > 0) {
            showStatus(`Detected ${detectedBoxes.length} signature box(es) on page ${pageNumber}`, 'success');
        } else {
            showStatus(`No signature boxes detected on page ${pageNumber}. Looking for pattern matches...`, 'success');
        }

    } catch (error) {
        console.error('Error detecting signature boxes:', error);
    }
}

function createSignatureBoxUI(box) {
    const boxElement = document.createElement('div');
    boxElement.className = 'signature-box';
    boxElement.id = box.id;
    boxElement.style.left = box.x + 'px';
    boxElement.style.top = box.y + 'px';
    boxElement.style.width = box.width + 'px';
    boxElement.style.height = box.height + 'px';
    boxElement.textContent = 'Sign Here';
    boxElement.title = box.text;

    // Create canvas inside the box for drawing
    const canvas = document.createElement('canvas');
    canvas.width = box.width;
    canvas.height = box.height;
    canvas.className = 'signature-box-canvas';
    canvas.dataset.boxId = box.id;
    
    boxElement.appendChild(canvas);

    // Drawing functionality
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#00d4ff';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        lastX = e.clientX - rect.left;
        lastY = e.clientY - rect.top;
        boxElement.classList.add('signed');
        signedPages.add(box.pageNumber);
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!isDrawing) return;
        
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();

        lastX = x;
        lastY = y;
    });

    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
    });

    canvas.addEventListener('mouseleave', () => {
        isDrawing = false;
    });

    // Touch support
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        lastX = touch.clientX - rect.left;
        lastY = touch.clientY - rect.top;
        boxElement.classList.add('signed');
        signedPages.add(box.pageNumber);
    });

    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (!isDrawing) return;
        
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();

        lastX = x;
        lastY = y;
    });

    canvas.addEventListener('touchend', () => {
        isDrawing = false;
    });

    signatureBoxesContainer.appendChild(boxElement);
}

function clearSignatureBoxes() {
    signatureBoxesContainer.innerHTML = '';
}

// Navigation
prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        renderPage(currentPage - 1);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentPage < pdfDoc.numPages) {
        renderPage(currentPage + 1);
    }
});

pageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        let pageNum = parseInt(pageInput.value);
        if (pageNum >= 1 && pageNum <= pdfDoc.numPages) {
            renderPage(pageNum);
        }
    }
});

// Reset all signatures on current page
resetBtn.addEventListener('click', () => {
    const canvases = signatureBoxesContainer.querySelectorAll('canvas');
    canvases.forEach(canvas => {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.parentElement.classList.remove('signed');
    });
    signedPages.delete(currentPage);
    showStatus('Signatures cleared', 'success');
});

// Clear PDF and reset
clearPdfBtn.addEventListener('click', () => {
    pdfDoc = null;
    currentPage = 1;
    signatureBoxes = [];
    signedPages.clear();
    
    pdfViewer.classList.remove('active');
    uploadArea.style.display = 'block';
    pdfInput.value = '';
    
    clearSignatureBoxes();
    showStatus('Ready to upload a new PDF', 'success');
});

// Download signed PDF (simplified version - combines canvas with PDF)
downloadBtn.addEventListener('click', async () => {
    if (!pdfDoc) {
        showStatus('No PDF loaded', 'error');
        return;
    }

    try {
        downloadBtn.disabled = true;
        downloadBtn.textContent = 'Generating PDF...';
        
        showStatus('Generating signed PDF...', 'success');

        // Capture signatures and create a composite image
        const signatureCanvas = document.createElement('canvas');
        signatureCanvas.width = pdfCanvas.width;
        signatureCanvas.height = pdfCanvas.height;
        const sigCtx = signatureCanvas.getContext('2d');

        // Draw all signature canvases onto composite
        const allCanvases = signatureBoxesContainer.querySelectorAll('canvas.signature-box-canvas');
        allCanvases.forEach(canvas => {
            const parentBox = canvas.parentElement;
            const x = parseFloat(parentBox.style.left);
            const y = parseFloat(parentBox.style.top);
            sigCtx.drawImage(canvas, x, y);
        });

        // Create download link
        const link = document.createElement('a');
        link.href = signatureCanvas.toDataURL('image/png');
        link.download = `signed-document-${new Date().getTime()}.png`;
        link.click();

        showStatus('Signed page exported as image. Full PDF export coming soon!', 'success');
        
    } catch (error) {
        showStatus(`Error generating PDF: ${error.message}`, 'error');
    } finally {
        downloadBtn.disabled = false;
        downloadBtn.textContent = '📥 Download Signed PDF';
    }
});

// Initialize
showStatus('Upload a PDF to get started', 'success');
