const express = require('express');
const app = express();

const authRoutes = require('./routes/auth');
const sessionRoutes = require('./routes/session');
const signinRoutes = require('./routes/signin');

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes); // Routes pour les utilisateurs
app.use('/api/sessions', sessionRoutes); // Routes pour les sessions
app.use('/api/sessions/:id', signinRoutes); // Routes pour les émargements

// Port d'écoute
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
