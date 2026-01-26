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

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $action === 'login') {
    $data = json_decode(file_get_contents("php://input"));
    
    if (!empty($data->email) && !empty($data->password)) {
        try {
            $stmt = $pdo->prepare("SELECT id, email, password_hash FROM users WHERE email = :email LIMIT 1");
            $stmt->execute([':email' => $data->email]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user && password_verify($data->password, $user['password_hash'])) {
                sendJson(['success' => true, 'message' => 'Login successful', 'user_id' => $user['id']]);
            } else {
                sendJson(['success' => false, 'message' => 'Invalid email or password'], 401);
            }
        } catch (Exception $e) {
            sendJson(['success' => false, 'message' => 'Database error'], 500);
        }
    } else {
        sendJson(['success' => false, 'message' => 'Incomplete data'], 400);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $action === 'register') {
    // Optional: Protect this endpoint or remove after creating initial admin
    $data = json_decode(file_get_contents("php://input"));

    if (!empty($data->email) && !empty($data->password)) {
        try {
            $passHash = password_hash($data->password, PASSWORD_BCRYPT);
            $stmt = $pdo->prepare("INSERT INTO users (email, password_hash) VALUES (:email, :pass)");
            $stmt->execute([':email' => $data->email, ':pass' => $passHash]);
            sendJson(['success' => true, 'message' => 'User registered']);
        } catch (Exception $e) {
             // 23000 is SQLSTATE for integrity constraint violation (e.g. duplicate email)
            if ($e->getCode() == 23000) {
                 sendJson(['success' => false, 'message' => 'Email already exists'], 409);
            }
            sendJson(['success' => false, 'message' => 'Registration failed'], 500);
        }
    } else {
        sendJson(['success' => false, 'message' => 'Incomplete data'], 400);
    }
}

sendJson(['success' => false, 'message' => 'Invalid action'], 400);
?>
