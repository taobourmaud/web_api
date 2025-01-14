const pool = require('../config/db');

// Créer une session
exports.createSession = async (req, res) => {
    const { title, date } = req.body;

    try {
        // Récupérer l'ID du formateur depuis le token
        const formateurId = req.user.id;

        // Insérer la session dans la base de données
        const [result] = await pool.query(
            'INSERT INTO Session (title, date, formateur_id) VALUES (?, ?, ?)',
            [title, date, formateurId]
        );

        res.status(201).json({
            id: result.insertId,
            title,
            date,
            formateur_id: formateurId,
            message: 'Session created successfully'
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Obtenir toutes les sessions
exports.getAllSessions = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Session');
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtenir une session par ID
exports.getSessionById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM Session WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Session not found' });
        }
        res.status(200).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Mettre à jour une session
exports.updateSession = async (req, res) => {
    const { id } = req.params;
    const { title, date } = req.body;
    try {
        // Récupérer l'ID du formateur depuis le token
        const formateurId = req.user.id;

        const [result] = await pool.query(
            'UPDATE Session SET title = ?, date = ?, formateur_id = ? WHERE id = ?',
            [title, date, formateurId, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Session not found' });
        }
        res.status(200).json({ id, title, date, formateurId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Supprimer une session
exports.deleteSession = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM Session WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Session not found' });
        }
        res.status(200).json({ message: 'Session deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
