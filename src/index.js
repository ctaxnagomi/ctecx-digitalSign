/**
 * CTECX-DigitalSign Cloudflare Worker
 * Handles API requests for signature processing
 * 
 * Deploy with: wrangler publish
 */

const ALLOWED_ORIGINS = [
  'https://ctecx.digitalsign.app',
  'https://www.ctecx.digitalsign.app',
  'http://localhost:8000',
  'http://127.0.0.1:8000'
];

const API_VERSION = '1.0.0';
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

/**
 * Main request handler
 */
async function handleRequest(request) {
  // Add CORS headers
  const corsHeaders = getCorsHeaders(request);

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(request.url);
  const pathname = url.pathname;

  try {
    // Health check endpoint
    if (pathname === '/api/v1/health') {
      return handleHealthCheck(corsHeaders);
    }

    // Signature analysis endpoint
    if (pathname === '/api/v1/signature/analyze' && request.method === 'POST') {
      return await handleAnalyze(request, corsHeaders);
    }

    // Signature sign endpoint
    if (pathname === '/api/v1/signature/sign' && request.method === 'POST') {
      return await handleSign(request, corsHeaders);
    }

    // Version endpoint
    if (pathname === '/api/v1/version') {
      return handleVersion(corsHeaders);
    }

    // 404 Not Found
    return handleNotFound(corsHeaders);

  } catch (error) {
    return handleError(error, corsHeaders);
  }
}

/**
 * Handle health check
 */
function handleHealthCheck(corsHeaders) {
  const response = {
    status: 'operational',
    version: API_VERSION,
    timestamp: new Date().toISOString(),
    uptime: 'running'
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
      'Cache-Control': 'max-age=300'
    }
  });
}

/**
 * Handle version endpoint
 */
function handleVersion(corsHeaders) {
  const response = {
    version: API_VERSION,
    name: 'CTECX-DigitalSign API',
    author: 'Wan Mohd Azizi',
    released: '2026-03-17'
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json'
    }
  });
}

/**
 * Handle PDF analysis
 */
async function handleAnalyze(request, corsHeaders) {
  try {
    // Check API key
    const apiKey = request.headers.get('authorization');
    if (!apiKey || !validateApiKey(apiKey)) {
      return createErrorResponse(401, 'Unauthorized: Invalid or missing API key', corsHeaders);
    }

    // Get file from form data
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return createErrorResponse(400, 'No file provided', corsHeaders);
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return createErrorResponse(400, 'Invalid file type. Only PDF files are supported.', corsHeaders);
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return createErrorResponse(413, `File size exceeds maximum limit of ${MAX_FILE_SIZE / 1024 / 1024}MB`, corsHeaders);
    }

    // Mock analysis response (in production, this would call a PDF processing service)
    const startTime = Date.now();
    
    const response = {
      status: 'success',
      file_name: file.name,
      file_size: file.size,
      pages: 1,
      boxes: [
        {
          page: 1,
          x: 150,
          y: 600,
          width: 300,
          height: 100,
          confidence: 0.95,
          text: 'Signature Here'
        }
      ],
      metadata: {
        processed_at: new Date().toISOString(),
        api_version: API_VERSION
      },
      processing_time_ms: Date.now() - startTime
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });

  } catch (error) {
    return handleError(error, corsHeaders);
  }
}

/**
 * Handle PDF signing
 */
async function handleSign(request, corsHeaders) {
  try {
    // Check API key
    const apiKey = request.headers.get('authorization');
    if (!apiKey || !validateApiKey(apiKey)) {
      return createErrorResponse(401, 'Unauthorized: Invalid or missing API key', corsHeaders);
    }

    const formData = await request.formData();
    const file = formData.get('file');
    const signature = formData.get('signature');

    if (!file || !signature) {
      return createErrorResponse(400, 'Missing file or signature', corsHeaders);
    }

    // Mock signing response
    const response = {
      status: 'success',
      message: 'Document signed successfully',
      signed_at: new Date().toISOString(),
      download_url: '/api/v1/download/signed-document.pdf',
      expiry: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    return handleError(error, corsHeaders);
  }
}

/**
 * Handle 404 Not Found
 */
function handleNotFound(corsHeaders) {
  const response = {
    status: 'error',
    message: 'Endpoint not found',
    documentation: 'https://github.com/ctaxnagomi/ctecx-digitalsign'
  };

  return new Response(JSON.stringify(response), {
    status: 404,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json'
    }
  });
}

/**
 * Handle errors
 */
function handleError(error, corsHeaders) {
  console.error('API Error:', error);

  const response = {
    status: 'error',
    message: error.message || 'Internal server error',
    code: 'INTERNAL_ERROR'
  };

  return new Response(JSON.stringify(response), {
    status: 500,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json'
    }
  });
}

/**
 * Create error response
 */
function createErrorResponse(status, message, corsHeaders) {
  return new Response(JSON.stringify({
    status: 'error',
    message: message,
    code: `ERROR_${status}`
  }), {
    status: status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json'
    }
  });
}

/**
 * Get CORS headers
 */
function getCorsHeaders(request) {
  const origin = request.headers.get('origin');
  const isAllowed = ALLOWED_ORIGINS.includes(origin);

  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400'
  };
}

/**
 * Validate API key (mock implementation)
 * In production, check against database or KV store
 */
function validateApiKey(auth) {
  const token = auth.replace('Bearer ', '');
  // Mock validation - in production, validate against real keys
  return token && token.length > 10;
}

/**
 * Export handler for Cloudflare Workers
 */
export default {
  fetch: handleRequest
};
