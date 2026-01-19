const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AllowedEmail = require('../models/AllowedEmail');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if email is in the allowed list
        const allowedEmail = await AllowedEmail.findOne({
            where: { email: email.toLowerCase() }
        });

        if (!allowedEmail) {
            return res.status(403).json({
                message: 'This email is not registered with the university. Please contact administration to register your email.'
            });
        }

        // Check if the email is active
        if (!allowedEmail.isActive) {
            return res.status(403).json({
                message: 'This email has been deactivated. Please contact administration.'
            });
        }

        // Verify the role matches
        if (allowedEmail.role !== role) {
            return res.status(403).json({
                message: `This email is registered as a ${allowedEmail.role}, not a ${role}. Please select the correct role.`
            });
        }

        // Validate university email domain (additional check)
        const allowedDomain = role === 'professor' || role === 'staff' ? '@topkapi.edu.tr' : '@stu.topkapi.edu.tr';

        if (!email.endsWith(allowedDomain)) {
            return res.status(400).json({
                message: `As a ${role}, please use your institutional email (${allowedDomain})`
            });
        }

        // Check if user already registered
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'student',
        });

        // Generate token
        const token = jwt.sign(
            { id: user.id, role: user.role, name: user.name },
            process.env.JWT_SECRET || 'secret_key',
            { expiresIn: '1d' }
        );

        res.status(201).json({
            message: 'User created successfully',
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email is in the allowed list
        const allowedEmail = await AllowedEmail.findOne({
            where: { email: email.toLowerCase() }
        });

        if (!allowedEmail) {
            return res.status(403).json({
                message: 'This email is not registered with the university. Access denied.'
            });
        }

        // Check if the email is active
        if (!allowedEmail.isActive) {
            return res.status(403).json({
                message: 'This email has been deactivated. Please contact administration.'
            });
        }

        // Find user
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials. Please register first.' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign(
            { id: user.id, role: user.role, name: user.name },
            process.env.JWT_SECRET || 'secret_key',
            { expiresIn: '1d' }
        );

        res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
