<?php
echo "<h2>DB Diagnostika</h2>";
echo "<p>PHP versija: " . phpversion() . "</p>";

// Bandome su senais Hostinger duomenimis
$tests = array(
    array('host' => 'localhost', 'db' => 'u432363279_test', 'user' => 'u432363279_admin', 'pass' => 'Kineziterapija!2026Admin'),
    array('host' => 'localhost', 'db' => 'webdesign_sportogalia', 'user' => 'webdesign_usg', 'pass' => 'K2h9zzBcFAD9hqG3'),
);

foreach ($tests as $i => $t) {
    echo "<h3>Bandymas " . ($i+1) . ": " . $t['user'] . "@" . $t['host'] . " / " . $t['db'] . "</h3>";
    try {
        $pdo = new PDO("mysql:host=" . $t['host'] . ";dbname=" . $t['db'] . ";charset=utf8mb4", $t['user'], $t['pass']);
        echo "<p style='color:green'>VEIKIA!</p>";
        $tables = $pdo->query("SHOW TABLES")->fetchAll();
        echo "<ul>";
        foreach ($tables as $row) { echo "<li>" . array_values($row)[0] . "</li>"; }
        echo "</ul>";
    } catch (Exception $e) {
        echo "<p style='color:red'>NEVEIKIA: " . $e->getMessage() . "</p>";
    }
}

// Parodom visas prieinamas DB
echo "<h3>Visos prieinamos duomenu bazes:</h3>";
try {
    $pdo = new PDO("mysql:host=localhost", 'webdesign_usg', 'K2h9zzBcFAD9hqG3');
    $dbs = $pdo->query("SHOW DATABASES")->fetchAll();
    foreach ($dbs as $d) { echo "<p>" . array_values($d)[0] . "</p>"; }
} catch (Exception $e) {
    echo "<p style='color:red'>" . $e->getMessage() . "</p>";
}
?>
