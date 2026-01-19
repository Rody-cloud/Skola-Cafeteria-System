const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
        defaultValue: 'https://placehold.co/400x300?text=Food+Image',
    },
    category: {
        type: DataTypes.STRING,
        defaultValue: 'General',
    },
});

module.exports = Product;
