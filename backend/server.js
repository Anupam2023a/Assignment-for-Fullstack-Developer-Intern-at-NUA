const express = require('express');
const cors = require('cors');
const { initializeDatabase } = require('./config/database');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/users', userRoutes);

// server running status health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

// Initialize database and start server
initializeDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => {
    console.error('Failed to initialize database:', error);
    process.exit(1);
});