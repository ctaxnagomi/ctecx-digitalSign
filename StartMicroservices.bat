@echo off
REM CTECX-DigitalSign Microservices Launcher
REM ======================================
REM This batch file starts the VBS microservices manager
REM It ensures the script has proper permissions and runs in the background
REM Platform: Windows
REM Author: Wan Mohd Azizi (ctaxnagomi@gmail.com)

setlocal enabledelayedexpansion

REM Get the directory where this batch file is located
set "SCRIPT_DIR=%~dp0"
set "VBS_SCRIPT=%SCRIPT_DIR%MicroservicesManager.vbs"
set "LOGS_DIR=%SCRIPT_DIR%logs"
set "AI_DATA_DIR=%SCRIPT_DIR%ai-data"

REM Display banner
cls
echo.
echo ╔═══════════════════════════════════════════════════════════════════════════════╗
echo ║                                                                               ║
echo ║          CTECX-DigitalSign Microservices Launcher v1.1.0                     ║
echo ║                                                                               ║
echo ║  Starting VBScript Microservices Manager...                                   ║
echo ║                                                                               ║
echo ╚═══════════════════════════════════════════════════════════════════════════════╝
echo.

REM Check if VBS script exists
if not exist "%VBS_SCRIPT%" (
    echo ERROR: VBS script not found: %VBS_SCRIPT%
    echo Please ensure MicroservicesManager.vbs is in the same directory as this batch file.
    pause
    exit /b 1
)

REM Create necessary directories
if not exist "%LOGS_DIR%" (
    mkdir "%LOGS_DIR%"
    echo Created logs directory: %LOGS_DIR%
)

if not exist "%AI_DATA_DIR%" (
    mkdir "%AI_DATA_DIR%"
    echo Created AI data directory: %AI_DATA_DIR%
)

REM Check for administrator rights
echo Checking for administrator rights...
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo WARNING: Administrator rights not detected.
    echo Some features may not work correctly without admin privileges.
    echo.
    echo To run with admin privileges:
    echo 1. Right-click this batch file
    echo 2. Select "Run as administrator"
    echo.
)

REM Display service information
echo.
echo SERVICE INFORMATION:
echo =====================
echo Project Directory: %SCRIPT_DIR%
echo VBS Manager:       %VBS_SCRIPT%
echo Logs Directory:    %LOGS_DIR%
echo AI Data Directory: %AI_DATA_DIR%
echo.

REM Start the VBS script
echo Starting VBScript Microservices Manager...
echo.

REM Run VBS script in background
cscript.exe "%VBS_SCRIPT%"

REM If script exits, show exit message
echo.
echo Microservices Manager has stopped.
pause
exit /b 0
