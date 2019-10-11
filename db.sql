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

