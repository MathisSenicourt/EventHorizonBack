const express = require('express');
const router = express.Router();
const globalService = require('../services/global');

router.post('/createUser', async (req, res) => {
    try {
        const result = await globalService.createUser(req.body);

        if (result.success) {
            res.status(201).json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur :', error);
        res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
});

router.post('/checkUserWithPassword', async (req, res) => {
    try {
        const result = await globalService.checkUserWithPassword(req.body);

        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(401).json(result);
        }
    } catch (error) {
        console.error('Erreur lors de la vérification de l\'utilisateur avec mot de passe :', error);
        res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
});

router.get('/getUserById/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const result = await globalService.getUserById(userId);

        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(404).json(result); // Utilisateur non trouvé
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur :', error);
        res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
    }
});

router.get('/getAllEvents', async (req, res) => {
    try {
        const result = await globalService.getAllEvents();

        if (result.success) {
            res.status(200).json(result.events);
        } else {
            res.status(500).json({ success: false, message: 'Erreur interne du serveur lors de la récupération des événements.' });
        }
    } catch (error) {
        console.error('Erreur lors de la récupération de tous les événements :', error);
        res.status(500).json({ success: false, message: 'Erreur interne du serveur lors de la récupération des événements.' });
    }
});

router.get('/getEventsByUserId/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const result = await globalService.getEventsByUserId(userId);

        if (result.success) {
            res.status(200).json(result.userEvents);
        } else {
            res.status(500).json({ success: false, message: 'Erreur interne du serveur lors de la récupération des événements de l\'utilisateur.' });
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des événements de l\'utilisateur :', error);
        res.status(500).json({ success: false, message: 'Erreur interne du serveur lors de la récupération des événements de l\'utilisateur.' });
    }
});

router.get('/getUsersByEventId/:eventId', async (req, res) => {
    const eventId = req.params.eventId;

    try {
        const result = await globalService.getUsersByEventId(eventId);

        if (result.success) {
            res.status(200).json(result.eventUsers);
        } else {
            res.status(500).json({ success: false, message: 'Erreur interne du serveur lors de la récupération des utilisateurs de l\'événement.' });
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs de l\'événement :', error);
        res.status(500).json({ success: false, message: 'Erreur interne du serveur lors de la récupération des utilisateurs de l\'événement.' });
    }
});

router.get('/getMessagesBetweenUsers/:user1Id/:user2Id', async (req, res) => {
    const user1Id = req.params.user1Id;
    const user2Id = req.params.user2Id;

    try {
        const result = await globalService.getMessagesBetweenUsers(user1Id, user2Id);

        if (result.success) {
            res.status(200).json(result.messages);
        } else {
            res.status(500).json({ success: false, message: 'Error retrieving messages between users.' });
        }
    } catch (error) {
        console.error('Error retrieving messages between users:', error);
        res.status(500).json({ success: false, message: 'Error retrieving messages between users.' });
    }
});

router.post('/sendMessage', async (req, res) => {
    const { senderId, receiverId, content } = req.body;

    try {
        const result = await globalService.sendMessage(senderId, receiverId, content);

        if (result.success) {
            res.status(201).json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ success: false, message: 'Error sending the message.' });
    }
});

module.exports = router;
