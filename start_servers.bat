@echo off
echo Starting Backend Server...
start "Backend - Port 5000" /D "backend" npm run dev

echo Starting Student/Professor Frontend...
start "Student App - Port 5173" /D "frontend" npm run dev

echo Starting Staff Dashboard...
start "Staff Dashboard - Port 5174" /D "frontend-staff" npm run dev

echo Starting Professor Portal...
start "Professor Portal - Port 5175" /D "frontend-professor" npm run dev

echo.
echo ========================================================
echo Servers are starting!
echo.
echo Use these links to access the apps:
echo - Student App:           http://localhost:5173
echo - Staff Dashboard:       http://localhost:5174
echo - Professor Portal:      http://localhost:5175
echo ========================================================
echo.
pause
