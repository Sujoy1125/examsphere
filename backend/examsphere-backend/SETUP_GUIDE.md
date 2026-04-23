# ExamSphere Backend Setup Guide

## Step 1: Create Database in pgAdmin

1. Open **pgAdmin 4**
2. Connect to your PostgreSQL server
3. Right-click on **Databases** → **Create** → **Database**
4. Name it: `examsphere`
5. Click **Save**

## Step 2: Create Tables

1. In pgAdmin, expand **examsphere** database
2. Right-click and select **Query Tool**
3. Open the file: `init-database.sql`
4. Click the **Execute/Refresh** button (▶️) or press `F5`
5. All 6 tables will be created + sample data inserted

## Step 3: Configure Database Credentials

Edit `run-backend.bat` and update these lines with your actual credentials:

```bat
set DATABASE_USERNAME=your_actual_username
set DATABASE_PASSWORD=your_actual_password
```

## Step 4: Run the Backend

Double-click `run-backend.bat` or run in terminal:

```cmd
cd backend/examsphere-backend
run-backend.bat
```

Or manually:

```cmd
cd backend/examsphere-backend
set DATABASE_URL=jdbc:postgresql://localhost:5432/examsphere
set DATABASE_USERNAME=postgres
set DATABASE_PASSWORD=your_password
call mvnw.cmd spring-boot:run
```

## Tables Created

| Table | Description |
|-------|-------------|
| `users` | Registered users & admins |
| `subjects` | Exam categories |
| `tests` | Mock tests |
| `questions` | MCQ questions |
| `test_attempts` | User test attempts |
| `attempt_answers` | Individual answers |

## Default Admin Credentials

- **Email:** `admin@examsphere.com`
- **Password:** `admin123`

> Note: The password in the DB is BCrypt hashed. Use the Auth API to login.

## API Base URL

Once running, the backend will be available at:

```
http://localhost:8080
```

## Troubleshooting

- **Port 8080 in use?** Change `server.port` in `application.properties`
- **Database connection failed?** Check credentials and ensure PostgreSQL service is running
- **Maven not found?** The project includes `mvnw.cmd` (Maven Wrapper)

