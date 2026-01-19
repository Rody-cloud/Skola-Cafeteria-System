const express = require('express');
const { Order, OrderItem } = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

const router = express.Router();

// Create Order
router.post('/', async (req, res) => {
    try {
        const { customerId, items, paymentMethod } = req.body; // items: [{ productId, quantity }]

        // Calculate total price
        let totalPrice = 0;
        const orderItemsData = [];

        for (const item of items) {
            const product = await Product.findByPk(item.productId);
            if (!product) return res.status(404).json({ message: `Product ${item.productId} not found` });

            totalPrice += product.price * item.quantity;
            orderItemsData.push({
                ProductId: product.id,
                quantity: item.quantity,
                priceAtPurchase: product.price
            });
        }

        // Determine payment status
        // Cash -> Pending, Card -> Paid (Simulated)
        const paymentStatus = paymentMethod === 'Card' ? 'Paid' : 'Pending';
        const initialStatus = paymentMethod === 'Card' ? 'Confirmed' : 'Pending';

        const order = await Order.create({
            customerId,
            totalPrice,
            paymentMethod,
            paymentStatus,
            status: initialStatus
        });

        // Create Order Items
        for (const itemData of orderItemsData) {
            await OrderItem.create({
                ...itemData,
                OrderId: order.id
            });
        }

        // Simulate sending email receipt
        console.log(`[EMAIL SERVICE] Receipt sent to customer for order #${order.id} (Method: ${paymentMethod})`);

        res.status(201).json({
            message: 'Order placed',
            orderId: order.id,
            receiptSent: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error placing order' });
    }
});

// Get all orders (Staff)
router.get('/all', async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [
                { model: User, as: 'customer', attributes: ['name', 'email'] },
                { model: OrderItem, include: [Product] }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching orders' });
    }
});

// Get my orders (Student)
router.get('/my/:userId', async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: { customerId: req.params.userId },
            include: [
                { model: OrderItem, include: [Product] }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders' });
    }
});

// Update Order Status (Staff)
router.put('/:id/status', async (req, res) => {
    try {
        const { status, paymentStatus } = req.body;
        const order = await Order.findByPk(req.params.id);

        if (!order) return res.status(404).json({ message: 'Order not found' });

        if (status) order.status = status;
        if (paymentStatus) order.paymentStatus = paymentStatus;

        await order.save();
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error updating order' });
    }
});

module.exports = router;
