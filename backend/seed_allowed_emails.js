const sequelize = require('./database');
const AllowedEmail = require('./models/AllowedEmail');

// Sample allowed emails - Add your university emails here
const allowedEmails = [
    // Students
    { email: 'rodainakhaled12@stu.topkapi.edu.tr', role: 'student', studentId: '12345' },
    { email: 'student1@stu.topkapi.edu.tr', role: 'student', studentId: '12346' },
    { email: 'student2@stu.topkapi.edu.tr', role: 'student', studentId: '12347' },

    // Professors
    { email: 'professor1@topkapi.edu.tr', role: 'professor', studentId: 'PROF001' },
    { email: 'professor2@topkapi.edu.tr', role: 'professor', studentId: 'PROF002' },

    // Staff
    { email: 'staff1@topkapi.edu.tr', role: 'staff', studentId: 'STAFF001' },
    { email: 'staff2@topkapi.edu.tr', role: 'staff', studentId: 'STAFF002' },
];

async function seedAllowedEmails() {
    try {
        // Sync database
        await sequelize.sync();

        console.log('Seeding allowed emails...');

        for (const emailData of allowedEmails) {
            // Check if email already exists
            const existing = await AllowedEmail.findOne({
                where: { email: emailData.email }
            });

            if (!existing) {
                await AllowedEmail.create(emailData);
                console.log(`✓ Added: ${emailData.email} (${emailData.role})`);
            } else {
                console.log(`- Already exists: ${emailData.email}`);
            }
        }

        console.log('\n✅ Allowed emails seeded successfully!');
        console.log(`Total allowed emails: ${allowedEmails.length}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding allowed emails:', error);
        process.exit(1);
    }
}

seedAllowedEmails();
