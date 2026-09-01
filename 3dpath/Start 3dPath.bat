@echo off
setlocal
cd /d "%~dp0"

if exist "3dPath.html" goto serve
if exist "dist\index.html" goto serve

echo Building 3dPath once (needs Node). After this, just double-click this file.
call npm run build
if errorlevel 1 (
  echo Build failed. Install Node, then run npm install and npm run build in this folder.
  pause
  exit /b 1
)

:serve
echo Opening 3dPath. Keep this window open while you learn.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\serve-local.ps1"
if errorlevel 1 pause
