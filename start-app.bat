@echo off
echo ====================================
echo Job Platform - Starting Application
echo ====================================
echo.

echo Starting Backend Server...
start "Job Platform Backend" cmd /k "mvnw spring-boot:run"

echo Waiting for backend to initialize...
timeout /t 10 /nobreak >nul

echo.
echo Starting Frontend Development Server...
cd frontend
start "Job Platform Frontend" cmd /k "npm run dev"

echo.
echo ====================================
echo Application Started Successfully!
echo ====================================
echo.
echo Backend:  http://localhost:7070
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit this window...
pause >nul
