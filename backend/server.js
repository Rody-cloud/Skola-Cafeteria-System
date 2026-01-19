const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./database');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const AllowedEmail = require('./models/AllowedEmail'); // Import to sync model

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
    process.env.FRONTEND_STUDENT_URL || 'http://localhost:5173',
    process.env.FRONTEND_PROFESSOR_URL || 'http://localhost:5174',
    process.env.FRONTEND_STAFF_URL || 'http://localhost:5175',
];

app.use(cors({
    origin: true, // Allow any origin for development
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Root Endpoint
app.get('/', (req, res) => {
    res.send('Cafeteria System API is running');
});

// Sync Database and Start Server
sequelize.sync({ force: false }) // Set force: true to drop tables on restart
    .then(() => {
        console.log('Database synced successfully.');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });
