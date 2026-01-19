const BASE_URL = 'http://localhost:5000/api';

async function runTests() {
    console.log('Starting API Verification...');

    try {
        // 1. Register User
        const uniqueEmail = `testuser_${Date.now()}@test.com`;
        console.log(`\n1. Testing Registration (${uniqueEmail})...`);
        const regRes = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test Testson',
                email: uniqueEmail,
                password: 'password123',
                role: 'student'
            })
        });
        const regData = await regRes.json();
        console.log(`Status: ${regRes.status}`, regData);
        if (regRes.status !== 201) throw new Error('Registration failed');

        // 2. Login
        console.log('\n2. Testing Login...');
        const loginRes = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: uniqueEmail,
                password: 'password123'
            })
        });
        const loginData = await loginRes.json();
        console.log(`Status: ${loginRes.status}`, loginData.token ? 'Token received' : 'No token');
        if (loginRes.status !== 200) throw new Error('Login failed');
        const token = loginData.token;
        const userId = loginData.user.id;

        // 3. Get Products
        console.log('\n3. Testing Get Products...');
        const prodRes = await fetch(`${BASE_URL}/products`);
        const prodData = await prodRes.json();
        console.log(`Status: ${prodRes.status}, Count: ${prodData.length}`);
        if (prodRes.status !== 200 || prodData.length === 0) throw new Error('Get products failed');
        const firstProduct = prodData[0];

        // 4. Create Order
        console.log('\n4. Testing Create Order...');
        const orderRes = await fetch(`${BASE_URL}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                customerId: userId,
                items: [{ productId: firstProduct.id, quantity: 2 }],
                paymentMethod: 'Cash'
            })
        });
        const orderData = await orderRes.json();
        console.log(`Status: ${orderRes.status}`, orderData);
        if (orderRes.status !== 201) throw new Error('Order creation failed');

        // 5. Get My Orders
        console.log('\n5. Testing Get My Orders...');
        const myOrdersRes = await fetch(`${BASE_URL}/orders/my/${userId}`);
        const myOrdersData = await myOrdersRes.json();
        console.log(`Status: ${myOrdersRes.status}, Count: ${myOrdersData.length}`);
        if (myOrdersRes.status !== 200 || myOrdersData.length === 0) throw new Error('Get my orders failed');

        console.log('\n✅ All API Tests Passed!');

    } catch (error) {
        console.error('\n❌ API Verification Failed:', error.message);
        process.exit(1);
    }
}

runTests();
