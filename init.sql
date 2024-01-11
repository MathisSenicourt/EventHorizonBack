-- Création de la base de données
CREATE DATABASE IF NOT EXISTS event_horizon;

-- Utilisation de la base de données
USE event_horizon;

-- Suppression des tables si elles existent
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS participation;
DROP TABLE IF EXISTS messages;

-- Création des tables
CREATE TABLE IF NOT EXISTS users
(
    ID       INT AUTO_INCREMENT PRIMARY KEY,
    Name     VARCHAR(255) NOT NULL,
    Surname  VARCHAR(255) NOT NULL,
    Mail     VARCHAR(255) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS events
(
    ID    INT AUTO_INCREMENT PRIMARY KEY,
    Name  VARCHAR(255) NOT NULL,
    Place VARCHAR(255) NOT NULL,
    Date  DATE         NOT NULL,
    URL   VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS participation
(
    ID       INT AUTO_INCREMENT PRIMARY KEY,
    ID_USER  INT NOT NULL,
    ID_EVENT INT NOT NULL,
    FOREIGN KEY (ID_USER) REFERENCES users (ID),
    FOREIGN KEY (ID_EVENT) REFERENCES events (ID)
);

CREATE TABLE IF NOT EXISTS messages
(
    ID               INT AUTO_INCREMENT PRIMARY KEY,
    ID_USER_SENDER   INT  NOT NULL,
    ID_USER_RECEIVER INT  NOT NULL,
    Content          TEXT NOT NULL,
    Date             TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ID_USER_SENDER) REFERENCES users (ID),
    FOREIGN KEY (ID_USER_RECEIVER) REFERENCES users (ID)
);


-- Insertions pour la table 'users'
INSERT INTO users (Name, Surname, Mail, Password)
VALUES ('John', 'Doe', 'john.doe@example.com', 'password123'),
       ('Alice', 'Smith', 'alice.smith@example.com', 'securepassword'),
       ('Bob', 'Johnson', 'bob.johnson@example.com', 'secret');

-- Insertions pour la table 'events'
INSERT INTO events (Name, Place, Date, URL)
VALUES ('Conference', 'Convention Center', '2024-01-15', 'https://example.com/conference'),
       ('Workshop', 'Tech Hub', '2024-02-20', 'https://example.com/workshop'),
       ('Seminar', 'Meeting Hall', '2024-03-25', 'https://example.com/seminar');

-- Insertions pour la table 'participation'
INSERT INTO participation (ID_USER, ID_EVENT)
VALUES (1, 1), -- John participe à la Conférence
       (2, 2), -- Alice participe à l'Atelier
       (3, 3);
-- Bob participe au Séminaire

-- Insertions pour la table 'messages'
INSERT INTO messages (ID_USER_SENDER, ID_USER_RECEIVER, Content)
VALUES (1, 2, 'Salut Alice, comment ça va?'),
       (2, 1, 'Bonjour John, ça va bien, merci!'),
       (3, 1, 'Salut John, j ai une question sur la conférence.');
