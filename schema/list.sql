CREATE TABLE `list` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `type` enum('item','link','place','person') NOT NULL,
  `name` varchar(255) NOT NULL,
  `comment` text,
  `updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
