const axios = require('axios');

const API_URL = 'http://localhost:5000/api/auth';

async function testEmailValidation() {
    console.log('🧪 Testing Email Whitelist System\n');
    console.log('='.repeat(50));

    // Test 1: Register with ALLOWED email
    console.log('\n✅ Test 1: Register with ALLOWED email');
    console.log('Email: rodainakhaled12@stu.topkapi.edu.tr');
    try {
        const response = await axios.post(`${API_URL}/register`, {
            name: 'Rodaina Khaled',
            email: 'rodainakhaled12@stu.topkapi.edu.tr',
            password: 'password123',
            role: 'student'
        });
        console.log('✓ SUCCESS:', response.data.message);
    } catch (error) {
        if (error.response?.status === 400 && error.response?.data?.message === 'User already exists') {
            console.log('✓ User already registered (expected if run before)');
        } else {
            console.log('✗ FAILED:', error.response?.data?.message || error.message);
        }
    }

    // Test 2: Register with NON-ALLOWED email
    console.log('\n❌ Test 2: Register with NON-ALLOWED email');
    console.log('Email: unauthorized@stu.topkapi.edu.tr');
    try {
        const response = await axios.post(`${API_URL}/register`, {
            name: 'Unauthorized User',
            email: 'unauthorized@stu.topkapi.edu.tr',
            password: 'password123',
            role: 'student'
        });
        console.log('✗ FAILED: Should have been rejected!');
    } catch (error) {
        if (error.response?.status === 403) {
            console.log('✓ SUCCESS: Correctly rejected -', error.response.data.message);
        } else {
            console.log('? Unexpected error:', error.response?.data?.message || error.message);
        }
    }

    // Test 3: Register with WRONG DOMAIN
    console.log('\n❌ Test 3: Register with wrong domain');
    console.log('Email: student@gmail.com');
    try {
        const response = await axios.post(`${API_URL}/register`, {
            name: 'Gmail User',
            email: 'student@gmail.com',
            password: 'password123',
            role: 'student'
        });
        console.log('✗ FAILED: Should have been rejected!');
    } catch (error) {
        if (error.response?.status === 403) {
            console.log('✓ SUCCESS: Correctly rejected -', error.response.data.message);
        } else {
            console.log('? Unexpected error:', error.response?.data?.message || error.message);
        }
    }

    // Test 4: Register with WRONG ROLE
    console.log('\n❌ Test 4: Register with wrong role (student email as professor)');
    console.log('Email: student1@stu.topkapi.edu.tr');
    try {
        const response = await axios.post(`${API_URL}/register`, {
            name: 'Wrong Role',
            email: 'student1@stu.topkapi.edu.tr',
            password: 'password123',
            role: 'professor'
        });
        console.log('✗ FAILED: Should have been rejected!');
    } catch (error) {
        if (error.response?.status === 403) {
            console.log('✓ SUCCESS: Correctly rejected -', error.response.data.message);
        } else {
            console.log('? Unexpected error:', error.response?.data?.message || error.message);
        }
    }

    // Test 5: Login with ALLOWED email
    console.log('\n✅ Test 5: Login with allowed email');
    console.log('Email: rodainakhaled12@stu.topkapi.edu.tr');
    try {
        const response = await axios.post(`${API_URL}/login`, {
            email: 'rodainakhaled12@stu.topkapi.edu.tr',
            password: 'password123'
        });
        console.log('✓ SUCCESS: Login successful');
        console.log('  User:', response.data.user.name);
        console.log('  Role:', response.data.user.role);
    } catch (error) {
        if (error.response?.status === 400 && error.response?.data?.message.includes('register first')) {
            console.log('⚠ User needs to register first (run Test 1 again)');
        } else {
            console.log('✗ FAILED:', error.response?.data?.message || error.message);
        }
    }

    // Test 6: Login with NON-ALLOWED email
    console.log('\n❌ Test 6: Login with non-allowed email');
    console.log('Email: unauthorized@stu.topkapi.edu.tr');
    try {
        const response = await axios.post(`${API_URL}/login`, {
            email: 'unauthorized@stu.topkapi.edu.tr',
            password: 'password123'
        });
        console.log('✗ FAILED: Should have been rejected!');
    } catch (error) {
        if (error.response?.status === 403) {
            console.log('✓ SUCCESS: Correctly rejected -', error.response.data.message);
        } else {
            console.log('? Unexpected error:', error.response?.data?.message || error.message);
        }
    }

    console.log('\n' + '='.repeat(50));
    console.log('🎉 Email Whitelist Testing Complete!\n');
}

// Run tests
testEmailValidation().catch(console.error);
