const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const AllowedEmail = sequelize.define('AllowedEmail', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    role: {
        type: DataTypes.ENUM('student', 'professor', 'staff'),
        allowNull: false,
    },
    studentId: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'Student/Staff ID number (optional)',
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        comment: 'Set to false to temporarily disable access',
    },
});

module.exports = AllowedEmail;
