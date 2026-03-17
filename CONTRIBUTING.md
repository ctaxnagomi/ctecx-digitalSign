# Contributing to CTECX-DigitalSign

Thank you for your interest in contributing to CTECX-DigitalSign! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

Please read and follow our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before contributing.

## How to Contribute

### Reporting Bugs

Before submitting a bug report, please check the existing issues to avoid duplicates.

When creating a bug report, include:
- **Clear descriptive title**
- **Detailed description** of the problem
- **Steps to reproduce** the issue
- **Expected behavior** vs actual behavior
- **Screenshots** (if applicable)
- **Environment** (browser, OS, version)
- **Additional context** if relevant

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub Issues. When creating an enhancement suggestion:
- Use a clear descriptive title
- Provide a detailed description of the enhancement
- List some use cases for it
- Link any relevant issues or pull requests

### Pull Requests

1. **Fork** the repository
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/ctecx-digitalsign.git
   cd ctecx-digitalsign
   ```

3. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make your changes**:
   - Follow the existing code style
   - Write clear commit messages
   - Keep commits focused and atomic
   - Test your changes thoroughly

5. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: Add your feature description"
   ```

6. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request** on GitHub:
   - Fill in the PR template completely
   - Link related issues
   - Add screenshots for UI changes
   - Request review from maintainers

## Development Setup

### Prerequisites
- Git
- Node.js (v14 or higher)
- Cloudflare Wrangler CLI (for deployment features)

### Local Development

```bash
# Clone the repository
git clone https://github.com/ctaxnagomi/ctecx-digitalsign.git
cd ctecx-digitalsign

# Install dependencies (if using npm)
npm install

# Start local server
python -m http.server 8000

# Visit http://localhost:8000
```

### Testing

- Test all signature modes (normal & AI)
- Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- Test on mobile devices
- Test form submissions
- Test API endpoints (if modified)

## Code Style Guidelines

### HTML
- Use semantic HTML5 elements
- Include proper ARIA labels for accessibility
- Maintain consistent indentation (2 spaces)

### CSS
- Use CSS custom properties for colors
- Maintain mobile-first responsive design
- Include media queries for all breakpoints
- Use meaningful class names

### JavaScript
- Use ES6+ features
- Write clean, readable code
- Include comments for complex logic
- Follow DRY (Don't Repeat Yourself) principle
- Use const/let instead of var

### Documentation
- Keep README.md up-to-date
- Document new features in TECHNICAL_WHITEPAPER.md
- Update WORKFLOW_DIAGRAMS.md if adding new processes
- Add release notes for user-facing changes

## Commit Message Format

```
<type>: <subject>

<body>

<footer>
```

### Types
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Build process, dependencies, tooling

### Examples
```
feat: Add two-factor authentication
fix: Resolve PDF upload validation issue
docs: Update deployment guide for v1.1.0
```

## Documentation

When adding features, please update relevant documentation:
- **TECHNICAL_WHITEPAPER.md** - Technical specifications
- **WORKFLOW_DIAGRAMS.md** - Process diagrams
- **README.md** - User-facing features
- **DEPLOYMENT_GUIDE.md** - Deployment changes
- **RELEASE_NOTES_v1.1.0.md** - Feature summary

## Review Process

1. **Automated checks** run on your PR
2. **Code review** by maintainers
3. **Testing** on various browsers/devices
4. **Approval** and merge

## License

By contributing, you agree that your contributions will be licensed under the same Free-to-Use license as the project.

## Questions or Need Help?

- 📧 Email: ctaxnagomi@gmail.com
- 🐙 GitHub Issues: [Report a bug](../../issues/new)
- 💬 GitHub Discussions: (Coming soon)

## Acknowledgments

We appreciate all contributors who help improve CTECX-DigitalSign!

---

**Thank you for contributing! 🎉**
