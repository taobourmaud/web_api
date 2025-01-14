CREATE TABLE IF NOT EXISTS Utilisateur (
                                           id INT AUTO_INCREMENT PRIMARY KEY,
                                           name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('formateur', 'etudiant') NOT NULL
    );

CREATE TABLE IF NOT EXISTS Session (
                                       id INT AUTO_INCREMENT PRIMARY KEY,
                                       title VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    formateur_id INT NOT NULL,
    FOREIGN KEY (formateur_id) REFERENCES Utilisateur(id)
    );

CREATE TABLE IF NOT EXISTS Emargement (
                                          id INT AUTO_INCREMENT PRIMARY KEY,
                                          session_id INT NOT NULL,
                                          etudiant_id INT NOT NULL,
                                          status BOOLEAN NOT NULL,
                                          FOREIGN KEY (session_id) REFERENCES Session(id),
    FOREIGN KEY (etudiant_id) REFERENCES Utilisateur(id)
    );
