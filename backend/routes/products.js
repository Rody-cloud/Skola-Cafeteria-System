const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
    }
});

// Create product (Staff only - simplified auth check for now, can add middleware later)
router.post('/', async (req, res) => {
    try {
        const { name, description, price, imageUrl, category } = req.body;
        const product = await Product.create({ name, description, price, imageUrl, category });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product' });
    }
});

// Delete product
router.delete('/:id', async (req, res) => {
    try {
        await Product.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product' });
    }
});

// Seed Initial Products
router.post('/seed', async (req, res) => {
    try {
        const count = await Product.count();
        if (count > 0) return res.json({ message: 'Products already seeded' });

        await Product.bulkCreate([
            { name: 'Burger', price: 5.99, category: 'Food', description: 'Delicious beef burger', imageUrl: 'https://placehold.co/400x300?text=Burger' },
            { name: 'Pizza', price: 8.99, category: 'Food', description: 'Cheese pizza slice', imageUrl: 'https://placehold.co/400x300?text=Pizza' },
            { name: 'Coffee', price: 2.50, category: 'Drink', description: 'Hot brewed coffee', imageUrl: 'https://placehold.co/400x300?text=Coffee' },
            { name: 'Cola', price: 1.50, category: 'Drink', description: 'Cold soda', imageUrl: 'https://placehold.co/400x300?text=Cola' },
        ]);
        res.json({ message: 'Seeded products' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
