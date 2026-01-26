<?php
// public/api/db.php

// DB CREDENTIALS - CHANGE THESE BEFORE UPLOADING
$host = 'localhost';
$db   = 'u432363279_test';
$user = 'u432363279_admin';
$pass = 'Kineziterapija!2026Admin';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = array(
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
);

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(array('error' => 'Database connection failed: ' . $e->getMessage()));
    exit;
}

// Helpers
function sendJson($data, $code = 200) {
    http_response_code($code);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}
?>
