<?php
// public/api/db.php
// JSON file-based storage (no MySQL needed)

$dataDir = dirname(__FILE__) . '/data';
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0755, true);
}

function getJsonFile($name) {
    global $dataDir;
    return $dataDir . '/' . $name . '.json';
}

function readData($name) {
    $file = getJsonFile($name);
    if (!file_exists($file)) {
        return array();
    }
    $json = file_get_contents($file);
    // Remove UTF-8 BOM if present
    $json = preg_replace('/^\xEF\xBB\xBF/', '', $json);
    $data = json_decode($json, true);
    if ($data === null && strlen($json) > 2) {
        // Try to fix encoding
        $json = mb_convert_encoding($json, 'UTF-8', 'auto');
        $data = json_decode($json, true);
    }
    return is_array($data) ? $data : array();
}

function writeData($name, $data) {
    $file = getJsonFile($name);
    file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

function sendJson($data, $code = 200) {
    http_response_code($code);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}
?>
