const db = require('./db');
const helper = require('../helper');

async function createUser(userData) {
    try {
        // Vérifier si l'adresse e-mail est déjà utilisée
        const existingUser = await db.query('SELECT * FROM users WHERE Mail = ?', [userData.Mail]);

        if (existingUser.length > 0) {
            return { success: false, message: 'Cet utilisateur existe déjà.' };
        }

        // Insérer l'utilisateur s'il n'existe pas encore
        const result = await db.query('INSERT INTO users (Name, Surname, Mail, Password) VALUES (?, ?, ?, ?)', [userData.Name, userData.Surname, userData.Mail, userData.Password]);

        if (result.affectedRows === 1) {
            return { success: true, message: 'Utilisateur créé avec succès.' };
        } else {
            return { success: false, message: 'Échec de la création de l\'utilisateur.' };
        }
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur :', error);
        return { success: false, message: 'Erreur lors de la création de l\'utilisateur.' };
    }
}
async function checkUserWithPassword(userData) {
    try {
        const user = await db.query('SELECT ID FROM users WHERE Mail = ? AND Password = ?', [userData.Mail, userData.Password]);

        if (user.length > 0) {
            return { success: true, message: 'Utilisateur trouvé.', user };
        } else {
            return { success: false, message: 'Nom d\'utilisateur ou mot de passe incorrect.' };
        }
    } catch (error) {
        console.error('Erreur lors de la vérification de l\'utilisateur avec mot de passe :', error);
        return { success: false, message: 'Erreur lors de la vérification de l\'utilisateur avec mot de passe.' };
    }
}

async function getUserById(userId) {
    try {
        const user = await db.query('SELECT * FROM users WHERE ID = ?', [userId]);

        if (user.length > 0) {
            return { success: true, user: user[0] };
        } else {
            return { success: false, message: 'Utilisateur non trouvé.' };
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur :', error);
        return { success: false, message: 'Erreur lors de la récupération des informations de l\'utilisateur.' };
    }
}

async function getAllEvents() {
    try {
        const events = await db.query('SELECT * FROM events');
        return { success: true, events };
    } catch (error) {
        console.error('Erreur lors de la récupération de tous les événements :', error);
        return { success: false, message: 'Erreur lors de la récupération de tous les événements.' };
    }
}

async function getEventsByUserId(userId) {
    try {
        const userEvents = await db.query('SELECT * FROM events WHERE ID IN (SELECT ID_EVENT FROM participation WHERE ID_USER = ?)', [userId]);
        return { success: true, userEvents };
    } catch (error) {
        console.error('Erreur lors de la récupération des événements de l\'utilisateur :', error);
        return { success: false, message: 'Erreur lors de la récupération des événements de l\'utilisateur.' };
    }
}

async function getUsersByEventId(eventId) {
    try {
        const eventUsers = await db.query('SELECT * FROM users WHERE ID IN (SELECT ID_USER FROM participation WHERE ID_EVENT = ?)', [eventId]);
        return { success: true, eventUsers };
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs de l\'événement :', error);
        return { success: false, message: 'Erreur lors de la récupération des utilisateurs de l\'événement.' };
    }
}

async function getMessagesBetweenUsers(user1Id, user2Id) {
    try {
        const messages = await db.query('SELECT * FROM messages WHERE (ID_USER_SENDER = ? AND ID_USER_RECEIVER = ?) OR (ID_USER_SENDER = ? AND ID_USER_RECEIVER = ?) ORDER BY Date', [user1Id, user2Id, user2Id, user1Id]);
        return { success: true, messages };
    } catch (error) {
        console.error('Error retrieving messages between users:', error);
        return { success: false, message: 'Error retrieving messages between users.' };
    }
}

async function sendMessage(senderId, receiverId, content) {
    try {
        const result = await db.query('INSERT INTO messages (ID_USER_SENDER, ID_USER_RECEIVER, Content) VALUES (?, ?, ?)', [senderId, receiverId, content]);

        if (result.affectedRows === 1) {
            return { success: true, message: 'Message sent successfully.' };
        } else {
            return { success: false, message: 'Failed to send the message.' };
        }
    } catch (error) {
        console.error('Error sending message:', error);
        return { success: false, message: 'Error sending the message.' };
    }
}

module.exports = {
    createUser,
    checkUserWithPassword,
    getAllEvents,
    getEventsByUserId,
    getMessagesBetweenUsers,
    sendMessage,
    getUserById
};
