# CTECX-DigitalSign Microservices Management Guide

## Overview

This guide covers the three microservices management scripts for CTECX-DigitalSign:

1. **MicroservicesManager.vbs** - VBScript version (lightweight)
2. **StartMicroservices.bat** - Batch launcher (simple)
3. **MicroservicesManager.ps1** - PowerShell version (advanced)

All scripts ensure your RESTful API services are always running and track AI agentic learning activities with monthly conclusions.

---

## Features

✅ **Service Management**
- Start/stop/restart API server
- Automatic health checks every 30 seconds
- Auto-restart on failure (after 5 failed checks)
- Process monitoring

✅ **AI Activity Tracking**
- Log signature processing activities
- Track PDF analysis operations
- Monitor API request counts
- Record response times

✅ **Monthly Conclusions**
- Auto-generate monthly AI learning reports
- Track accuracy improvements
- Provide business insights
- Include technical metrics

✅ **Logging & Monitoring**
- Detailed log files (daily rotation)
- Activity logs (CSV format)
- Health status monitoring
- Service status dashboard

---

## Method 1: VBScript (MicroservicesManager.vbs)

### Best For:
- Lightweight automation
- Windows systems without PowerShell
- Scheduled tasks
- Background monitoring

### Prerequisites
- Windows 7+ (any edition)
- Node.js 14+ (for API server)
- CloudFlare Wrangler CLI (for API deployment)
- Python 3.8+ (optional, for AI features)

### Usage

**Option A: Double-click (Easiest)**
```
1. Right-click MicroservicesManager.vbs
2. Select "Run as administrator"
3. Services will start in background
```

**Option B: Command line**
```powershell
# Run VBScript directly
cscript.exe "C:\path\to\MicroservicesManager.vbs"

# Or use the batch launcher
"C:\path\to\StartMicroservices.bat"
```

**Option C: Schedule with Task Scheduler**
```
1. Open Task Scheduler
2. Create Basic Task
3. Name: "CTECX-DigitalSign Microservices"
4. Trigger: "At startup"
5. Action: Start program
6. Program: cscript.exe
7. Arguments: "C:\path\to\MicroservicesManager.vbs"
```

### What It Does
- Initializes logging and AI data directories
- Checks prerequisites (Node.js, Python, Wrangler)
- Starts API server on port 8000
- Monitors health every 30 seconds
- Restarts if fails (5 retries)
- Tracks AI activities in real-time
- Generates monthly conclusions
- Maintains detailed logs

### Output
```
Logs:          logs\service_YYYYMMDD.log
Activity:      ai-data\AI_Reports_YYYY-MM\activity_log.txt
Conclusions:   ai-data\AI_Reports_YYYY-MM\monthly_conclusion_YYYY-MM.txt
```

---

## Method 2: Batch Script (StartMicroservices.bat)

### Best For:
- Quick launch
- Windows task scheduler
- Simple automation
- Desktop shortcuts

### Prerequisites
- Windows XP+ (any edition)
- Node.js 14+ (for API server)
- CloudFlare Wrangler CLI

### Usage

**Option A: Double-click**
```
1. Double-click StartMicroservices.bat
2. Choose "Run as administrator" when prompted
3. A command window will open
```

**Option B: From command line**
```cmd
cd C:\path\to\ctecx-digitalSign
StartMicroservices.bat
```

**Option C: Create desktop shortcut**
```
1. Right-click StartMicroservices.bat
2. Send to > Desktop (create shortcut)
3. Right-click shortcut > Properties
4. Advanced > Check "Run as administrator"
5. Double-click to launch
```

### What It Does
- Creates necessary directories
- Checks for administrator privileges
- Verifies project files exist
- Launches VBScript manager
- Displays service information

---

## Method 3: PowerShell (MicroservicesManager.ps1)

### Best For:
- Advanced automation
- Enterprise environments
- Task scheduling
- Professional deployment
- Detailed monitoring

### Prerequisites
- Windows 7+ with PowerShell 5.1+
- Node.js 14+ (for API server)
- CloudFlare Wrangler CLI
- Python 3.8+ (optional)

### Installation

**Step 1: Allow script execution**
```powershell
# Open PowerShell as Administrator
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
```

**Step 2: Run the script**
```powershell
# Navigate to project directory
cd "C:\Users\KR\ctecx-digitalSign"

# Run with default action (Start)
.\MicroservicesManager.ps1

# Or specify action and environment
.\MicroservicesManager.ps1 -Action Start -Environment Production
```

### Usage Examples

**Start services**
```powershell
.\MicroservicesManager.ps1 -Action Start -Environment Development
```

**Check status**
```powershell
.\MicroservicesManager.ps1 -Action Status
```

**Restart services**
```powershell
.\MicroservicesManager.ps1 -Action Restart -Environment Production
```

**View logs**
```powershell
.\MicroservicesManager.ps1 -Action Logs
```

**Schedule auto-start**
```powershell
.\MicroservicesManager.ps1 -Action Schedule
# Services will auto-start on system boot
```

**Stop services**
```powershell
.\MicroservicesManager.ps1 -Action Stop
```

### Parameters

| Parameter | Default | Options | Description |
|-----------|---------|---------|-------------|
| Action | Start | Start, Stop, Restart, Status, Logs, Schedule | What to do |
| Environment | Development | Development, Production | Deployment environment |

### Commands Reference

```powershell
# Development environment
.\MicroservicesManager.ps1 -Action Start -Environment Development

# Production environment
.\MicroservicesManager.ps1 -Action Start -Environment Production

# Restart in production
.\MicroservicesManager.ps1 -Action Restart -Environment Production

# View current status
.\MicroservicesManager.ps1 -Action Status

# View logs
.\MicroservicesManager.ps1 -Action Logs

# Schedule auto-start on boot
.\MicroservicesManager.ps1 -Action Schedule

# Stop all services
.\MicroservicesManager.ps1 -Action Stop
```

---

## Service Details

### API Server
- **Port:** 8000 (configurable)
- **Technology:** CloudFlare Workers + Wrangler
- **Endpoint:** `http://localhost:8000/api/v1/`

**Available Endpoints:**
- `GET /api/v1/health` - Health check
- `POST /api/v1/signature/analyze` - Analyze PDF
- `POST /api/v1/signature/sign` - Sign document
- `GET /api/v1/version` - Version info

### Health Monitoring
- **Check Interval:** 30 seconds (configurable)
- **Max Retries:** 5 attempts
- **Auto-Restart:** Yes (after 5 failed checks)

### AI Activity Tracking
- **Interval:** 30 seconds
- **Tracked Metrics:**
  - Signatures processed
  - PDFs analyzed
  - API requests
  - Response times

### Monthly Conclusions
- **Generated:** Last day of month (automatic)
- **Contents:**
  - Processing statistics
  - AI accuracy improvements
  - Behavior patterns
  - Recommendations
  - Technical metrics
  - Business insights

---

## Directory Structure

```
ctecx-digitalSign/
├── MicroservicesManager.vbs      # VBScript manager
├── MicroservicesManager.ps1      # PowerShell manager
├── StartMicroservices.bat        # Batch launcher
├── logs/                          # Daily log files
│   └── service_YYYYMMDD.log
├── ai-data/                       # AI tracking data
│   └── AI_Reports_YYYY-MM/
│       ├── activity_log_YYYYMMDD.csv
│       └── monthly_conclusion_YYYY-MM.txt
└── [other project files...]
```

---

## Log Files

### Service Logs
**Location:** `logs/service_YYYYMMDD.log`

```
[2026-03-17 09:15:23] [Information] CTECX-DigitalSign Microservices Manager Starting
[2026-03-17 09:15:24] [Success] Node.js found: v14.21.0
[2026-03-17 09:15:24] [Success] Python found: 3.9.7
[2026-03-17 09:15:24] [Success] API Server started successfully (Port 8000)
[2026-03-17 09:15:54] [Success] Health check passed
```

### Activity Logs
**Location:** `ai-data/AI_Reports_YYYY-MM/activity_log_YYYYMMDD.csv`

```csv
Timestamp,Activity Type,Count,Status,Duration(ms)
2026-03-17 09:15:30,Signatures,42,Success,234
2026-03-17 09:15:30,PDF Analysis,17,Success,567
2026-03-17 09:15:30,API Requests,89,Success,45
```

### Monthly Conclusions
**Location:** `ai-data/AI_Reports_YYYY-MM/monthly_conclusion_YYYY-MM.txt`

Contains:
- Processing statistics
- AI accuracy metrics
- User behavior insights
- Performance recommendations
- Technical metrics
- Business metrics

---

## Troubleshooting

### Issue: "Node.js not found"
**Solution:**
```bash
# Install Node.js
https://nodejs.org/

# Verify installation
node --version  # Should return v14+
```

### Issue: "Wrangler not installed"
**Solution:**
```bash
npm install -g @cloudflare/wrangler
wrangler login
```

### Issue: "API Server won't start"
**Solution:**
```powershell
# Check if port 8000 is in use
netstat -ano | findstr :8000

# Kill process using port
taskkill /PID <PID> /F

# Restart services
.\MicroservicesManager.ps1 -Action Restart
```

### Issue: "Permission denied"
**Solution:**
- Right-click script → "Run as administrator"
- Or change execution policy: `Set-ExecutionPolicy RemoteSigned`

### Issue: "Script not found"
**Solution:**
- Ensure you're in the correct directory
- Check file permissions (allow execute)
- Try full path: `"C:\path\to\MicroservicesManager.ps1"`

---

## Performance Tuning

### Adjust check interval
**VBScript:** Edit line ~180
```vbscript
WScript.Sleep 30000 ' Change to your desired interval (milliseconds)
```

**PowerShell:** Edit line ~185
```powershell
$script:Config = @{
    CheckInterval   = 30  # Change interval in seconds
}
```

### Adjust max retries
**VBScript:** Edit line ~220
```vbscript
intMaxRetries = 5  ' Change to your desired number
```

**PowerShell:** Edit line ~185
```powershell
MaxRetries      = 5  # Change to your desired number
```

### Disable AI tracking
Comment out `Call StartAIActivityTracker()` in VBScript or PowerShell

---

## Security Considerations

✅ **Best Practices**
- Run as Administrator (for task scheduling)
- Keep scripts in project directory
- Don't share API keys in logs
- Secure log files (restrict access)
- Regular backup of AI data

✅ **Permissions**
- Grant Execute permission only to trusted scripts
- Use NTFS permissions for log directories
- Restrict access to ai-data folder

---

## Automation Examples

### Auto-start on Windows Boot (PowerShell)
```powershell
# Run as Administrator
.\MicroservicesManager.ps1 -Action Schedule
```

### Auto-start with Task Scheduler (VBScript)
```
Task Name: CTECX-DigitalSign
Program: cscript.exe
Arguments: "C:\path\to\MicroservicesManager.vbs"
Trigger: At startup
Run with highest privileges: ✓
```

### Scheduled Health Reports (PowerShell)
```powershell
# Create daily health check task
$action = New-ScheduledTaskAction -Execute "powershell.exe" `
    -Argument "-NoProfile -WindowStyle Hidden -File C:\path\to\MicroservicesManager.ps1 -Action Status"
$trigger = New-ScheduledTaskTrigger -Daily -At 9:00AM
Register-ScheduledTask -TaskName "CTECX-Daily-HealthCheck" -Action $action -Trigger $trigger
```

---

## Deployment Checklist

- [ ] Install Node.js 14+
- [ ] Install CloudFlare Wrangler CLI
- [ ] Download scripts to project directory
- [ ] Make scripts executable
- [ ] Test start: `.\MicroservicesManager.ps1 -Action Start`
- [ ] Check logs: `.\MicroservicesManager.ps1 -Action Logs`
- [ ] Verify API: Visit `http://localhost:8000/api/v1/health`
- [ ] Test restart: `.\MicroservicesManager.ps1 -Action Restart`
- [ ] Schedule auto-start: `.\MicroservicesManager.ps1 -Action Schedule`
- [ ] Monitor first 24 hours
- [ ] Review logs and conclusions

---

## Support & Contact

- **Email:** ctaxnagomi@gmail.com
- **GitHub:** [@ctaxnagomi](https://github.com/ctaxnagomi)
- **Issues:** Report via GitHub Issues

---

## Version Information

- **Scripts Version:** 1.1.0
- **Release Date:** March 17, 2026
- **Platform:** Windows 7+ (VBScript), Windows XP+ (Batch), PowerShell 5.1+
- **License:** Free to Use

---

**CTECX-DigitalSign Microservices Manager**  
*Keep your digital signature platform running 24/7 with AI learning*

🚀 Ready to deploy? Start with `.\MicroservicesManager.ps1 -Action Schedule`
