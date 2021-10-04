To succsessfully use this website please:
1. Download XAMPP v3.2.4 or higher
2. Create initial database
-

CREATE TABLE IF NOT EXISTS `patike` (
  `patike_id` SMALLINT UNSIGNED UNIQUE NOT NULL AUTO_INCREMENT,
  `ime_patike` TINYTEXT NOT NULL UNIQUE,
  `opis_patike` MEDIUMTEXT NOT NULL,
  `cena_patike` MEDIUMINT UNSIGNED NOT NULL,
  `imageData_default` MEDIUMBLOB NOT NULL,
  `imageData_djon` MEDIUMBLOB NOT NULL,
  `imageData_ledja` MEDIUMBLOB NOT NULL,
  `imageData_sidebyside` MEDIUMBLOB NOT NULL,
  PRIMARY KEY(patike_id)
)

CREATE TABLE IF NOT EXISTS `gradovi` (
  `gradovi_id` TINYINT UNSIGNED UNIQUE NOT NULL AUTO_INCREMENT,
  `ime_grada` VARCHAR(30) UNIQUE NOT NULL,
  PRIMARY KEY(gradovi_id)
)

CREATE TABLE IF NOT EXISTS `prodavnice` (
  `prodavnice_id` TINYINT UNSIGNED UNIQUE NOT NULL AUTO_INCREMENT,
  `adresa_tekst` TINYTEXT NOT NULL,
  `adresa_broj` VARCHAR(5)  NOT NULL,
  `grad_id` TINYINT UNSIGNED NOT NULL,
  PRIMARY KEY(prodavnice_id),
  FOREIGN KEY(grad_id) REFERENCES gradovi(gradovi_id)
)

CREATE TABLE IF NOT EXISTS `patika_prodavnica` (
  `patika_id` SMALLINT UNSIGNED NOT NULL,
  `prodavnica_id` TINYINT UNSIGNED  NOT NULL,
  `velicina_40` TINYINT UNSIGNED  NOT NULL,
  `velicina_42` TINYINT UNSIGNED  NOT NULL,
  `velicina_44` TINYINT UNSIGNED  NOT NULL,
  `velicina_46` TINYINT UNSIGNED  NOT NULL,
  `velicina_48` TINYINT UNSIGNED  NOT NULL,
  `velicina_50` TINYINT UNSIGNED  NOT NULL,
  PRIMARY KEY(prodavnica_id, patika_id),
  FOREIGN KEY(prodavnica_id) REFERENCES prodavnice(prodavnice_id),
  FOREIGN KEY(patika_id) REFERENCES patike(patike_id)
)

CREATE TABLE IF NOT EXISTS `user_type` (
  `user_type_id` TINYINT UNSIGNED UNIQUE NOT NULL AUTO_INCREMENT,
  `user_type_name` TINYTEXT UNIQUE NOT NULL,
  PRIMARY KEY(user_type_id)
)

INSERT INTO user_type(user_type_name) VALUES ("normal");
INSERT INTO user_type(user_type_name) VALUES ("admin");

CREATE TABLE IF NOT EXISTS `users` (
  `username` VARCHAR(30) UNIQUE NOT NULL,
  `password` TINYTEXT NOT NULL,
  `user_type_id` TINYINT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY(username),
  FOREIGN KEY(user_type_id) REFERENCES user_type(user_type_id)
)



INSERT INTO prodavnice(adresa_tekst, adresa_broj, grad_id)
VALUES ("Adresa", "5A", 2);

