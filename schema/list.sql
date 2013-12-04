DROP TABLE IF EXISTS `list`;
CREATE TABLE `list` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `type` enum('item','link','place','person') NOT NULL,
  `name` varchar(255) NOT NULL,
  `comment` text,
  `updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
);
