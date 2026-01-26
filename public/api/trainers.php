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
    try {
        $stmt = $pdo->query("SELECT * FROM trainers ORDER BY order_index ASC, created_at DESC");
        $trainers = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($trainers);
    } catch (Exception $e) {
        sendJson(['error' => $e->getMessage()], 500);
    }
    exit;
}

// POST: Create or Update
if ($method === 'POST') {
    // Special action for toggling visibility (Partial Update)
    if (isset($_GET['action']) && $_GET['action'] === 'toggle_visibility') {
        $id = isset($_POST['id']) ? $_POST['id'] : null;
        $visible = isset($_POST['image_visible']) ? $_POST['image_visible'] : 1;
        
        if (!$id) {
            sendJson(['error' => 'No ID provided'], 400);
        }

        try {
            $stmt = $pdo->prepare("UPDATE trainers SET image_visible = :vis WHERE id = :id");
            $stmt->execute([':vis' => $visible, ':id' => $id]);
            sendJson(['success' => true, 'message' => 'Visibility updated']);
        } catch (Exception $e) {
             sendJson(['error' => $e->getMessage()], 500);
        }
        exit;
    }

    $id = isset($_POST['id']) ? $_POST['id'] : null;
    $name = isset($_POST['name']) ? $_POST['name'] : '';
    $specialization = isset($_POST['specialization']) ? $_POST['specialization'] : '';
    $description = isset($_POST['description']) ? $_POST['description'] : '';
    
    // New fields
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

    try {
        if ($id) {
            // Update
            $sql = "UPDATE trainers SET 
                name = :name, 
                specialization = :spec, 
                description = :desc, 
                education = :edu,
                location = :loc,
                phone = :phone,
                email = :email,
                motto = :motto,
                achievements = :ach,
                image_url = :img, 
                image_visible = :vis 
                WHERE id = :id";
            
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                ':name' => $name,
                ':spec' => $specialization,
                ':desc' => $description,
                ':edu' => $education,
                ':loc' => $location,
                ':phone' => $phone,
                ':email' => $email,
                ':motto' => $motto,
                ':ach' => $achievements,
                ':img' => $imageUrl,
                ':vis' => $imageVisible,
                ':id' => $id
            ]);
            sendJson(['success' => true, 'message' => 'Trainer updated']);
        } else {
            // Create
            $sql = "INSERT INTO trainers (name, specialization, description, education, location, phone, email, motto, achievements, image_url, image_visible) 
                    VALUES (:name, :spec, :desc, :edu, :loc, :phone, :email, :motto, :ach, :img, :vis)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                ':name' => $name,
                ':spec' => $specialization,
                ':desc' => $description,
                ':edu' => $education,
                ':loc' => $location,
                ':phone' => $phone,
                ':email' => $email,
                ':motto' => $motto,
                ':ach' => $achievements,
                ':img' => $imageUrl,
                ':vis' => $imageVisible
            ]);
            sendJson(['success' => true, 'message' => 'Trainer created', 'id' => $pdo->lastInsertId()]);
        }
    } catch (Exception $e) {
        sendJson(['error' => $e->getMessage()], 500);
    }
}

// DELETE: Remove trainer
if ($method === 'DELETE') {
    $id = isset($_GET['id']) ? $_GET['id'] : null;
    if (!$id) sendJson(['error' => 'No ID provided'], 400);

    try {
        $stmt = $pdo->prepare("DELETE FROM trainers WHERE id = :id");
        $stmt->execute([':id' => $id]);
        sendJson(['success' => true, 'message' => 'Trainer deleted']);
    } catch (Exception $e) {
        sendJson(['error' => $e->getMessage()], 500);
    }
}
?>
