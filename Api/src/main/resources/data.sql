DROP TABLE IF EXISTS task;

CREATE TABLE task (
 id INT AUTO_INCREMENT PRIMARY KEY,
 description TEXT NOT NULL,
 completed BOOLEAN DEFAULT false,
 createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO task (description) VALUES
 ('Remover lixo'),
 ('Lavar o carro'),
 ('Fazer atividade');