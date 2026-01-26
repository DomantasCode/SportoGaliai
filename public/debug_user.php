<?php
// public/debug_user.php
require_once 'api/db.php';

echo "<h1>Debug User: info@sportogalia.lt</h1>";

$email = 'info@sportogalia.lt';
$testPass = 'admin123';

try {
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        echo "<p>User Found: <b>YES</b></p>";
        echo "<p>ID: " . $user['id'] . "</p>";
        echo "<p>Stored Hash: <code style='background:#eee;padding:2px'>" . $user['password_hash'] . "</code></p>";
        
        $match = password_verify($testPass, $user['password_hash']);
        
        if ($match) {
            echo "<h2 style='color:green'>PASSWORD MATCH: YES</h2>";
            echo "<p>The password <b>admin123</b> is CORRECT.</p>";
        } else {
            echo "<h2 style='color:red'>PASSWORD MATCH: NO</h2>";
            echo "<p>The password in DB does NOT match <b>admin123</b>.</p>";
            echo "<p>PHP Version: " . phpversion() . "</p>";
        }
    } else {
        echo "<h2 style='color:red'>User NOT found in database.</h2>";
    }

} catch (PDOException $e) {
    echo "DB Error: " . $e->getMessage();
}
?>
