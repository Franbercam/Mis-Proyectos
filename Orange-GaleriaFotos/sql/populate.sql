INSERT INTO Users
VALUES
	(1,'pedrodort@alumn.us.es', 'Pedro', 'Pedrodort','pbkdf2:sha256:150000$hrkkV6S1$3dbb45c0e3d231acb0cde526029397da6460351185b731dca068393b9f961999','612345678','/images/P Pedro.jpeg'),
	(2,'martamo@alumn.us.es', 'Marta', 'Martamo','pbkdf2:sha256:150000$hrkkV6S1$3dbb45c0e3d231acb0cde526029397da6460351185b731dca068393b9f961999','687654321','/images/P Marta.jpeg');

INSERT INTO Photos
VALUES
	(1, 'PerfilPedro', 'Esta es la foto de perfil de Pedro', '2021-03-20 13:53:43','Pública','Casual','/images/P Pedro.jpeg',1),
	(2, 'PerfilMarta', 'Esta es la foto de perfil de Marta', '2021-03-20 13:53:01','Pública','Divertida','/images/P Marta.jpeg',2),
	(3, 'F3 Marta', 'Esta es la foto 3 de Marta', '2021-05-21 13:36:11','Pública','Fiesta','/images/F3  Marta.jpeg',2),
	(4, 'F4 Marta', 'Esta es la foto 4 de Marta', '2021-05-22 13:39:59','Pública','Casual','/images/F4 Marta.jpeg',2),
	(5, 'F5 Pedro', 'Esta es la foto 5 de Pedro', '2021-05-23 14:33:42','Pública','Divertida','/images/F5 Pedro.jpeg',1),
	(6, 'F3 Pedro', 'Esta es la foto 3 de Pedro', '2021-05-24 15:30:23','Pública','Fiesta','/images/F3 Pedro.jpeg',1),
	(7, 'F2 Marta', 'Esta es la foto 2 de Marta', '2021-05-25 16:25:01','Pública','Casual','/images/F2 Marta.jpeg',2),
	(8, 'F1 Pedro', 'Esta es la foto 1 de Pedro', '2021-05-26 17:27:12','Pública','Casual','/images/F1 Pedro.jpeg',1),
	(9, 'F2 Pedro', 'Esta es la foto 2 de Pedro', '2021-04-26 17:27:12','Privada','Casual','/images/F2 Pedro.jpeg',1),
	(10, 'F4 Pedro', 'Esta es la foto 4 de Pedro', '2021-04-27 17:27:12','Privada','Fiesta','/images/F4 Pedro.jpeg',1);

INSERT INTO ForbiddenWords(words)
VALUES
   ('palabraFea1'),('palabraFea2'),('palabraFea3'),('palabraFea4'),('palabraFea5');

INSERT INTO Comments(userId, photoId, description, commentDate)
VALUES
   (1,1,'comentario1', '2018-02-24'),(2,1,'comentario2', '2018-02-24'),(1,2,'comentario3', '2018-02-24'),(2,2,'comentario3', '2018-02-24');

INSERT INTO Categories(nameCategory)
VALUES
	('Casual'),('Divertida'),('Fiesta');	

INSERT INTO PhotoCategory (photoId, categoryId)
VALUES 
   (1,2),(2,2),(3,3),(4,1),(5,2),(6,3),(7,1),(8,1),(9,1),(10,3);


	