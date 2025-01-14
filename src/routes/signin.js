const express = require('express');
const router = express.Router();
const signinController = require('../controllers/signin');

// CRUD pour Émargement
router.post('/emargement', signinController.createsignin); // Créer un émargement
router.get('/emargement', signinController.getAllsignin); // Obtenir tous les émargements

module.exports = router;
