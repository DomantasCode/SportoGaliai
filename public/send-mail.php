<?php
// send-mail.php

// Start output buffering to catch any unwanted output/warnings
ob_start();

// Prevent HTML errors from breaking JSON response
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

// Helper to send JSON response
function sendResponse($success, $message) {
    // Clear any previous output (HTML, warnings, whitespace)
    if (ob_get_length()) ob_clean();
    header("Content-Type: application/json; charset=UTF-8");
    // PHP 5.3 compatibility: Use array() instead of []
    echo json_encode(array('success' => $success, 'message' => $message));
    exit;
}

// Allow CORS (Adjust allowed origin in production for better security)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Handle only POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, 'Neteisingas užklausos metodas.');
}

// Read JSON input
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    sendResponse(false, 'Negauta duomenų.');
}

// Extract and sanitize fields
// PHP 5.6 compatibility: Replaced null coalescing operator (??) with ternary check
$name = htmlspecialchars(strip_tags(isset($input['name']) ? $input['name'] : ''));
$phone = htmlspecialchars(strip_tags(isset($input['phone']) ? $input['phone'] : ''));
$email = filter_var(isset($input['email']) ? $input['email'] : '', FILTER_SANITIZE_EMAIL);
$message = htmlspecialchars(strip_tags(isset($input['message']) ? $input['message'] : ''));

// Validation
if (empty($name) || empty($phone) || empty($email) || empty($message)) {
    sendResponse(false, 'Prašome užpildyti visus laukelius.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    sendResponse(false, 'Neteisingas el. pašto formatas.');
}

// Configuration
$to = 'info@sportogalia.lt, vilte@sportogalia.lt'; // Updated recipients
$subject = "Nauja žinutė nuo: $name";
$headers = "From: noreply@sportogalia.lt\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$email_content = "Vardas: $name\n";
$email_content .= "Telefonas: $phone\n";
$email_content .= "El. paštas: $email\n\n";
$email_content .= "Žinutė:\n$message\n";

// Send Email
if (mail($to, $subject, $email_content, $headers)) {
    sendResponse(true, 'Žinutė sėkmingai išsiųsta!');
} else {
    // Log error if possible
    error_log("Mail sending failed for: $email");
    sendResponse(false, 'Nepavyko išsiųsti žinutės. Bandykite vėliau.');
}
?>
