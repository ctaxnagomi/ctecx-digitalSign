# Security Policy

## Supported Versions

Currently, we support the following versions:

| Version | Status | Support Until |
|---------|--------|----------------|
| 1.1.x | ✅ Supported | Current |
| 1.0.x | ⚠️ Limited | 3 months |
| < 1.0 | ❌ Unsupported | End of life |

## Reporting a Vulnerability

**Please do not publicly disclose security vulnerabilities!**

If you discover a security vulnerability in CTECX-DigitalSign, please report it responsibly to:

📧 **Email:** ctaxnagomi@gmail.com

**Include in your report:**
- Description of the vulnerability
- Steps to reproduce (if applicable)
- Potential impact
- Suggested fix (if you have one)
- Your contact information

## What to Expect

1. **Acknowledgment** (within 48 hours)
2. **Investigation** and assessment
3. **Fix development** (prioritized based on severity)
4. **Security advisory** release
5. **Credit** to reporter (if desired)

## Security Best Practices

### For Users
- ✅ Keep your browser updated
- ✅ Use HTTPS connections
- ✅ Don't share sensitive data unnecessarily
- ✅ Review file contents before signing

### For Developers
- ✅ Never commit secrets or API keys
- ✅ Use `.gitignore` to exclude sensitive files
- ✅ Keep dependencies updated
- ✅ Follow OWASP guidelines
- ✅ Validate all user inputs
- ✅ Use CORS appropriately
- ✅ Implement proper error handling

## Known Limitations

- **Client-side processing** - All processing happens in your browser
- **No data persistence** - Files are not stored on servers
- **Browser dependent** - Features depend on browser capabilities
- **No authentication** - Currently, no user authentication system

## Security Features Implemented

✅ **CORS Validation**
- Restricted origins
- Preflight requests
- Header validation

✅ **API Security**
- API key validation
- File type verification
- File size limits (50MB)
- Input sanitization

✅ **Data Privacy**
- Client-side processing only
- No server logs of content
- No tracking or cookies
- GDPR compliant

✅ **Code Security**
- No known vulnerabilities
- Regular dependency updates
- Error handling
- Proper error messages (no info leakage)

## Vulnerability Disclosure Timeline

- **Day 1**: Vulnerability reported
- **Day 1-2**: Initial response and assessment
- **Day 3-7**: Fix development
- **Day 8-14**: Testing and preparation
- **Day 15**: Public disclosure (after fix release)

## Security Changelog

### v1.1.0
- ✅ Added CORS validation
- ✅ Added API key authentication
- ✅ Added file type/size verification
- ✅ Added input sanitization
- ✅ Enhanced error handling

### v1.0.0
- ✅ Initial release with client-side processing
- ✅ No external dependencies
- ✅ Minimal attack surface

## Third-Party Dependencies

CTECX-DigitalSign uses the following libraries:
- **html2canvas** - Screenshot generation
- **PDF.js** - PDF processing
- **TensorFlow.js** (optional) - ML features

All dependencies are vetted for security and kept up-to-date.

## Responsible Disclosure

We believe in responsible disclosure and appreciate security researchers who follow these practices:
- ✅ Report vulnerabilities privately
- ✅ Give us reasonable time to respond
- ✅ Avoid public disclosure before fix release
- ✅ Don't access/modify user data
- ✅ Don't impact availability/performance

## Questions?

For security-related questions, contact: ctaxnagomi@gmail.com

---

**Thank you for helping keep CTECX-DigitalSign secure! 🔒**
