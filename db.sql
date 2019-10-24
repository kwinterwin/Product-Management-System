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
  `role` varchar(10) COLLATE utf8_bin NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

INSERT INTO `prms`.`user_logindata` (`login`, `password`, `role`) VALUES ('admin', 'admin', 'admin');
INSERT INTO `prms`.`user_logindata` (`login`, `password`, `role`) VALUES ('user', 'user', 'user');

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

INSERT INTO `prms`.`users` (`user_id`, `surname`, `name`, `patronymic`, `date_of_birth`, `phone`, `position`) VALUES ('1', 'Adminov', 'Admin', 'Adminovich', '2018-05-05', '375297226164', 'admin');
INSERT INTO `prms`.`users` (`user_id`, `surname`, `name`, `patronymic`, `date_of_birth`, `phone`, `position`) VALUES ('2', 'Userov', 'User', 'Userovich', '2016-05-05', '375298696969', 'user');

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

INSERT INTO `prms`.`goods_categories` (`name`, `parent`) VALUES ('Коляски', '2');
INSERT INTO `prms`.`goods_categories` (`name`, `parent`) VALUES ('Автокресла', '2');
INSERT INTO `prms`.`goods_categories` (`name`, `parent`) VALUES ('Канцелярия', '10');
INSERT INTO `prms`.`goods_categories` (`name`, `parent`) VALUES ('Торшеры', '3');

CREATE TABLE `prms`.`goods` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `price` INT NOT NULL,
  `manuf_country` VARCHAR(55) NOT NULL,
  `articul` VARCHAR(45) NOT NULL,
  `category` INT NOT NULL,
  `barcode` VARCHAR(45) NOT NULL,
  `brand` VARCHAR(50) NOT NULL,
  `count` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `categories_id`
    FOREIGN KEY (`category`)
    REFERENCES `prms`.`goods_categories` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

    use prms;

INSERT INTO `goods` (`name`,`price`,`manuf_country`,`articul`,`barcode`,`brand`,`count`,`category`) VALUES ("Semper Dui Lectus Incorporated",972,"Zambia","P3R8S5065C07K","1621082747299","Gravida Aliquam Corp.",35,18),("Inceptos Hymenaeos Mauris Associates",162,"Hungary","N0Z1Q7704G74U","1683030648899","Ornare Egestas PC",12,5),("Nisi Sem Corp.",740,"Central African Republic","U9P1U0601F64R","1633092936999","Eleifend Egestas Limited",287,5),("Pretium Aliquet Metus Corp.",886,"Croatia","F7F5S7834X90S","1619050167799","Adipiscing Incorporated",70,22),("Urna Justo Limited",987,"Monaco","H7I1J9250V88Q","1603071184699","Quisque Ac PC",85,13),("Integer Urna Vivamus LLP",486,"Azerbaijan","D9A8T9668L21H","1654090404099","Sem Pellentesque Foundation",62,10),("Lorem Ltd",619,"Norway","M5Y6M2136H61J","1613040435799","Scelerisque Lorem Ipsum Consulting",176,11),("Ornare Sagittis Felis Corp.",295,"Azerbaijan","I8Y1V5209K09M","1621070168099","Amet Luctus Vulputate LLP",210,9),("Sodales At Consulting",841,"Costa Rica","K5Y2K8115I26C","1638101488399","Neque Tellus Imperdiet Incorporated",124,10),("Est Congue A Consulting",914,"Haiti","P8O4F2407G96C","1680091192299","Proin Eget Odio LLC",285,4);
INSERT INTO `goods` (`name`,`price`,`manuf_country`,`articul`,`barcode`,`brand`,`count`,`category`) VALUES ("Pellentesque Tellus Sem LLC",466,"Egypt","N2R0G0104W65G","1671050760599","Sagittis Augue Eu Associates",115,23),("Ligula Eu Enim LLP",692,"French Southern Territories","A9R9N7693E08I","1637091235299","Vitae Aliquet Nec Foundation",169,9),("Eu Eleifend Associates",166,"Malaysia","O9K0U9750U21P","1621021840799","Erat Limited",55,5),("Posuere Limited",515,"San Marino","S9K2D7610S78W","1607110329099","Aenean Massa Integer Industries",20,1),("Vitae Orci Incorporated",828,"Western Sahara","J9R7U4748L71S","1624030387599","Et Rutrum Corp.",227,12),("In Faucibus LLP",538,"Maldives","P2D9G6080W88E","1651031409799","Aliquam Nec Enim Industries",203,22),("Risus LLC",56,"Bhutan","I9H6V6158Q67T","1606090225999","Est LLP",248,14),("Integer Aliquam Associates",822,"Dominica","F0F1M7398E65Y","1667090698599","Phasellus Consulting",223,14),("Amet Faucibus Company",670,"Russian Federation","F4A0Y9828Y39A","1613013095599","Enim Non Nisi LLC",196,2),("Nibh Ltd",705,"Mozambique","J8Q4N7838U57V","1685020944099","Mattis Ornare Lectus Inc.",118,19);
INSERT INTO `goods` (`name`,`price`,`manuf_country`,`articul`,`barcode`,`brand`,`count`,`category`) VALUES ("Ipsum Ac Mi Ltd",905,"Maldives","Y5T5C3636M02H","1680020924699","Nec Urna Suscipit Ltd",88,4),("Mauris Industries",721,"Antigua and Barbuda","X5J1I4412A81W","1649092839399","Pharetra Quisque Consulting",102,9),("Lorem Fringilla Ornare Company",62,"Brazil","K4I9X0311G22S","1628090643599","Turpis Incorporated",159,5),("Et Ltd",382,"Andorra","C0Z9X7815E99P","1600101680199","Duis A Industries",178,8),("In Inc.",876,"Kenya","X2N6Y5836Z13A","1617052414299","Ligula Aenean Gravida Company",248,2),("Donec PC",946,"Nepal","X4B6F7132Q26D","1626082344199","Sem Magna Nec Company",49,15),("Quisque Libero Corporation",136,"Equatorial Guinea","Y5C7M6441L13S","1614081765299","Ornare Egestas Incorporated",19,3),("Lorem Eu Company",969,"Sweden","G2X0J9806J38Z","1689020389899","Magna A Tortor Limited",39,5),("Massa Suspendisse Industries",365,"Palau","M3S0O2476B81R","1692092368399","Dictum Company",175,24),("Sit Corporation",758,"Guernsey","R1V9T9586W77A","1690012819799","Sociis Natoque LLC",194,17);
INSERT INTO `goods` (`name`,`price`,`manuf_country`,`articul`,`barcode`,`brand`,`count`,`category`) VALUES ("Neque Non Quam Institute",778,"Congo (Brazzaville)","Y4P6N5294D41D","1623112232199","Ac Libero Nec Consulting",245,3),("Facilisis Company",97,"Micronesia","J4V8T7388B44V","1626021629299","Auctor Quis Tristique Ltd",280,9),("Dui Semper LLC",658,"Macedonia","H7F5E5605G24I","1678010982799","Neque Foundation",257,2),("Eu Lacus Quisque Ltd",315,"Benin","X5G9X5557P32L","1647042600199","Eu Odio Tristique Corp.",89,22),("Pede Suspendisse Dui Limited",541,"Liechtenstein","L6X5T7864P63D","1654010686599","Scelerisque Neque Foundation",17,15),("Sit Amet Limited",314,"Jamaica","V2U1G7077K52I","1631012069299","Pellentesque Tincidunt Incorporated",233,15),("Dolor Sit Associates",259,"Palau","Z2Q9J8539L33L","1600050948499","Urna Justo Associates",271,18),("Ultrices Duis Corp.",28,"Puerto Rico","O0R2X4438X84G","1676122769799","Nibh Vulputate Mauris Inc.",90,10),("Convallis Ante PC",155,"India","Q3Q7M8567M85C","1654111958999","Nisl Elementum Purus Corporation",140,24),("Facilisis Lorem LLC",179,"Laos","G1F1E2010Y34V","1647041028399","Id Sapien Consulting",78,6);
INSERT INTO `goods` (`name`,`price`,`manuf_country`,`articul`,`barcode`,`brand`,`count`,`category`) VALUES ("Consequat Consulting",362,"Laos","R9Y1V2060O90B","1651082240799","Erat Nonummy Corp.",89,3),("Euismod Mauris Eu Limited",12,"Tuvalu","F5F4R0326R53Z","1681030501199","Ut Nec Foundation",290,23),("Imperdiet Non Vestibulum Corporation",670,"Côte D'Ivoire (Ivory Coast)","V9A9O1561L63M","1661072174199","Lacus Foundation",288,1),("Sit Corporation",37,"Sint Maarten","K2Y9V6655H54O","1697020736599","Fusce Ltd",16,21),("Gravida Sagittis Consulting",203,"Czech Republic","T1T0F6114V48U","1636112249499","At Foundation",244,12),("Vestibulum Incorporated",834,"Venezuela","P9M7V4542A42W","1699051171499","Nunc Mauris Sapien Ltd",21,3),("Sem Elit Pharetra Industries",659,"Bosnia and Herzegovina","Z2D6N7071X57Y","1688050491399","Orci Associates",135,9),("In Molestie Limited",325,"Lithuania","J9A7Q6698C45W","1637061463199","Nibh Vulputate Mauris Associates",102,15),("Ante Ltd",189,"Zambia","G5C8R0053C45C","1647110509599","Phasellus Vitae Mauris Inc.",151,14),("Nam Tempor Diam Ltd",850,"Thailand","Z1C6C6165S38Q","1609110799999","Sociis Natoque PC",138,12);
INSERT INTO `goods` (`name`,`price`,`manuf_country`,`articul`,`barcode`,`brand`,`count`,`category`) VALUES ("Blandit At Nisi Ltd",120,"Chile","Z4I3X5727B48I","1600070965999","Vitae Foundation",146,14),("Lectus Ante Associates",182,"Belgium","A2K4E9263B27E","1637032143699","Cursus Corp.",212,17),("Nibh Donec Limited",63,"Jordan","W0L5C7909E54E","1652072931699","Curae; Inc.",97,17),("Vitae Purus Incorporated",496,"Trinidad and Tobago","X1S3H4969J64N","1606040287799","Tempor Diam Dictum Associates",55,15),("Ac Eleifend Vitae LLC",514,"Eritrea","H8X2Z5916X47X","1698012799599","Ac Arcu Associates",33,11),("Aliquet Libero Integer Company",226,"Kazakhstan","Q0J0P9360K32J","1662020447699","Mollis Corporation",133,13),("Felis Donec Tempor PC",24,"Djibouti","M8D6T9959W08C","1620091548199","Tincidunt Orci Quis Limited",195,4),("Sit Amet Corporation",403,"Japan","V2Y8I5905V93D","1668020979999","Auctor Velit Associates",68,24),("Integer Eu Consulting",555,"Djibouti","V2L3E4445D02W","1679112198599","Nunc Quisque Limited",219,18),("Morbi LLC",951,"Monaco","T5P7N2435I75J","1633122693299","Consectetuer Ipsum Nunc LLP",42,17);
INSERT INTO `goods` (`name`,`price`,`manuf_country`,`articul`,`barcode`,`brand`,`count`,`category`) VALUES ("Proin Company",811,"Sint Maarten","G7S9Q4020R79R","1627020899399","Facilisis Vitae Orci Associates",124,19),("Auctor LLP",410,"Switzerland","N5H1T7551S36S","1646121009299","In Cursus Et Company",272,13),("Imperdiet Erat Nonummy Industries",324,"Uzbekistan","W1U4X7748X09R","1668010142499","Lorem Donec Elementum Limited",16,23),("Odio LLC",574,"Moldova","V9N3N8477P81L","1667111316899","Lectus A Sollicitudin Institute",267,19),("Conubia Nostra PC",967,"United Arab Emirates","M6Z5P4840N58J","1603062138999","Morbi Sit Amet Company",40,17),("Facilisis Lorem Tristique Incorporated",712,"Uruguay","Y8R6X0367V24O","1633072839099","Diam Institute",230,23),("Metus Limited",899,"French Guiana","T3I2S6384P95K","1618042167299","Pharetra LLC",42,18),("Tempus Foundation",420,"Niger","G1O9S3233I64O","1669012554299","Ut Nec Inc.",38,24),("Nec LLP",506,"Ireland","V5G5Z9210D09O","1683050741999","Ac Metus Vitae PC",78,5),("Rutrum Lorem LLC",608,"Niue","M7I6C8587Y67H","1617111193899","Nisl Nulla Inc.",182,23);
INSERT INTO `goods` (`name`,`price`,`manuf_country`,`articul`,`barcode`,`brand`,`count`,`category`) VALUES ("Ornare Facilisis LLC",377,"Zimbabwe","U1B9K0948V61C","1632052832499","Nam Nulla Institute",286,18),("Morbi Accumsan Laoreet Incorporated",1000,"Paraguay","R2K9O3466L06C","1641031765699","Suspendisse Aliquet Associates",117,19),("Suscipit Est Ac LLC",361,"Iceland","U1E2Z5051A16A","1620042454999","Elementum Lorem Ut Associates",235,7),("Sem Eget Consulting",571,"Syria","S1D1Q6503I71W","1662072094299","Ipsum Corp.",211,9),("Ante Lectus Corporation",21,"Lesotho","F8K5I9356A40S","1632060948599","Scelerisque Associates",45,17),("Mus Proin Vel Industries",120,"Cayman Islands","V4Y5F9594M87O","1643080110499","Lacus Quisque Incorporated",270,21),("Eleifend Non Inc.",351,"Norway","K9O8X7025B02J","1694052886899","Aliquam Fringilla LLC",87,8),("Ligula Associates",626,"Kuwait","V0I6S9940M31P","1684031475699","Et Nunc Limited",185,12),("Augue Ut Lacus Consulting",935,"Belgium","R8I9D3293N50K","1693052189999","Ac Sem Ut Corporation",279,9),("Justo Eu Arcu Institute",746,"Cape Verde","A5C1Q1495L76N","1682052359999","Vulputate Dui Foundation",40,4);
INSERT INTO `goods` (`name`,`price`,`manuf_country`,`articul`,`barcode`,`brand`,`count`,`category`) VALUES ("Orci LLP",827,"United States","S7J3V1051X11T","1654040170299","Adipiscing LLC",186,24),("Donec LLP",929,"Laos","U5P3L5795E31K","1669042098399","Iaculis PC",295,10),("Eget Massa Suspendisse Industries",815,"Saudi Arabia","O8J7M8141C73E","1657110817299","Nunc Nulla Vulputate Company",246,21),("Semper Tellus Id Associates",996,"Mexico","N2L8A7428L44D","1620061501799","Natoque Penatibus Et Corp.",163,12),("Lorem Luctus Ut Inc.",937,"Tuvalu","B7Z8A6074O79F","1603021212399","Ultricies Adipiscing Corp.",40,14),("Arcu Vestibulum PC",849,"Malaysia","S4U5S8670V38G","1639101112599","Tortor Nunc LLP",259,7),("Arcu Nunc Mauris PC",740,"Guadeloupe","S1W2N4932O52K","1663070573699","Adipiscing Lobortis Corp.",261,5),("Magna Duis Company",907,"Pitcairn Islands","M4G5Y6423L11C","1616120579099","Pellentesque A Corp.",254,13),("Mollis PC",208,"Trinidad and Tobago","L5L3V5174E20F","1690020186699","Lobortis Tellus Justo LLC",197,4),("Dignissim Consulting",33,"Kyrgyzstan","C9B1Z7366I96M","1669022382099","Dis Limited",151,9);
INSERT INTO `goods` (`name`,`price`,`manuf_country`,`articul`,`barcode`,`brand`,`count`,`category`) VALUES ("Velit Sed Associates",405,"Macedonia","S3A7K7262E72F","1685111984699","Et Tristique Pellentesque Institute",241,8),("Ut LLP",673,"Kyrgyzstan","T5S9N9922V11B","1614112884499","Laoreet Lectus Institute",209,3),("Nullam Enim PC",915,"United Arab Emirates","O8O1F5054Y27R","1601022037099","Torquent Per Conubia PC",42,5),("Lobortis LLC",177,"Holy See (Vatican City State)","T0C5Y2153N69G","1628021746999","Nunc Quis Arcu Associates",295,3),("Nunc Sit Amet LLC",605,"Russian Federation","R3W5C5013T85I","1625060434299","Dignissim Tempor Associates",105,16),("Tempor Corporation",488,"French Guiana","H0J7B2548A13L","1678032615399","Sed Leo Inc.",59,5),("Non Industries",295,"Tanzania","U8N5E5254H67X","1602031767599","Lacinia Industries",281,22),("Faucibus Ut Nulla Institute",806,"Northern Mariana Islands","D7L0F3900M98E","1674072464899","Mi Eleifend Egestas Incorporated",269,9),("Orci In Corporation",615,"Jordan","Z6S3A5023N92Z","1684062317199","Id Industries",121,7),("Maecenas Iaculis Company",66,"New Caledonia","E0Q6Q7522X01L","1610021835299","Aliquam Limited",113,9);




CREATE TABLE `prms`.`proposals` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(300) NOT NULL,
  `user_id` INT NOT NULL,
  `category_id` INT NOT NULL,
  `count` INT NOT NULL,
  `supplier_id` INT NOT NULL,
  `date_registration` DATE NOT NULL,
  `date_approve` DATE NULL,
  `date_completed` DATE NULL,
  PRIMARY KEY (`id`),
  INDEX `categories_proposal_id_idx` (`category_id` ASC),
  INDEX `users_proposals_id_idx` (`user_id` ASC),
  INDEX `suppliers_proposals_id_idx` (`supplier_id` ASC),
  CONSTRAINT `categories_proposal_id`
    FOREIGN KEY (`category_id`)
    REFERENCES `prms`.`goods_categories` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `users_proposals_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `prms`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `suppliers_proposals_id`
    FOREIGN KEY (`supplier_id`)
    REFERENCES `prms`.`suppliers` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


ALTER TABLE `prms`.`proposals` 
ADD COLUMN `status` VARCHAR(45) NULL AFTER `date_completed`;


ALTER TABLE `prms`.`proposals` 
CHANGE COLUMN `status` `status` VARCHAR(45) NULL DEFAULT 'unreviewed' ;


ALTER TABLE `prms`.`proposals` 
CHANGE COLUMN `date_registration` `date_registration` DATETIME NOT NULL ,
CHANGE COLUMN `date_approve` `date_approve` DATETIME NULL DEFAULT NULL ,
CHANGE COLUMN `date_completed` `date_completed` DATETIME NULL DEFAULT NULL ;

ALTER TABLE `prms`.`user_logindata` 
CHANGE COLUMN `role` `role` VARCHAR(10) NOT NULL DEFAULT 'user' ;

ALTER TABLE `prms`.`goods` 
ADD COLUMN `supplier_id` INT NOT NULL AFTER `count`;

ALTER TABLE `prms`.`goods` 
ADD CONSTRAINT `s_id_key`
  FOREIGN KEY (`supplier_id`)
  REFERENCES `prms`.`suppliers` (`id`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

UPDATE `goods` SET `supplier_id` = 2 WHERE `id` = 1;
UPDATE `goods` SET `supplier_id` = 3 WHERE `id` = 2;
UPDATE `goods` SET `supplier_id` = 3 WHERE `id` = 3;
UPDATE `goods` SET `supplier_id` = 1 WHERE `id` = 4;
UPDATE `goods` SET `supplier_id` = 2 WHERE `id` = 5;
UPDATE `goods` SET `supplier_id` = 1 WHERE `id` = 6;
UPDATE `goods` SET `supplier_id` = 1 WHERE `id` = 7;
UPDATE `goods` SET `supplier_id` = 1 WHERE `id` = 8;
UPDATE `goods` SET `supplier_id` = 2 WHERE `id` = 9;
UPDATE `goods` SET `supplier_id` = 1 WHERE `id` = 10;
UPDATE `goods` SET `supplier_id` = 3 WHERE `id` = 11;
UPDATE `goods` SET `supplier_id` = 2 WHERE `id` = 12;
UPDATE `goods` SET `supplier_id` = 3 WHERE `id` = 13;
UPDATE `goods` SET `supplier_id` = 3 WHERE `id` = 14;
UPDATE `goods` SET `supplier_id` = 1 WHERE `id` = 15;
UPDATE `goods` SET `supplier_id` = 1 WHERE `id` = 16;
UPDATE `goods` SET `supplier_id` = 3 WHERE `id` = 17;
UPDATE `goods` SET `supplier_id` = 1 WHERE `id` = 18;
UPDATE `goods` SET `supplier_id` = 2 WHERE `id` = 19;
UPDATE `goods` SET `supplier_id` = 1 WHERE `id` = 20;
UPDATE `goods` SET `supplier_id` = 1 WHERE `id` = 21;
UPDATE `goods` SET `supplier_id` = 3 WHERE `id` = 22;
UPDATE `goods` SET `supplier_id` = 3 WHERE `id` = 23;
UPDATE `goods` SET `supplier_id` = 1 WHERE `id` = 24;
UPDATE `goods` SET `supplier_id` = 3 WHERE `id` = 25;
UPDATE `goods` SET `supplier_id` = 3 WHERE `id` = 26;
UPDATE `goods` SET `supplier_id` = 3 WHERE `id` = 27;
UPDATE `goods` SET `supplier_id` = 3 WHERE `id` = 28;
UPDATE `goods` SET `supplier_id` = 3 WHERE `id` = 29;
UPDATE `goods` SET `supplier_id` = 2 WHERE `id` = 30;
UPDATE `goods` SET `supplier_id` = 3 WHERE `id` = 31;
UPDATE `goods` SET `supplier_id` = 2 WHERE `id` = 32;
UPDATE `goods` SET `supplier_id` = 2 WHERE `id` = 33;
UPDATE `goods` SET `supplier_id` = 3 WHERE `id` = 34;
UPDATE `goods` SET `supplier_id` = 3 WHERE `id` = 35;
UPDATE `goods` SET `supplier_id` = 3 WHERE `id` = 36;
UPDATE `goods` SET `supplier_id` = 2 WHERE `id` = 37;
UPDATE `goods` SET `supplier_id` = 2 WHERE `id` = 38;
UPDATE `goods` SET `supplier_id` = 2 WHERE `id` = 39;
UPDATE `goods` SET `supplier_id` = 2 WHERE `id` = 40;
UPDATE `goods` SET `supplier_id` = 1 WHERE `id` = 41;
UPDATE `goods` SET `supplier_id` = 2 WHERE `id` = 42;
UPDATE `goods` SET `supplier_id` = 1 WHERE `id` = 43;
UPDATE `goods` SET `supplier_id` = 1 WHERE `id` = 44;
UPDATE `goods` SET `supplier_id` = 1 WHERE `id` = 45;
UPDATE `goods` SET `supplier_id` = 2 WHERE `id` = 46;
UPDATE `goods` SET `supplier_id` = 2 WHERE `id` = 47;
UPDATE `goods` SET `supplier_id` = 1 WHERE `id` = 48;
UPDATE `goods` SET `supplier_id` = 1 WHERE `id` = 49;
UPDATE `goods` SET `supplier_id` = 1 WHERE `id` = 50;
UPDATE `goods` SET `supplier_id` = 1 WHERE `id` = 51;
UPDATE `goods` SET `supplier_id` = 1 WHERE `id` = 52;
UPDATE `goods` SET `supplier_id` = 1 WHERE `id` = 53;
UPDATE `goods` SET `supplier_id` = 1 WHERE `id` = 54;
UPDATE `goods` SET `supplier_id` = 2 WHERE `id` = 55;
UPDATE `goods` SET `supplier_id` = 3 WHERE `id` = 56;
UPDATE `goods` SET `supplier_id` = 3 WHERE `id` = 57;
UPDATE `goods` SET `supplier_id` = 3 WHERE `id` = 58;
UPDATE `goods` SET `supplier_id` = 3 WHERE `id` = 59;
UPDATE `goods` SET `supplier_id` = 2 WHERE `id` = 60;
UPDATE `goods` SET `supplier_id` = 3 WHERE `id` = 61;
UPDATE `goods` SET `supplier_id` = 1 WHERE `id` = 62;
UPDATE `goods` SET `supplier_id` = 3 WHERE `id` = 63;
UPDATE `goods` SET `supplier_id` = 2 WHERE `id` = 64;
UPDATE `goods` SET `supplier_id` = 3 WHERE `id` = 65;
UPDATE `goods` SET `supplier_id` = 3 WHERE `id` = 66;
UPDATE `goods` SET `supplier_id` = 3 WHERE `id` = 67;
UPDATE `goods` SET `supplier_id` = 1 WHERE `id` = 68;
UPDATE `goods` SET `supplier_id` = 1 WHERE `id` = 69;
UPDATE `goods` SET `supplier_id` = 1 WHERE `id` = 70;
UPDATE `goods` SET `supplier_id` = 3 WHERE `id` = 71;
UPDATE `goods` SET `supplier_id` = 2 WHERE `id` = 72;
UPDATE `goods` SET `supplier_id` = 3 WHERE `id` = 73;
UPDATE `goods` SET `supplier_id` = 3 WHERE `id` = 74;
UPDATE `goods` SET `supplier_id` = 2 WHERE `id` = 75;
UPDATE `goods` SET `supplier_id` = 3 WHERE `id` = 76;
UPDATE `goods` SET `supplier_id` = 1 WHERE `id` = 77;
UPDATE `goods` SET `supplier_id` = 3 WHERE `id` = 78;
UPDATE `goods` SET `supplier_id` = 3 WHERE `id` = 79;
UPDATE `goods` SET `supplier_id` = 1 WHERE `id` = 80;
UPDATE `goods` SET `supplier_id` = 2 WHERE `id` = 81;
UPDATE `goods` SET `supplier_id` = 3 WHERE `id` = 82;
UPDATE `goods` SET `supplier_id` = 1 WHERE `id` = 83;
UPDATE `goods` SET `supplier_id` = 3 WHERE `id` = 84;
UPDATE `goods` SET `supplier_id` = 1 WHERE `id` = 85;
UPDATE `goods` SET `supplier_id` = 2 WHERE `id` = 86;
UPDATE `goods` SET `supplier_id` = 1 WHERE `id` = 87;
UPDATE `goods` SET `supplier_id` = 2 WHERE `id` = 88;
UPDATE `goods` SET `supplier_id` = 3 WHERE `id` = 89;
UPDATE `goods` SET `supplier_id` = 3 WHERE `id` = 90;
UPDATE `goods` SET `supplier_id` = 3 WHERE `id` = 91;
UPDATE `goods` SET `supplier_id` = 2 WHERE `id` = 92;
UPDATE `goods` SET `supplier_id` = 2 WHERE `id` = 93;
UPDATE `goods` SET `supplier_id` = 1 WHERE `id` = 94;
UPDATE `goods` SET `supplier_id` = 1 WHERE `id` = 95;
UPDATE `goods` SET `supplier_id` = 3 WHERE `id` = 96;
UPDATE `goods` SET `supplier_id` = 3 WHERE `id` = 97;
UPDATE `goods` SET `supplier_id` = 1 WHERE `id` = 98;
UPDATE `goods` SET `supplier_id` = 1 WHERE `id` = 99;
UPDATE `goods` SET `supplier_id` = 1 WHERE `id` = 100;

