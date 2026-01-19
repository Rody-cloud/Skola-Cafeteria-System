const User = require('./models/User');
const sequelize = require('./database');

async function checkUsers() {
    try {
        await sequelize.authenticate();
        const users = await User.findAll();
        console.log('Total Users:', users.length);
        console.log(JSON.stringify(users, null, 2));
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
}

checkUsers();
