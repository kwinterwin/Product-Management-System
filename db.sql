CREATE DATABASE `prms`;

CREATE TABLE `suppliers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `supplier_name` varchar(150) COLLATE utf8_bin NOT NULL,
  `tin` varchar(45) COLLATE utf8_bin NOT NULL,
  `checkpoint` varchar(45) COLLATE utf8_bin NOT NULL,
  `address` varchar(200) COLLATE utf8_bin NOT NULL,
  `surname` varchar(45) COLLATE utf8_bin NOT NULL,
  `name` varchar(45) COLLATE utf8_bin NOT NULL,
  `patronymic` varchar(45) COLLATE utf8_bin NOT NULL,
  `phone` varchar(45) COLLATE utf8_bin NOT NULL,
  `email` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `fax` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `user_logindata` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(45) COLLATE utf8_bin NOT NULL,
  `password` varchar(45) COLLATE utf8_bin NOT NULL,
  `role` varchar(10) COLLATE utf8_bin NOT NULL DEFAULT '"user"',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `users` (
  `info_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `surname` varchar(45) COLLATE utf8_bin NOT NULL,
  `name` varchar(45) COLLATE utf8_bin NOT NULL,
  `patronymic` varchar(45) COLLATE utf8_bin NOT NULL,
  `date_of_birth` date NOT NULL,
  `phone` varchar(45) COLLATE utf8_bin NOT NULL,
  `position` varchar(45) COLLATE utf8_bin NOT NULL,
  `photo` varchar(500) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`info_id`),
  KEY `user_id_key_idx` (`user_id`),
  CONSTRAINT `user_id_key` FOREIGN KEY (`user_id`) REFERENCES `user_logindata` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `goods_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) COLLATE utf8_bin NOT NULL,
  `parent` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

INSERT INTO `prms`.`goods_categories` (`name`) VALUES ('Одежда, обувь и аксессуары');
INSERT INTO `prms`.`goods_categories` (`name`) VALUES ('Товары для детей');
INSERT INTO `prms`.`goods_categories` (`name`) VALUES ('Все для дома');
INSERT INTO `prms`.`goods_categories` (`name`) VALUES ('Красота и здоровье');
INSERT INTO `prms`.`goods_categories` (`name`) VALUES ('Бытовая техника');
INSERT INTO `prms`.`goods_categories` (`name`) VALUES ('Компьютеры');
INSERT INTO `prms`.`goods_categories` (`name`) VALUES ('Спортивные товары');
INSERT INTO `prms`.`goods_categories` (`name`) VALUES ('Животные и растения');
INSERT INTO `prms`.`goods_categories` (`name`) VALUES ('Мебель');
INSERT INTO `prms`.`goods_categories` (`name`) VALUES ('Все для офиса');
INSERT INTO `prms`.`goods_categories` (`name`) VALUES ('Строительство и ремонт');
INSERT INTO `prms`.`goods_categories` (`name`) VALUES ('Телефоны');
INSERT INTO `prms`.`goods_categories` (`name`) VALUES ('Авто, мото');
INSERT INTO `prms`.`goods_categories` (`name`) VALUES ('Электроника и фото');
INSERT INTO `prms`.`goods_categories` (`name`) VALUES ('Книги');
INSERT INTO `prms`.`goods_categories` (`name`) VALUES ('Подарки, сувениры');

INSERT INTO `prms`.`goods_categories` (`name`, `parent`) VALUES ('Женская одежда', '1');
INSERT INTO `prms`.`goods_categories` (`name`, `parent`) VALUES ('Мужская одежда', '1');
INSERT INTO `prms`.`goods_categories` (`name`, `parent`) VALUES ('Женская обувь', '1');
INSERT INTO `prms`.`goods_categories` (`name`, `parent`) VALUES ('Мужская обувь', '1');

