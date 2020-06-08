CREATE DATABASE sportsconnection;

USE sportsconnection;

-- TABLE USER
-- all pasword wil be encrypted using SHA1
CREATE TABLE usuarios (
  id INT(11) NOT NULL,
  usuario VARCHAR(16) NOT NULL,
  password VARCHAR(60) NOT NULL,
  nombrecompleto VARCHAR(100) NOT NULL,
  provincia VARCHAR(100) NOT NULL,
  localidad VARCHAR(100) NOT NULL,
  añonacimiento DATE NOT NULL,
  deportefav VARCHAR(100) NOT NULL,
  equipo VARCHAR(100) NOT NULL,
  neventos VARCHAR(100) NOT NULL,
  namigos VARCHAR(100) NOT NULL
);

ALTER TABLE usuarios
  ADD PRIMARY KEY (id);

ALTER TABLE usuarios
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE usuarios;


CREATE TABLE eventos (
  id INT(11) NOT NULL,
  titulo VARCHAR(150) NOT NULL,
  tipodeporte VARCHAR(255) NOT NULL,
  description TEXT,
  nparticipantes INT(11) NOT NULL,
  password VARCHAR(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  acaba_el DATE NOT NULL,
  direccion VARCHAR(100),
  user_id INT(11),
  CONSTRAINT fk_userid FOREIGN KEY(user_id) REFERENCES usuarios(id)
);
/*
user_usuario VARCHAR(150),
  CONSTRAINT fk_username FOREIGN KEY(user_usuario) REFERENCES usuarios(usuario)*/

ALTER TABLE links
  ADD PRIMARY KEY (id);

ALTER TABLE links
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE links;