const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Vérifier si le token est fourni
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Vérifier et décoder le token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attacher les informations de l'utilisateur à l'objet `req`
        next(); // Passer à la suite
    } catch (err) {
        return res.status(403).json({ error: 'Invalid token' });
    }
};

// Vérifier si l'utilisateur est un formateur
exports.isFormateur = (req, res, next) => {
    if (req.user.role !== 'formateur') {
        return res.status(403).json({ error: 'Access denied: Only formateurs are allowed' });
    }
    next();
};

exports.isStudent = (req, res, next) => {
    if (req.user.role !== 'etudiant') {
        return res.status(403).json({error: 'Access denied: Only students are allowed'})
    }
    next();
};
