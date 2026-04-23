# How to Find Your PostgreSQL Credentials

## Option 1: Check pgAdmin 4 (Recommended)

1. Open **pgAdmin 4** (comes with PostgreSQL installation)
2. In the left sidebar, find **Servers** → your server name (e.g., "PostgreSQL 15")
3. Right-click on the server → **Properties**
4. In the **Connection** tab, you'll see:
   - **Host name/address**: usually `localhost`
   - **Port**: usually `5432`
   - **Maintenance database**: usually `postgres`
   - **Username**: usually `postgres`

5. The **password** is whatever you set during PostgreSQL installation. If you forgot it, see Option 3 below.

## Option 2: Common Default Credentials

If you just installed PostgreSQL and didn't change anything, try these defaults:

| Setting | Value |
|---------|-------|
| Host | `localhost` |
| Port | `5432` |
| Database | `examsphere` (or `postgres`) |
| Username | `postgres` |
| Password | `postgres` (or what you set during install) |

## Option 3: If You Forgot the Password

You need to reset the PostgreSQL `postgres` user password:

### Method A: Using pgAdmin
1. Open pgAdmin
2. Right-click on **Login/Group Roles** → **postgres**
3. Go to **Definition** tab
4. Enter new password → Save

### Method B: Using Command Line
1. Open Command Prompt as **Administrator**
2. Navigate to your PostgreSQL bin folder (e.g., `C:\Program Files\PostgreSQL\15\bin`)
3. Run:
   ```
   psql -U postgres -d postgres
   ```
4. At password prompt, try: `postgres`
5. Once inside, run:
   ```sql
   ALTER USER postgres WITH PASSWORD 'your_new_password';
   ```
6. Exit with `\q`

## Option 4: Check Your PostgreSQL Installation Path

If none of the above works, your PostgreSQL might be installed in a custom location. Check:

- `C:\Program Files\PostgreSQL\` (common location)
- `C:\Program Files (x86)\PostgreSQL\`

Inside, look for the version folder (e.g., `15`, `14`, `16`) and then `data\pg_hba.conf` for connection settings.

## Once You Have the Credentials

Update the `run-backend.bat` file with your actual credentials:

```bat
set DATABASE_URL=jdbc:postgresql://localhost:5432/examsphere
set DATABASE_USERNAME=postgres
set DATABASE_PASSWORD=your_actual_password
```

Then double-click `run-backend.bat` to start the backend!
