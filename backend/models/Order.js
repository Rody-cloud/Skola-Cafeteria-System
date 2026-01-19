const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./User');
const Product = require('./Product');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    paymentMethod: {
        type: DataTypes.ENUM('Cash', 'Card'),
        allowNull: false,
    },
    paymentStatus: {
        type: DataTypes.ENUM('Pending', 'Paid'),
        defaultValue: 'Pending',
    },
    status: {
        type: DataTypes.ENUM('Pending', 'Confirmed', 'Ready', 'Completed'),
        defaultValue: 'Pending',
    },
});

const OrderItem = sequelize.define('OrderItem', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    priceAtPurchase: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
});

// Associations
Order.belongsTo(User, { as: 'customer', foreignKey: 'customerId' });
User.hasMany(Order, { foreignKey: 'customerId' });

Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);
OrderItem.belongsTo(Product);

module.exports = { Order, OrderItem };
