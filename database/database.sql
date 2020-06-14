CREATE DATABASE sportsconnection;

USE sportsconnection;

-- TABLE USER
-- all pasword wil be encrypted using SHA1
CREATE TABLE usuarios (
  id INT(11) NOT NULL,
  username VARCHAR(16) NOT NULL,
  password VARCHAR(60) NOT NULL,
  nombrecompleto VARCHAR(100) NOT NULL,
  correo VARCHAR(100) NOT NULL,
  comunidad VARCHAR(100) NOT NULL,
  provincia VARCHAR(100) NOT NULL,
  añonacimiento DATE NOT NULL,
  deportefav VARCHAR(100) NOT NULL,
  equipo VARCHAR(100) NOT NULL,
  neventos VARCHAR(100) NOT NULL,
  namigos VARCHAR(100) NOT NULL,
  descripcion VARCHAR(100) NOT NULL
);

ALTER TABLE usuarios
  ADD PRIMARY KEY (id);

ALTER TABLE usuarios
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE usuarios;


CREATE TABLE eventos (
  id INT(11) NOT NULL PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  tipodeporte VARCHAR(255) NOT NULL,
  description TEXT,
  nparticipantes INT(11) NOT NULL,
  nparticipantesMAX INT(11) NOT NULL,
  password VARCHAR(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  fecha DATE NOT NULL,
  hora VARCHAR(100),
  municipio VARCHAR(100),
  direccion VARCHAR(100),
  user_id INT(11),
  comunidad VARCHAR(100),
  CONSTRAINT fk_userid FOREIGN KEY(user_id) REFERENCES usuarios(id)
);


ALTER TABLE eventos
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE eventos;


CREATE TABLE unirse (
  user_id INT(11),
  evento_id INT(11),
  CONSTRAINT fk_userid2 FOREIGN KEY(user_id) REFERENCES usuarios(id),
   CONSTRAINT fk_eventoid FOREIGN KEY(evento_id) REFERENCES eventos(id)
);

CREATE TABLE amigos (
  user_id INT(11),
  amigo_id INT(11),
  CONSTRAINT fk_userid3 FOREIGN KEY(user_id) REFERENCES usuarios(id)
);