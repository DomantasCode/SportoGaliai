<?php
// public/api/auth.php
require_once 'db.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$action = isset($_GET['action']) ? $_GET['action'] : '';

// Initialize default admin if no users exist
$users = readData('users');
if (empty($users)) {
    $users[] = array(
        'id' => '1',
        'email' => 'info@sportogalia.lt',
        'password_hash' => password_hash('SportoGalia!2026', PASSWORD_BCRYPT)
    );
    writeData('users', $users);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $action === 'login') {
    $data = json_decode(file_get_contents("php://input"));

    if (!empty($data->email) && !empty($data->password)) {
        $users = readData('users');
        $found = null;
        foreach ($users as $u) {
            if ($u['email'] === $data->email) {
                $found = $u;
                break;
            }
        }

        if ($found && password_verify($data->password, $found['password_hash'])) {
            sendJson(array('success' => true, 'message' => 'Login successful', 'user_id' => $found['id']));
        } else {
            sendJson(array('success' => false, 'message' => 'Invalid email or password'), 401);
        }
    } else {
        sendJson(array('success' => false, 'message' => 'Incomplete data'), 400);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $action === 'register') {
    $data = json_decode(file_get_contents("php://input"));

    if (!empty($data->email) && !empty($data->password)) {
        $users = readData('users');

        // Check if email exists
        foreach ($users as $u) {
            if ($u['email'] === $data->email) {
                sendJson(array('success' => false, 'message' => 'Email already exists'), 409);
            }
        }

        $maxId = 0;
        foreach ($users as $u) {
            if (intval($u['id']) > $maxId) $maxId = intval($u['id']);
        }

        $users[] = array(
            'id' => strval($maxId + 1),
            'email' => $data->email,
            'password_hash' => password_hash($data->password, PASSWORD_BCRYPT)
        );
        writeData('users', $users);
        sendJson(array('success' => true, 'message' => 'User registered'));
    } else {
        sendJson(array('success' => false, 'message' => 'Incomplete data'), 400);
    }
}

sendJson(array('success' => false, 'message' => 'Invalid action'), 400);
?>
