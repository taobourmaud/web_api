const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/session');
const { verifyToken, isFormateur } = require('../middleware');

// CRUD pour Session
router.post('/', verifyToken, isFormateur, sessionController.createSession); // Créer une session
router.get('/', sessionController.getAllSessions); // Obtenir toutes les sessions
router.get('/:id', sessionController.getSessionById); // Obtenir une session par ID
router.put('/:id', verifyToken, isFormateur, sessionController.updateSession); // Mettre à jour une session
router.delete('/:id', verifyToken, isFormateur, sessionController.deleteSession); // Supprimer une session

module.exports = router;
