const sequelize = require('./database');
const Product = require('./models/Product');

const menuItems = [
    // EKSTRALAR
    { name: 'Extra Shot', price: 45, category: 'EKSTRALAR', imageUrl: 'https://placehold.co/400x300?text=Extra+Shot' },
    { name: 'Alternative Milk', price: 45, category: 'EKSTRALAR', imageUrl: 'https://placehold.co/400x300?text=Alternative+Milk' },
    { name: 'Syrup', price: 45, category: 'EKSTRALAR', imageUrl: 'https://placehold.co/400x300?text=Syrup' },

    // SICAK İÇECEKLER
    { name: 'Çay (Küçük)', price: 15, category: 'SICAK İÇECEKLER', imageUrl: '/Images/cay.jpg' },
    { name: 'Çay (Büyük)', price: 25, category: 'SICAK İÇECEKLER', imageUrl: '/Images/fincan_cay.jpg' },
    { name: 'Sıcak Çikolata (Küçük)', price: 85, category: 'SICAK İÇECEKLER', imageUrl: '/Images/sicak-cikolata.jpg' },
    { name: 'Sıcak Çikolata (Büyük)', price: 100, category: 'SICAK İÇECEKLER', imageUrl: '/Images/sicak-cikolata.jpg' },
    { name: 'Bitki Çayı', price: 60, category: 'SICAK İÇECEKLER', imageUrl: '/Images/bitki-caylari.jpg' },
    { name: 'Chai Tea Latte (Küçük)', price: 95, category: 'SICAK İÇECEKLER', imageUrl: '/Images/chai-latte-kucuk.jpg' },
    { name: 'Chai Tea Latte (Büyük)', price: 110, category: 'SICAK İÇECEKLER', imageUrl: '/Images/chai-tea-latte-buyuk.jpg' },

    // SOĞUK KAHVELER
    { name: 'Ice Latte', price: 120, category: 'SOĞUK KAHVELER', imageUrl: '/Images/Iced-latte.jpg' },
    { name: 'Ice Americano', price: 105, category: 'SOĞUK KAHVELER', imageUrl: '/Images/iced-americano.jpg' },
    { name: 'Ice Filter Coffee', price: 100, category: 'SOĞUK KAHVELER', imageUrl: '/Images/ice-filter-coffee.jpg' },
    { name: 'Ice Salted Caramel', price: 125, category: 'SOĞUK KAHVELER', imageUrl: '/Images/iced-salted-caramel-latte.jpg' },
    { name: 'Ice White Mocha', price: 125, category: 'SOĞUK KAHVELER', imageUrl: '/Images/iced-white-chocolate-mocha.jpg' },
    { name: 'Ice Vanilla Latte', price: 125, category: 'SOĞUK KAHVELER', imageUrl: '/Images/Iced-Vanilla-Latte.jpg' },

    // SOĞUK İÇECEKLER
    { name: 'Coca Cola Zero', price: 55, category: 'SOĞUK İÇECEKLER', imageUrl: '/Images/cocacola-zero.jpg' },
    { name: 'Fanta', price: 55, category: 'SOĞUK İÇECEKLER', imageUrl: '/Images/fanta.jpg' },
    { name: 'Sprite', price: 55, category: 'SOĞUK İÇECEKLER', imageUrl: '/Images/sprite.png' },
    { name: 'Fuse Tea', price: 55, category: 'SOĞUK İÇECEKLER', imageUrl: '/Images/fues-tea.jpg' },
    { name: 'Cappy', price: 55, category: 'SOĞUK İÇECEKLER', imageUrl: '/Images/cappy.jpg' },
    { name: 'Ayran', price: 40, category: 'SOĞUK İÇECEKLER', imageUrl: '/Images/ayran.png' },
    { name: 'Meyveli Soda', price: 40, category: 'SOĞUK İÇECEKLER', imageUrl: '/Images/meyveli-soda.png' },
    { name: 'Sade Soda', price: 35, category: 'SOĞUK İÇECEKLER', imageUrl: '/Images/sade-soda.jpg' },
    { name: 'Su', price: 15, category: 'SOĞUK İÇECEKLER', imageUrl: '/Images/su.png' },

    // FAST FOOD
    { name: 'Classic Burger', price: 185, category: 'FAST FOOD', imageUrl: '/Images/burger.jpg' },
    { name: 'Special Pizza', price: 210, category: 'FAST FOOD', imageUrl: '/Images/pizza.jpg' },
    { name: 'Pasta Italiano', price: 175, category: 'FAST FOOD', imageUrl: '/Images/pasta.jpg' },
    { name: 'Patates Kızartması', price: 155, category: 'FAST FOOD', imageUrl: 'https://placehold.co/400x300?text=Fries' },

    // SALATA
    { name: 'Tavuklu Salata', price: 150, category: 'SALATA', imageUrl: '/Images/salad.jpg' },
    { name: 'Ton Balıklı Salata', price: 160, category: 'SALATA', imageUrl: '/Images/salad.jpg' }
];

const seedMenu = async () => {
    try {
        await sequelize.sync();
        const count = await Product.count();
        if (count > 0) {
            console.log('Clearing existing products...');
            await Product.destroy({ where: {}, truncate: true });
        }

        await Product.bulkCreate(menuItems);
        console.log('Menu seeded successfully!');
    } catch (error) {
        console.error('Error seeding menu:', error);
    }
};

seedMenu();
