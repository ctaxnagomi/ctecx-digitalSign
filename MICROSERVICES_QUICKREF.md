# Microservices Quick Reference

## Quick Start (Choose One)

### Option 1: VBScript (Simplest)
```batch
REM Double-click this file (right-click → Run as administrator)
MicroservicesManager.vbs
```

### Option 2: Batch (Simple)
```batch
REM Double-click this file
StartMicroservices.bat
```

### Option 3: PowerShell (Advanced)
```powershell
# Start services
.\MicroservicesManager.ps1 -Action Start

# Or schedule for auto-start
.\MicroservicesManager.ps1 -Action Schedule
```

---

## PowerShell Commands

| Command | Result |
|---------|--------|
| `.\MicroservicesManager.ps1 -Action Start` | Start all services |
| `.\MicroservicesManager.ps1 -Action Stop` | Stop all services |
| `.\MicroservicesManager.ps1 -Action Restart` | Restart services |
| `.\MicroservicesManager.ps1 -Action Status` | View service status |
| `.\MicroservicesManager.ps1 -Action Logs` | Open latest log |
| `.\MicroservicesManager.ps1 -Action Schedule` | Auto-start on boot |

---

## Service Details

| Component | Port | Status | Interval |
|-----------|------|--------|----------|
| API Server | 8000 | Always running | - |
| Health Check | - | Every 30 seconds | 30s |
| AI Tracking | - | Continuous | 30s |
| Monthly Reports | - | Auto-generated | Monthly |

---

## API Endpoints

```
GET  http://localhost:8000/api/v1/health        # Health check
POST http://localhost:8000/api/v1/signature/analyze  # Analyze PDF
POST http://localhost:8000/api/v1/signature/sign     # Sign document
GET  http://localhost:8000/api/v1/version      # Get version
```

---

## Logs & Data

| Type | Location |
|------|----------|
| Service Logs | `logs\service_YYYYMMDD.log` |
| Activity Logs | `ai-data\AI_Reports_YYYY-MM\activity_log.csv` |
| Conclusions | `ai-data\AI_Reports_YYYY-MM\monthly_conclusion.txt` |

---

## Troubleshooting

**Services won't start?**
```powershell
# Check prerequisites
node --version      # Need v14+
npm list wrangler   # Need @cloudflare/wrangler
python --version    # Optional: v3.8+

# Install if missing
npm install -g @cloudflare/wrangler
```

**Port 8000 already in use?**
```powershell
# Find and kill process
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

**Can't run scripts?**
```powershell
# Allow script execution
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
```

---

## Auto-Start on Boot

### PowerShell (Recommended)
```powershell
.\MicroservicesManager.ps1 -Action Schedule
```

### Task Scheduler
1. Open Task Scheduler
2. Create Basic Task
3. Name: "CTECX-DigitalSign"
4. Trigger: "At startup"
5. Action: Run `cscript.exe "MicroservicesManager.vbs"`

---

## What Gets Monitored?

✅ **Services**
- API server status
- Port 8000 availability
- Process health

✅ **Activities**
- Signatures processed
- PDFs analyzed
- API requests

✅ **Monthly Reports**
- Accuracy metrics
- Performance improvements
- User behavior patterns
- Business insights

---

## File Structure

```
project/
├── MicroservicesManager.vbs    ← VBScript version
├── MicroservicesManager.ps1    ← PowerShell version
├── StartMicroservices.bat      ← Batch launcher
├── MICROSERVICES_GUIDE.md      ← Full guide
├── logs/                        ← Daily logs
└── ai-data/
    └── AI_Reports_YYYY-MM/
        ├── activity_log.csv
        └── monthly_conclusion.txt
```

---

## Contact

📧 Email: ctaxnagomi@gmail.com  
🐙 GitHub: [@ctaxnagomi](https://github.com/ctaxnagomi)  
☕ Support: [buymeacoffee.com/ctaxnagomi](https://buymeacoffee.com/ctaxnagomi)

---

**CTECX-DigitalSign Microservices v1.1.0**  
*Keep your platform running 24/7*
