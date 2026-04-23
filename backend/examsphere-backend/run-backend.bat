@echo off
chcp 65001 >nul
echo ==========================================
echo    ExamSphere Backend Startup Script
echo ==========================================
echo.

REM Set your PostgreSQL database credentials here
set DATABASE_URL=jdbc:postgresql://localhost:5432/examsphere
set DATABASE_USERNAME=postgres
set DATABASE_PASSWORD=9326

echo DATABASE_URL=%DATABASE_URL%
echo DATABASE_USERNAME=%DATABASE_USERNAME%
echo.

echo Starting ExamSphere Backend...
echo.

REM Run Spring Boot application using Maven Wrapper
call mvnw.cmd spring-boot:run

pause

