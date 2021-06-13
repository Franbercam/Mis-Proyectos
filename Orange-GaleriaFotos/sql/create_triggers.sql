-- RN-C01
DELIMITER //
CREATE OR REPLACE TRIGGER 
	maxPhotosNumber BEFORE INSERT ON photos FOR EACH ROW
	BEGIN 
	
	DECLARE numPhotos INT;
	SET numPhotos = (SELECT COUNT(*) FROM photos WHERE photos.userId=NEW.userId);
	IF (numPhotos=50) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 
		'Un usuario tiene prohibido subir más de 50 fotos';
		END IF;
END //
DELIMITER ;

-- RN-C02
DELIMITER //
CREATE OR REPLACE TRIGGER 
	unAllowedLenguaje BEFORE INSERT ON Photos FOR EACH ROW 
	BEGIN 
	DECLARE done BOOLEAN DEFAULT FALSE;
	DECLARE wordInUse VARCHAR(60);
	DECLARE words ROW TYPE OF forbiddenWords;
	DECLARE wordCursor CURSOR FOR SELECT * FROM forbiddenWords;
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done := TRUE;
	
	OPEN wordCursor;
	readLoop: LOOP
		FETCH wordCursor INTO words;
		IF done THEN
			LEAVE readLoop;
		END IF;
		SET wordInUse = CONCAT('%',words.words,'%');
		IF (NEW.title LIKE wordInUse OR NEW.description LIKE wordInUse) THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 
			'El título o la descripción contienen alguna palabra prohibida';
			LEAVE readLoop;
		END IF;
	END LOOP;
	CLOSE wordCursor;
	
END //
DELIMITER ;

DELIMITER //
CREATE OR REPLACE TRIGGER 
	unAllowedLenguajecreate2 BEFORE UPDATE ON Photos FOR EACH ROW 
	BEGIN 
	DECLARE done BOOLEAN DEFAULT FALSE;
	DECLARE wordInUse VARCHAR(60);
	DECLARE words ROW TYPE OF forbiddenWords;
	DECLARE wordCursor CURSOR FOR SELECT * FROM forbiddenWords;
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done := TRUE;
	
	OPEN wordCursor;
	readLoop: LOOP
		FETCH wordCursor INTO words;
		IF done THEN
			LEAVE readLoop;
		END IF;
		SET wordInUse = CONCAT('%',words.words,'%');
		IF (NEW.title LIKE wordInUse OR NEW.description LIKE wordInUse) THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 
			'El título o la descripción contienen alguna palabra prohibida';
			LEAVE readLoop;
		END IF;
	END LOOP;
	CLOSE wordCursor;
	
END //
DELIMITER ;

DELIMITER //
CREATE OR REPLACE TRIGGER 
	unAllowedLenguaje2 BEFORE INSERT ON Comments FOR EACH ROW 
	BEGIN 
	DECLARE done BOOLEAN DEFAULT FALSE;
	DECLARE wordInUse VARCHAR(60);
	DECLARE words ROW TYPE OF forbiddenWords;
	DECLARE wordCursor CURSOR FOR SELECT * FROM forbiddenWords;
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done := TRUE;
	
	OPEN wordCursor;
	readLoop: LOOP
		FETCH wordCursor INTO words;
		IF done THEN
			LEAVE readLoop;
		END IF;
		SET wordInUse = CONCAT('%',words.words,'%');
		IF (NEW.description LIKE wordInUse) THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 
			'El comentario contiene alguna palabra prohibida';
			LEAVE readLoop;
		END IF;
	END LOOP;
	CLOSE wordCursor;
	
END //
DELIMITER ;
DELIMITER //
CREATE OR REPLACE TRIGGER 
	unAllowedLenguaje3 BEFORE INSERT ON Categories FOR EACH ROW 
	BEGIN 
	DECLARE done BOOLEAN DEFAULT FALSE;
	DECLARE wordInUse VARCHAR(60);
	DECLARE words ROW TYPE OF forbiddenWords;
	DECLARE wordCursor CURSOR FOR SELECT * FROM forbiddenWords;
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done := TRUE;
	
	OPEN wordCursor;
	readLoop: LOOP
		FETCH wordCursor INTO words;
		IF done THEN
			LEAVE readLoop;
		END IF;
		SET wordInUse = CONCAT('%',words.words,'%');
		IF (NEW.nameCategory LIKE wordInUse) THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 
			'La categoria contiene alguna palabra prohibida';
			LEAVE readLoop;
		END IF;
	END LOOP;
	CLOSE wordCursor;
	
END //
DELIMITER ;

-- RN-B05
DELIMITER //
CREATE OR REPLACE TRIGGER 
	deletePhoto BEFORE DELETE ON photos FOR EACH ROW 
	BEGIN 
		DECLARE ComentariesNumber INT;
		SET ComentariesNumber = (SELECT COUNT(*) FROM comments WHERE old.userId=comments.userId 
				AND comments.photoId=OLD.photoId);
		IF (ComentariesNumber!=0) THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 
			'No puedes eliminar una foto que tenga comentarios';
		END IF;
	END //
DELIMITER ;


DELIMITER //
CREATE OR REPLACE TRIGGER 
	deleteVisibilityPhoto BEFORE UPDATE ON photos FOR EACH ROW 
	BEGIN 
		DECLARE ComentariesNumber INT;
		SET ComentariesNumber = (SELECT COUNT(*) FROM comments WHERE NEW.userId=comments.userId 
				AND comments.photoId=OLD.photoId);
		IF (ComentariesNumber!=0 AND NEW.visibility='PRIVADA') THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 
			'Una foto con comentarios no puede ser eliminanda ni marcarse como privada';
		END IF;
	END //
DELIMITER ;
