const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

async function testRegister() {
    const email = `test_${Date.now()}@example.com`;
    try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Diagnostic User',
                email: email,
                password: 'password123'
            })
        });
        const data = await response.json();
        console.log('Response:', response.status, data);

        // Now check if it's in the DB
        const { execSync } = require('child_process');
        const dbCheck = execSync('node check_db.js').toString();
        if (dbCheck.includes(email)) {
            console.log('SUCCESS: User found in database.');
        } else {
            console.log('FAILURE: User NOT found in database.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

testRegister();
