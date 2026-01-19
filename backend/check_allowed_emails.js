const sequelize = require('./database');
const AllowedEmail = require('./models/AllowedEmail');

async function checkAllowedEmails() {
    try {
        await sequelize.sync();

        console.log('📧 Checking Allowed Emails in Database\n');
        console.log('='.repeat(60));

        const emails = await AllowedEmail.findAll({
            order: [['role', 'ASC'], ['email', 'ASC']]
        });

        if (emails.length === 0) {
            console.log('\n⚠️  No allowed emails found in database!');
            console.log('Run: npm run seed-emails');
        } else {
            console.log(`\n✅ Found ${emails.length} allowed emails:\n`);

            const byRole = {
                student: [],
                professor: [],
                staff: []
            };

            emails.forEach(email => {
                byRole[email.role].push(email);
            });

            // Display by role
            Object.keys(byRole).forEach(role => {
                if (byRole[role].length > 0) {
                    console.log(`\n${role.toUpperCase()}S (${byRole[role].length}):`);
                    byRole[role].forEach(e => {
                        const status = e.isActive ? '✓ Active' : '✗ Inactive';
                        console.log(`  ${status} - ${e.email}${e.studentId ? ` (ID: ${e.studentId})` : ''}`);
                    });
                }
            });
        }

        console.log('\n' + '='.repeat(60));
        console.log('\n📝 How to add more emails:');
        console.log('1. Edit: backend/seed_allowed_emails.js');
        console.log('2. Run: npm run seed-emails');
        console.log('\n📖 Full guide: backend/EMAIL_MANAGEMENT.md\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

checkAllowedEmails();
