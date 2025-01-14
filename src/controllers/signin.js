const pool = require('../config/db');

// Créer un émargement
exports.createsignin = async (req, res) => {
    const { session_id, status } = req.body;
    try {

        const studentId = req.user.id;
        const [result] = await pool.query(
            'INSERT INTO Emargement (session_id, etudiant_id, status) VALUES (?, ?, ?)',
            [session_id, studentId, status]
        );
        res.status(201).json({ id: result.insertId, session_id, studentId, status });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtenir tous les émargements
exports.getAllsignin = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Emargement');
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
