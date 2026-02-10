# Supabase PostgreSQL Setup for Job Portal

Your application backend has been successfully configured to use **Supabase (PostgreSQL)** instead of MySQL.

## 🚀 Steps to Complete Setup

### 1. Update Database Password
As a security measure, the password in your connection string was hidden (`[YOUR-PASSWORD]`). Before running the backend, you must update the configuration with your actual Supabase database password.

**File:** `src/main/resources/application.properties`

Replace `[YOUR-PASSWORD-HERE]` with your real password:
```properties
spring.datasource.password=YOUR_REAL_PASSWORD_HERE
```

### 2. Run the Backend
After updating the password, run the backend using Maven:

```bash
mvn spring-boot:run
```

The application will connect to your Supabase database automatically.

## 🛠 changed Files
- **pom.xml**: Switched from MySQL driver to PostgreSQL driver.
- **application.properties**: Updated database URL, username, and driver.

## ✅ Verification
Once running, the backend will be available at: http://localhost:7070
The frontend is already running at: http://localhost:3000

If successful, check your Supabase dashboard to see new tables created by the backend (Hibernate auto-update).
