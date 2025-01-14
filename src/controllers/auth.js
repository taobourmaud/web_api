const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Inscription d'un utilisateur
exports.signup = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Vérifier si l'utilisateur existe déjà
        const [existingUser] = await pool.query('SELECT * FROM Utilisateur WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insérer l'utilisateur dans la base de données
        const [result] = await pool.query(
            'INSERT INTO Utilisateur (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, role]
        );

        res.status(201).json({ message: 'User created successfully', id: result.insertId, name, email, role });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Connexion d'un utilisateur
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe
        const [user] = await pool.query('SELECT * FROM Utilisateur WHERE email = ?', [email]);
        if (user.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Comparer le mot de passe
        const validPassword = await bcrypt.compare(password, user[0].password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Générer un token JWT
        const token = jwt.sign(
            { id: user[0].id, email: user[0].email, role: user[0].role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: { id: user[0].id, name: user[0].name, email: user[0].email, role: user[0].role }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
