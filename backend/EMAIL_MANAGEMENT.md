# Email Management Guide

This guide explains how to manage the list of allowed university emails for the cafeteria system.

## Overview

Only pre-approved university emails can register and access the system. This ensures that only authorized students, professors, and staff can use the cafeteria system.

---

## Adding New Allowed Emails

### Step 1: Edit the Seed File

Open the file: `backend/seed_allowed_emails.js`

### Step 2: Add Email to the List

Find the `allowedEmails` array and add new entries:

```javascript
const allowedEmails = [
    // Students
    { email: 'rodainakhaled12@stu.topkapi.edu.tr', role: 'student', studentId: '12345' },
    { email: 'newstudent@stu.topkapi.edu.tr', role: 'student', studentId: '12348' }, // NEW
    
    // Professors
    { email: 'professor1@topkapi.edu.tr', role: 'professor', studentId: 'PROF001' },
    { email: 'newprof@topkapi.edu.tr', role: 'professor', studentId: 'PROF003' }, // NEW
    
    // Staff
    { email: 'staff1@topkapi.edu.tr', role: 'staff', studentId: 'STAFF001' },
];
```

### Step 3: Run the Seed Script

```bash
cd backend
npm run seed-emails
```

This will add the new emails to the database.

---

## Email Format Requirements

### Students
- **Email format**: `username@stu.topkapi.edu.tr`
- **Role**: `student`
- **Example**: `{ email: 'john.doe@stu.topkapi.edu.tr', role: 'student', studentId: '12345' }`

### Professors
- **Email format**: `username@topkapi.edu.tr`
- **Role**: `professor`
- **Example**: `{ email: 'dr.smith@topkapi.edu.tr', role: 'professor', studentId: 'PROF001' }`

### Staff
- **Email format**: `username@topkapi.edu.tr`
- **Role**: `staff`
- **Example**: `{ email: 'admin@topkapi.edu.tr', role: 'staff', studentId: 'STAFF001' }`

---

## Deactivating an Email

If you need to temporarily disable access for a user without deleting their email:

### Option 1: Using Database Tool (Recommended)

1. Open your SQLite database file: `backend/database.sqlite`
2. Find the email in the `AllowedEmails` table
3. Set `isActive` to `0` (false)

### Option 2: Using SQL Command

```bash
cd backend
sqlite3 database.sqlite
```

Then run:
```sql
UPDATE AllowedEmails SET isActive = 0 WHERE email = 'user@stu.topkapi.edu.tr';
```

To reactivate:
```sql
UPDATE AllowedEmails SET isActive = 1 WHERE email = 'user@stu.topkapi.edu.tr';
```

---

## Removing an Email Permanently

### Option 1: Remove from Seed File

1. Edit `backend/seed_allowed_emails.js`
2. Remove the email entry
3. Manually delete from database (see Option 2)

### Option 2: Using SQL Command

```bash
cd backend
sqlite3 database.sqlite
```

Then run:
```sql
DELETE FROM AllowedEmails WHERE email = 'user@stu.topkapi.edu.tr';
```

---

## Bulk Import from CSV

If you have a large list of emails in a CSV file, you can modify the seed script:

### Step 1: Create CSV File

Create `allowed_emails.csv`:
```csv
email,role,studentId
student1@stu.topkapi.edu.tr,student,12345
student2@stu.topkapi.edu.tr,student,12346
professor1@topkapi.edu.tr,professor,PROF001
```

### Step 2: Modify Seed Script

You would need to install a CSV parser and update the script. Contact your developer for assistance.

---

## Checking Current Allowed Emails

To see all currently allowed emails:

```bash
cd backend
sqlite3 database.sqlite
```

Then run:
```sql
SELECT email, role, studentId, isActive FROM AllowedEmails;
```

---

## Troubleshooting

### User gets "Email not registered" error

**Solution**: Add their email to `seed_allowed_emails.js` and run `npm run seed-emails`

### User gets "Role mismatch" error

**Solution**: Verify the email is registered with the correct role in the database

### Email was added but still can't register

**Solution**: 
1. Check if `isActive` is set to `1` (true)
2. Verify the email format matches exactly (case-insensitive)
3. Ensure the seed script ran successfully

---

## Production Deployment

When deploying to production (Render):

1. **Update seed file** with all authorized emails
2. **Run seed command** on the production server:
   - Go to Render Dashboard → Your service → Shell
   - Run: `npm run seed-emails`

Or add it to your deployment script in `render.yaml`.

---

## Security Notes

- Never commit actual student/professor emails to public repositories
- Keep the `seed_allowed_emails.js` file private
- Consider using environment variables for sensitive data
- Regularly audit the allowed emails list

---

## Future Enhancements

Consider building an admin dashboard to:
- Add/remove emails via web interface
- Import CSV files
- View all allowed emails
- Activate/deactivate users

Contact your developer to implement these features.
