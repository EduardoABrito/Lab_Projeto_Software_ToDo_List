DROP TABLE IF EXISTS task;

CREATE TABLE task (
 id INT AUTO_INCREMENT PRIMARY KEY,
 description TEXT NOT NULL,
 completed BOOLEAN DEFAULT false,
 priority int NOT NULL DEFAULT 1,
 date DATE,
 type int NOT NULL DEFAULT 1,
 createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO task (description, priority, type) VALUES
 ('Remover lixo', 1, 3),
 ('Lavar o carro', 1, 3),
 ('Fazer atividade', 1, 3);