<?php
// public/api/trainers.php
require_once 'db.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// GET: List all trainers
if ($method === 'GET') {
    $trainers = readData('trainers');
    // Sort by order_index ASC, then created_at DESC
    usort($trainers, function($a, $b) {
        $oi = intval(isset($a['order_index']) ? $a['order_index'] : 0) - intval(isset($b['order_index']) ? $b['order_index'] : 0);
        if ($oi !== 0) return $oi;
        return strcmp(isset($b['created_at']) ? $b['created_at'] : '', isset($a['created_at']) ? $a['created_at'] : '');
    });
    echo json_encode($trainers, JSON_UNESCAPED_UNICODE);
    exit;
}

// POST: Create or Update
if ($method === 'POST') {
    $trainers = readData('trainers');

    // Toggle visibility action
    if (isset($_GET['action']) && $_GET['action'] === 'toggle_visibility') {
        $id = isset($_POST['id']) ? $_POST['id'] : null;
        $visible = isset($_POST['image_visible']) ? $_POST['image_visible'] : 1;

        if (!$id) {
            sendJson(array('error' => 'No ID provided'), 400);
        }

        foreach ($trainers as &$t) {
            if ($t['id'] == $id) {
                $t['image_visible'] = $visible;
                break;
            }
        }
        unset($t);
        writeData('trainers', $trainers);
        sendJson(array('success' => true, 'message' => 'Visibility updated'));
        exit;
    }

    $id = isset($_POST['id']) ? $_POST['id'] : null;
    $name = isset($_POST['name']) ? $_POST['name'] : '';
    $specialization = isset($_POST['specialization']) ? $_POST['specialization'] : '';
    $description = isset($_POST['description']) ? $_POST['description'] : '';
    $education = isset($_POST['education']) ? $_POST['education'] : '';
    $location = isset($_POST['location']) ? $_POST['location'] : '';
    $phone = isset($_POST['phone']) ? $_POST['phone'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $motto = isset($_POST['motto']) ? $_POST['motto'] : '';
    $achievements = isset($_POST['achievements']) ? $_POST['achievements'] : '';
    $imageVisible = isset($_POST['image_visible']) ? (filter_var($_POST['image_visible'], FILTER_VALIDATE_BOOLEAN) ? 1 : 0) : 1;
    $imageUrl = isset($_POST['existing_image']) ? $_POST['existing_image'] : '';

    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = '../uploads/trainers/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $fileName = time() . '_' . basename($_FILES['image']['name']);
        $targetPath = $uploadDir . $fileName;

        if (move_uploaded_file($_FILES['image']['tmp_name'], $targetPath)) {
            $imageUrl = '/uploads/trainers/' . $fileName;
        }
    }

    $trainerData = array(
        'name' => $name,
        'specialization' => $specialization,
        'description' => $description,
        'education' => $education,
        'location' => $location,
        'phone' => $phone,
        'email' => $email,
        'motto' => $motto,
        'achievements' => $achievements,
        'image_url' => $imageUrl,
        'image_visible' => $imageVisible
    );

    if ($id) {
        // Update
        $found = false;
        foreach ($trainers as &$t) {
            if ($t['id'] == $id) {
                $t = array_merge($t, $trainerData);
                $found = true;
                break;
            }
        }
        unset($t);
        if ($found) {
            writeData('trainers', $trainers);
            sendJson(array('success' => true, 'message' => 'Trainer updated'));
        } else {
            sendJson(array('error' => 'Trainer not found'), 404);
        }
    } else {
        // Create - generate new ID
        $maxId = 0;
        foreach ($trainers as $t) {
            if (intval($t['id']) > $maxId) {
                $maxId = intval($t['id']);
            }
        }
        $trainerData['id'] = strval($maxId + 1);
        $trainerData['order_index'] = 0;
        $trainerData['created_at'] = date('Y-m-d H:i:s');
        $trainers[] = $trainerData;
        writeData('trainers', $trainers);
        sendJson(array('success' => true, 'message' => 'Trainer created', 'id' => $trainerData['id']));
    }
    exit;
}

// DELETE: Remove trainer
if ($method === 'DELETE') {
    $id = isset($_GET['id']) ? $_GET['id'] : null;
    if (!$id) sendJson(array('error' => 'No ID provided'), 400);

    $trainers = readData('trainers');
    $filtered = array();
    foreach ($trainers as $t) {
        if ($t['id'] != $id) {
            $filtered[] = $t;
        }
    }
    writeData('trainers', $filtered);
    sendJson(array('success' => true, 'message' => 'Trainer deleted'));
}
?>
