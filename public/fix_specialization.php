<?php
// Temporary fix script - DELETE THIS FILE AFTER RUNNING
require_once 'api/db.php';

try {
    $pdo->exec("ALTER TABLE trainers MODIFY COLUMN specialization varchar(255) DEFAULT ''");
    echo "SUCCESS: specialization column updated to optional.";
} catch (Exception $e) {
    echo "ERROR: " . $e->getMessage();
}
?>
