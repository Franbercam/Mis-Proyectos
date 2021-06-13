DROP TABLE if EXISTS Comments;
DROP TABLE if EXISTS PhotoCategory;
DROP TABLE if EXISTS Categories;
DROP TABLE if EXISTS ForbiddenWords;
DROP TABLE IF EXISTS Ratings;
DROP TABLE IF EXISTS Photos;
DROP TABLE IF EXISTS Users;


CREATE TABLE Users (
	userId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	email VARCHAR(128) NOT NULL UNIQUE,
	name VARCHAR(128) NOT NULL,
	user VARCHAR(32) NOT NULL UNIQUE,
	password VARCHAR(256) NOT NULL,
	telephone VARCHAR(32),
	avatarUrl VARCHAR(512),
	UNIQUE (user,email)
);

CREATE TABLE Photos (
	photoId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(128) NOT NULL,
	description VARCHAR(512),
	date DATETIME DEFAULT CURRENT_TIMESTAMP,
	visibility VARCHAR(16) NOT NULL,
	category VARCHAR(32) NOT NULL,
	url VARCHAR(512) NOT NULL,	
	userId INT NOT NULL,
	FOREIGN KEY (userId) REFERENCES Users (userId),
	CONSTRAINT InvalidVisibility CHECK (visibility in ('Pública', 'Privada'))
);

CREATE TABLE Ratings (
	ratingId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	userId INT NOT NULL,
	photoId INT NOT NULL,	
    punctuation INT NOT NULL,
    UNIQUE (userId,photoId),
	date DATETIME DEFAULT CURRENT_TIMESTAMP, 
	FOREIGN KEY (userId) REFERENCES users(userId),
	FOREIGN KEY (photoId) REFERENCES photos(photoId) ON DELETE CASCADE,
	CONSTRAINT InvalidPunctuation CHECK (1 >= punctuation <= 5 )
);

CREATE TABLE Forbiddenwords(
   ForbiddenwordsId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
   words VARCHAR(60)
);

CREATE TABLE Categories(
   categoryId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
   nameCategory VARCHAR(40) UNIQUE
);

CREATE TABLE PhotoCategory(
    photoCategoryId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    photoId INT,
    categoryId INT,
    FOREIGN KEY(photoId) REFERENCES Photos(photoId) ON DELETE CASCADE,
    FOREIGN KEY(categoryId) REFERENCES Categories(categoryId),
    UNIQUE (categoryId, photoId)
);

CREATE TABLE Comments(
    commentId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    userId INT,
	photoId INT,
	description VARCHAR(512),
	commentDate DATETIME DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY(userId) REFERENCES Users(userId) ON DELETE CASCADE,
	FOREIGN KEY(photoId) REFERENCES Photos(photoId)
);



