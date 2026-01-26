-- SportoGalia CMS Database Schema

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `trainers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `specialization` varchar(255) NOT NULL,
  `description` text,
  `education` varchar(255) DEFAULT '',
  `location` varchar(255) DEFAULT '',
  `phone` varchar(50) DEFAULT '',
  `email` varchar(255) DEFAULT '',
  `motto` text,
  `achievements` text,
  `image_url` varchar(255) DEFAULT NULL,
  `image_visible` tinyint(1) NOT NULL DEFAULT '1',
  `order_index` int(11) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Initial Admin User (Password: admin123)
INSERT INTO `users` (`email`, `password_hash`) VALUES
('admin@sportogalia.lt', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi')
ON DUPLICATE KEY UPDATE `id`=`id`;
