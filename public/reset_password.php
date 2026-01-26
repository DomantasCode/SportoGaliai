<?php
// public/reset_password.php
require_once 'api/db.php';

echo "<h1>Admin Password Reset</h1>";

$email = 'info@sportogalia.lt';
$newPassword = 'SportoGalia!2026';

try {
    // 1. Generate fresh hash using Server's PHP
    $newHash = password_hash($newPassword, PASSWORD_BCRYPT);

    // 2. Check if user exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user) {
        // Update existing
        $update = $pdo->prepare("UPDATE users SET password_hash = ? WHERE email = ?");
        $update->execute([$newHash, $email]);
        echo "<p style='color:green'>✓ Password for <b>$email</b> has been reset to: <b>$newPassword</b></p>";
    } else {
        // Create if missing
        $insert = $pdo->prepare("INSERT INTO users (email, password_hash) VALUES (?, ?)");
        $insert->execute([$email, $newHash]);
        echo "<p style='color:green'>✓ User <b>$email</b> was missing, so I created it with password: <b>$newPassword</b></p>";
    }

    echo "<h3>Try logging in now!</h3>";
    echo "<p>Login: <a href='/admin'>/admin</a></p>";
    echo "<p style='color:red'><strong>IMPORTANT: Please delete 'reset_password.php' after it works!</strong></p>";

} catch (PDOException $e) {
    echo "<p style='color:red'>Error: " . $e->getMessage() . "</p>";
}
?>
