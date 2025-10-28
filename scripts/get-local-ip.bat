@echo off
echo 🔍 Finding your local IP addresses for mobile testing...
echo.

echo 📱 Available IP addresses:
for /f "tokens=2 delims=:" %%i in ('ipconfig ^| findstr /C:"IPv4 Address"') do (
    set ip=%%i
    setlocal enabledelayedexpansion
    set ip=!ip: =!
    echo    !ip!
    endlocal
)

echo.
echo 📋 To test on mobile device:
echo 1. Make sure your phone is on the same WiFi network
echo 2. Use one of the IP addresses above instead of 'localhost'
echo 3. Frontend: http://[IP_ADDRESS]:3000 or :3001
echo 4. Backend: http://[IP_ADDRESS]:5000
echo.
echo Example: http://192.168.1.100:3000

pause