const Product = require('./models/Product');
const sequelize = require('./database');
const fs = require('fs');

async function resetMenu() {
    try {
        await sequelize.authenticate();
        console.log('Clearing products...');
        await Product.destroy({ where: {}, truncate: true });

        console.log('Seeding products...');
        await Product.bulkCreate([
            { name: 'Burger', price: 5.99, category: 'Food', description: 'Delicious beef burger', imageUrl: 'https://placehold.co/400x300?text=Burger' },
            { name: 'Pizza', price: 8.99, category: 'Food', description: 'Cheese pizza slice', imageUrl: 'https://placehold.co/400x300?text=Pizza' },
            { name: 'Coffee', price: 2.50, category: 'Drink', description: 'Hot brewed coffee', imageUrl: 'https://placehold.co/400x300?text=Coffee' },
            { name: 'Cola', price: 1.50, category: 'Drink', description: 'Cold soda', imageUrl: 'https://placehold.co/400x300?text=Cola' },
        ]);
        console.log('Menu reset successfully.');
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
}

resetMenu();
