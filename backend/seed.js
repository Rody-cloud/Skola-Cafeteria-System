const sequelize = require('./database');
const User = require('./models/User');
const Product = require('./models/Product');
const { Order, OrderItem } = require('./models/Order');
const bcrypt = require('bcryptjs');

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true }); // Reset database
        console.log('Database synced!');

        // Create Users
        const hashedPassword = await bcrypt.hash('password123', 10);

        const users = await User.bulkCreate([
            { name: 'John Student', email: 'student@test.com', password: hashedPassword, role: 'student' },
            { name: 'Jane Professor', email: 'professor@test.com', password: hashedPassword, role: 'professor' },
            { name: 'Staff Member', email: 'staff@test.com', password: hashedPassword, role: 'staff' },
        ]);
        console.log('Users created');

        // Create Products
        const products = await Product.bulkCreate([
            { name: 'Cheeseburger', price: 5.99, category: 'Fast Food', description: 'Juicy beef patty with cheese', imageUrl: 'https://placehold.co/400x300?text=Cheeseburger' },
            { name: 'Caesar Salad', price: 4.50, category: 'Salads', description: 'Fresh lettuce with caesar dressing', imageUrl: 'https://placehold.co/400x300?text=Salad' },
            { name: 'Cola', price: 1.50, category: 'Drinks', description: 'Cold refreshing cola', imageUrl: 'https://placehold.co/400x300?text=Cola' },
            { name: 'Coffee', price: 2.00, category: 'Drinks', description: 'Hot brewed coffee', imageUrl: 'https://placehold.co/400x300?text=Coffee' },
            { name: 'Pizza Slice', price: 3.00, category: 'Fast Food', description: 'Pepperoni pizza slice', imageUrl: 'https://placehold.co/400x300?text=Pizza' },
        ]);
        console.log('Products created');

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
