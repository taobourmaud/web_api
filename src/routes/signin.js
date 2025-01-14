const express = require('express');
const router = express.Router();
const signinController = require('../controllers/signin');
const { verifyToken, isFormateur, isStudent } = require('../middleware');

// CRUD pour Émargement
router.post('/emargement', verifyToken, isStudent, signinController.createsignin); // Créer un émargement
router.get('/emargement', verifyToken, isFormateur, signinController.getAllsignin); // Obtenir tous les émargements

module.exports = router;
