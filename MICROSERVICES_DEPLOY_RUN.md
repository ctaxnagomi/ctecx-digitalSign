# How to Deploy & Run Microservices

## 🚀 3-Step Quick Deploy

### Step 1: Verify Prerequisites (2 minutes)
```powershell
# Check Node.js
node --version
# Output should be: v14.0.0 or higher

# Check npm
npm --version

# Install Wrangler if not present
npm install -g @cloudflare/wrangler

# Verify Wrangler
wrangler --version
```

### Step 2: Choose Your Method & Start (1 minute)

**Method A: PowerShell (Recommended)**
```powershell
cd C:\Users\KR\ctecx-digitalSign
.\MicroservicesManager.ps1 -Action Start
# Services start immediately
# Press Ctrl+C to stop
```

**Method B: VBScript**
```
1. Right-click MicroservicesManager.vbs
2. Select "Run as administrator"
3. A console window appears
4. Services running in background
```

**Method C: Batch File**
```
1. Double-click StartMicroservices.bat
2. Choose "Run as administrator" if prompted
3. Console window shows startup status
```

### Step 3: Verify Running (1 minute)

Open browser and visit:
```
http://localhost:8000/api/v1/health
```

Expected response:
```json
{
  "status": "ok",
  "version": "1.1.0",
  "timestamp": "2026-03-17T15:30:00Z",
  "uptime": 125
}
```

✅ **Services are running!**

---

## 📋 Complete Setup Walkthrough

### For First-Time Users

**Option 1: Using PowerShell (Step-by-step)**

```powershell
# Step 1: Open PowerShell as Administrator
# Windows Key → Type "PowerShell" → Right-click → "Run as administrator"

# Step 2: Navigate to project
cd "C:\Users\KR\ctecx-digitalSign"

# Step 3: Allow script execution (one-time setup)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force

# Step 4: Start services
.\MicroservicesManager.ps1 -Action Start

# Output should show:
# ✓ API Server: Running (Port 8000)
# ✓ Health Monitor: Active
# ✓ AI Activity Tracker: Active
# ✓ Monthly Conclusions: Enabled

# Keep window open - services run in background
# Press Ctrl+C to stop services
```

**Option 2: Using VBScript (Easiest)**

```
Step 1: Open File Explorer
Step 2: Navigate to C:\Users\KR\ctecx-digitalSign
Step 3: Right-click MicroservicesManager.vbs
Step 4: Select "Run as administrator"
Step 5: Click "Yes" on UAC prompt
Step 6: Console opens showing startup messages
Step 7: Services running in background!

To stop: Close console window or press Ctrl+C
```

**Option 3: Using Batch File (Simplest)**

```
Step 1: Open File Explorer
Step 2: Navigate to C:\Users\KR\ctecx-digitalSign
Step 3: Double-click StartMicroservices.bat
Step 4: Click "Run" if security prompt appears
Step 5: Console shows startup status
Step 6: Services running!

Note: Batch automatically launches VBScript
```

---

## 🔄 Auto-Start on Windows Boot

### Setup Auto-Start (Choose One Method)

**Method A: PowerShell (Easiest)**
```powershell
cd "C:\Users\KR\ctecx-digitalSign"

# Run as Administrator
.\MicroservicesManager.ps1 -Action Schedule

# You'll see:
# ✓ Scheduled task created: CTECX-DigitalSign-Microservices
# ✓ Services will auto-start on system boot

# Now services auto-start whenever you reboot!
```

**Method B: Task Scheduler (Manual)**
```
1. Press Windows Key + R
2. Type: taskschd.msc
3. Click "Create Basic Task"
4. Name: "CTECX-DigitalSign-Microservices"
5. Description: "Auto-start microservices on boot"
6. Trigger: Select "At startup"
7. Action: "Start a program"
   - Program: C:\Windows\System32\cscript.exe
   - Arguments: "C:\Users\KR\ctecx-digitalSign\MicroservicesManager.vbs"
8. Check: "Run with highest privileges"
9. Click "Create"
10. Reboot - services auto-start!
```

**Method C: Startup Folder (Simple)**
```
1. Create shortcut to StartMicroservices.bat
2. Right-click shortcut → Properties
3. Advanced → Check "Run as administrator"
4. Cut shortcut
5. Paste into:
   C:\Users\[YourUsername]\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup
6. Reboot - services auto-start!
```

**Verify Auto-Start Works**
```powershell
# Restart your computer
# Wait 30 seconds after login

# Check if running
tasklist | findstr node.exe
# Should show node.exe is running

# Or visit in browser
# http://localhost:8000/api/v1/health
# Should return success
```

---

## 📊 All PowerShell Commands

### Basic Commands

```powershell
cd "C:\Users\KR\ctecx-digitalSign"

# Start services
.\MicroservicesManager.ps1 -Action Start

# Stop services
.\MicroservicesManager.ps1 -Action Stop

# Restart services
.\MicroservicesManager.ps1 -Action Restart

# Check status
.\MicroservicesManager.ps1 -Action Status

# View latest logs
.\MicroservicesManager.ps1 -Action Logs

# Schedule auto-start
.\MicroservicesManager.ps1 -Action Schedule
```

### Advanced Commands

```powershell
# Start in production environment
.\MicroservicesManager.ps1 -Action Start -Environment Production

# Start in development (default)
.\MicroservicesManager.ps1 -Action Start -Environment Development

# Get help
Get-Help ".\MicroservicesManager.ps1"

# Run with specific parameters
.\MicroservicesManager.ps1 -Action Restart -Environment Production
```

---

## 🔍 Monitoring & Troubleshooting

### Check Services Running

**Method 1: PowerShell**
```powershell
# Check if Node.js process running
tasklist | findstr node.exe

# Check if port 8000 in use
netstat -ano | findstr :8000

# Get process details
Get-Process node.exe
```

**Method 2: Browser**
```
Visit: http://localhost:8000/api/v1/health

Expected response:
{
  "status": "ok",
  "version": "1.1.0",
  "timestamp": "2026-03-17T15:30:00Z",
  "uptime": 125
}
```

### View Logs

**Method 1: PowerShell**
```powershell
.\MicroservicesManager.ps1 -Action Logs
# Opens latest log in Notepad

# Or manually
notepad "logs\service_20260317.log"
```

**Method 2: File Explorer**
```
1. Open C:\Users\KR\ctecx-digitalSign\logs
2. Open latest service_YYYYMMDD.log file
3. View all activities
```

**Example Log Output:**
```
[2026-03-17 09:15:23] [Information] CTECX-DigitalSign Microservices Manager Starting
[2026-03-17 09:15:24] [Success] Node.js found: v14.21.0
[2026-03-17 09:15:24] [Success] ✓ API Server started successfully (Port 8000)
[2026-03-17 09:15:30] [Success] Activities logged: 42 signatures, 17 PDFs, 89 API calls
[2026-03-17 09:15:54] [Success] ✓ Health check passed
```

### Common Issues & Solutions

**Issue: "Node.js not found"**
```powershell
# Solution: Install Node.js
# Download from: https://nodejs.org/
# Or via PowerShell:
choco install nodejs
# (Requires Chocolatey: https://chocolatey.org/)

# Verify:
node --version
```

**Issue: "API Server won't start"**
```powershell
# Check if port 8000 already in use
netstat -ano | findstr :8000

# If in use, find and kill process
# Get PID from netstat output, then:
taskkill /PID <PID_NUMBER> /F

# Try starting again
.\MicroservicesManager.ps1 -Action Restart
```

**Issue: "Permission denied"**
```powershell
# Solution: Allow script execution (one-time)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force

# Or run PowerShell as Administrator:
# Windows Key → PowerShell → Right-click → Run as Administrator
```

**Issue: "Services stopped unexpectedly"**
```powershell
# Check logs for errors
.\MicroservicesManager.ps1 -Action Logs

# Restart services
.\MicroservicesManager.ps1 -Action Restart

# Check process status
tasklist | findstr node.exe
```

---

## 📈 Performance & Monitoring

### Monitor in Real-Time

**PowerShell Window**
```powershell
cd "C:\Users\KR\ctecx-digitalSign"
.\MicroservicesManager.ps1 -Action Start

# You'll see:
# [09:15:23] ℹ CTECX-DigitalSign Microservices Manager (PowerShell)
# [09:15:24] ✓ Node.js found: v14.21.0
# [09:15:24] ✓ Wrangler CLI found: 3.0.0
# [09:15:24] ✓ API Server started successfully (Port 8000)
# [09:15:54] ✓ Health check passed
# [09:16:24] ✓ Activities logged: 42 signatures, 17 PDFs, 89 API calls
# [09:16:54] ✓ Health check passed
# ... continues running
```

### Activity Log

View real-time activities:
```powershell
# Open file explorer
explorer "C:\Users\KR\ctecx-digitalSign\ai-data"

# View latest month folder
# AI_Reports_2026-03\
#   ├── activity_log.csv
#   └── monthly_conclusion.txt

# Open activity_log.csv in Excel
# Shows: Timestamps, Activity Type, Count, Status, Duration
```

### Monthly Report

View AI learning conclusions:
```powershell
# Check for monthly report
Get-ChildItem "C:\Users\KR\ctecx-digitalSign\ai-data" -Recurse -Filter "monthly_conclusion*"

# Open latest report
notepad "C:\Users\KR\ctecx-digitalSign\ai-data\AI_Reports_2026-03\monthly_conclusion_2026-03.txt"
```

---

## 🎯 Testing Scenarios

### Test 1: Service Start/Stop
```powershell
# Start
.\MicroservicesManager.ps1 -Action Start
# Wait 5 seconds

# In new PowerShell window, check status
.\MicroservicesManager.ps1 -Action Status

# Stop
.\MicroservicesManager.ps1 -Action Stop

# Verify stopped
tasklist | findstr node.exe
# Should show: no results
```

### Test 2: Health Check Recovery
```powershell
# Start services
.\MicroservicesManager.ps1 -Action Start

# In another PowerShell window, kill the API server
taskkill /IM node.exe /F

# Check logs - should show restart attempt
.\MicroservicesManager.ps1 -Action Logs

# Services auto-restart within 2 minutes
```

### Test 3: API Endpoints
```powershell
# Health check
Invoke-WebRequest http://localhost:8000/api/v1/health

# Version info
Invoke-WebRequest http://localhost:8000/api/v1/version

# Both should return status 200
```

---

## 📚 Documentation Reference

| File | Purpose | Read When |
|------|---------|-----------|
| MICROSERVICES_SETUP_COMPLETE.md | Overview | First time |
| MICROSERVICES_GUIDE.md | Complete guide | Need details |
| MICROSERVICES_QUICKREF.md | Quick reference | While running |
| MICROSERVICES_DEPLOY_RUN.md | This file | Setting up |
| TECHNICAL_WHITEPAPER.md | Architecture | Understanding system |
| DEPLOYMENT_GUIDE.md | CloudFlare setup | Deploying to cloud |

---

## ✅ Deployment Checklist

- [ ] Prerequisites installed (Node.js, Wrangler)
- [ ] Scripts downloaded to project directory
- [ ] Test: `.\MicroservicesManager.ps1 -Action Start`
- [ ] Verify API: http://localhost:8000/api/v1/health
- [ ] Check logs created: `logs/service_YYYYMMDD.log`
- [ ] Setup auto-start: `.\MicroservicesManager.ps1 -Action Schedule`
- [ ] Reboot and verify auto-start
- [ ] Monitor for 24 hours
- [ ] Review activity logs: `ai-data/AI_Reports_*/`
- [ ] All working? Celebrate! 🎉

---

## 🆘 Quick Support

If something isn't working:

1. **Check logs first**
   ```powershell
   .\MicroservicesManager.ps1 -Action Logs
   ```

2. **Check prerequisites**
   ```powershell
   node --version
   npm list wrangler
   wrangler --version
   ```

3. **Try restart**
   ```powershell
   .\MicroservicesManager.ps1 -Action Restart
   ```

4. **Check port**
   ```powershell
   netstat -ano | findstr :8000
   ```

5. **Get help**
   - 📖 Read: MICROSERVICES_GUIDE.md
   - 📧 Email: ctaxnagomi@gmail.com
   - 🐙 GitHub: [@ctaxnagomi](https://github.com/ctaxnagomi)

---

## 🎉 Success!

Once your services are running:

✅ API available at `http://localhost:8000`  
✅ Health checks every 30 seconds  
✅ Activities logged in real-time  
✅ Monthly AI reports auto-generated  
✅ All managed automatically  

**Your microservices are now production-ready!**

---

**CTECX-DigitalSign Microservices Management System**  
*v1.1.0 - Keep Your Platform Running 24/7*

Next Step: Deploy to CloudFlare → See DEPLOYMENT_GUIDE.md
