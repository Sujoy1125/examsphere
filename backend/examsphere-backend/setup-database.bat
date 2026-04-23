@echo off
chcp 65001 >nul
echo ==========================================
echo    ExamSphere Database Setup Wizard
echo ==========================================
echo.

REM Try to auto-detect PostgreSQL
set PGHOST=localhost
set PGPORT=5432
set PGUSER=postgres

cls
echo ==========================================
echo    ExamSphere Database Setup Wizard
echo ==========================================
echo.

REM Check if examsphere database exists
echo Step 1: Finding PostgreSQL...
echo.

REM Check common PostgreSQL paths
if exist "C:\Program Files\PostgreSQL" (
    echo Found PostgreSQL installation at:
    dir /b "C:\Program Files\PostgreSQL"
    echo.
)

if exist "C:\Program Files (x86)\PostgreSQL" (
    echo Found PostgreSQL installation at:
    dir /b "C:\Program Files (x86)\PostgreSQL"
    echo.
)

echo Step 2: Enter your PostgreSQL credentials
echo (These are the credentials you use to connect in pgAdmin)
echo.

set /p PGHOST="Database Host [default: localhost]: "
if "%PGHOST%"=="" set PGHOST=localhost

set /p PGPORT="Database Port [default: 5432]: "
if "%PGPORT%"=="" set PGPORT=5432

set /p PGUSER="Database Username [default: postgres]: "
if "%PGUSER%"=="" set PGUSER=postgres

set /p PGPASS="Database Password: "
if "%PGPASS%"=="" (
    echo Password cannot be empty!
    pause
    exit /b 1
)

echo.
echo Step 3: Creating/Verifying database...
echo.

REM Create examsphere database if it doesn't exist
REM Try using psql if available
set PSQL_FOUND=0
for %%p in (
    "C:\Program Files\PostgreSQL\15\bin\psql.exe"
    "C:\Program Files\PostgreSQL\14\bin\psql.exe"
    "C:\Program Files\PostgreSQL\16\bin\psql.exe"
    "C:\Program Files\PostgreSQL\13\bin\psql.exe"
    "C:\Program Files (x86)\PostgreSQL\15\bin\psql.exe"
    "C:\Program Files (x86)\PostgreSQL\14\bin\psql.exe"
) do (
    if exist %%p (
        set PSQL_PATH=%%p
        set PSQL_FOUND=1
        goto :found_psql
    )
)

:found_psql
if %PSQL_FOUND%==1 (
    echo Found psql at: %PSQL_PATH%
    echo Creating database 'examsphere' if not exists...
    "%PSQL_PATH%" -h %PGHOST% -p %PGPORT% -U %PGUSER% -d postgres -c "CREATE DATABASE examsphere;" 2>nul
    if errorlevel 1 (
        echo Database may already exist or connection failed.
        echo Please check your credentials and try again.
        pause
        exit /b 1
    )
    echo Database created or already exists.
) else (
    echo.
    echo WARNING: Could not find psql.exe automatically.
    echo Please make sure the 'examsphere' database exists in pgAdmin.
    echo.
)

echo.
echo Step 4: Saving configuration...
echo.

REM Update run-backend.bat with new credentials
echo @echo off > run-backend.bat
echo chcp 65001 ^>nul >> run-backend.bat
echo echo ========================================== >> run-backend.bat
echo echo    ExamSphere Backend Startup Script >> run-backend.bat
echo echo ========================================== >> run-backend.bat
echo echo. >> run-backend.bat
echo set DATABASE_URL=jdbc:postgresql://%PGHOST%:%PGPORT%/examsphere >> run-backend.bat
echo set DATABASE_USERNAME=%PGUSER% >> run-backend.bat
echo set DATABASE_PASSWORD=%PGPASS% >> run-backend.bat
echo echo DATABASE_URL=%%DATABASE_URL%% >> run-backend.bat
echo echo DATABASE_USERNAME=%%DATABASE_USERNAME%% >> run-backend.bat
echo echo. >> run-backend.bat
echo echo Starting ExamSphere Backend... >> run-backend.bat
echo echo. >> run-backend.bat
echo call mvnw.cmd spring-boot:run >> run-backend.bat
echo pause >> run-backend.bat

echo Configuration saved to run-backend.bat
echo.
echo ==========================================
echo    Setup Complete!
echo ==========================================
echo.
echo Your credentials:
echo   URL: jdbc:postgresql://%PGHOST%:%PGPORT%/examsphere
echo   User: %PGUSER%
echo.
echo Next steps:
echo   1. Run complete-setup.sql in pgAdmin to create tables
echo   2. Double-click run-backend.bat to start the backend
echo.
pause

