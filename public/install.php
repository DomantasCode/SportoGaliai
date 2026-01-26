<?php
// public/install.php
require_once 'api/db.php';

echo "<h1>Database Installation</h1>";

try {
    // 1. Create Users Table
    $usersSql = "CREATE TABLE IF NOT EXISTS `users` (
      `id` int(11) NOT NULL AUTO_INCREMENT,
      `email` varchar(255) NOT NULL,
      `password_hash` varchar(255) NOT NULL,
      `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (`id`),
      UNIQUE KEY `email` (`email`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
    
    $pdo->exec($usersSql);
    echo "<p style='color:green'>✓ Table 'users' created or verified.</p>";

    // 2. Create Trainers Table
    $trainersSql = "CREATE TABLE IF NOT EXISTS `trainers` (
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
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

    $pdo->exec($trainersSql);
    echo "<p style='color:green'>✓ Table 'trainers' created or verified.</p>";

    // 3. Insert Admin User
    $adminEmail = 'admin@sportogalia.lt';
    $adminPass = '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'; // password: admin123
    
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$adminEmail]);
    
    if (!$stmt->fetch()) {
        $insertStmt = $pdo->prepare("INSERT INTO users (email, password_hash) VALUES (?, ?)");
        $insertStmt->execute([$adminEmail, $adminPass]);
        echo "<p style='color:green'>✓ Admin user created (admin@sportogalia.lt / admin123).</p>";
    } else {
        echo "<p style='color:orange'>! Admin user already exists.</p>";
    }

    echo "<h3>Installation Complete!</h3>";
    echo "<p style='color:red'><strong>IMPORTANT: Please delete this file (install.php) from your server now via FTP for security.</strong></p>";

} catch (PDOException $e) {
    echo "<p style='color:red'>Error: " . $e->getMessage() . "</p>";
}
?>
