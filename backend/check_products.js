const Product = require('./models/Product');
const sequelize = require('./database');

async function checkProducts() {
    try {
        await sequelize.authenticate();
        const products = await Product.findAll({ attributes: ['name', 'category'] });
        console.log(JSON.stringify(products, null, 2));
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
}

checkProducts();
