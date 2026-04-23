<?php
require_once 'db.php';

echo "<h2>Data diagnostika</h2>";
echo "<p>Data dir: " . $dataDir . "</p>";
echo "<p>Data dir exists: " . (is_dir($dataDir) ? 'YES' : 'NO') . "</p>";

$file = getJsonFile('trainers');
echo "<p>Trainers file path: " . $file . "</p>";
echo "<p>File exists: " . (file_exists($file) ? 'YES' : 'NO') . "</p>";

if (file_exists($file)) {
    $content = file_get_contents($file);
    echo "<p>File size: " . strlen($content) . " bytes</p>";
    echo "<p>First 200 chars: " . htmlspecialchars(substr($content, 0, 200)) . "</p>";
} else {
    echo "<p style='color:red'>File NOT found!</p>";

    // Show what's in the directory
    $parentDir = dirname($file);
    echo "<p>Parent dir: " . $parentDir . "</p>";
    echo "<p>Parent exists: " . (is_dir($parentDir) ? 'YES' : 'NO') . "</p>";

    if (is_dir($parentDir)) {
        echo "<p>Files in dir: " . implode(', ', scandir($parentDir)) . "</p>";
    }
}
?>
