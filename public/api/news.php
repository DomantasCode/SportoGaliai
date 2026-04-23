<?php
// public/api/news.php
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

// GET: List all news or single article
if ($method === 'GET') {
    $news = readData('news');

    // Single article by id
    if (isset($_GET['id'])) {
        $id = $_GET['id'];
        foreach ($news as $article) {
            if ($article['id'] == $id) {
                echo json_encode($article, JSON_UNESCAPED_UNICODE);
                exit;
            }
        }
        sendJson(array('error' => 'Article not found'), 404);
    }

    // Sort by date DESC
    usort($news, function($a, $b) {
        return strcmp(
            isset($b['date']) ? $b['date'] : '',
            isset($a['date']) ? $a['date'] : ''
        );
    });
    echo json_encode($news, JSON_UNESCAPED_UNICODE);
    exit;
}

// POST: Create or Update
if ($method === 'POST') {
    $news = readData('news');

    $id = isset($_POST['id']) ? $_POST['id'] : null;
    $title = isset($_POST['title']) ? $_POST['title'] : '';
    $date = isset($_POST['date']) ? $_POST['date'] : date('Y-m-d');
    $summary = isset($_POST['summary']) ? $_POST['summary'] : '';
    $content = isset($_POST['content']) ? $_POST['content'] : '';
    $published = isset($_POST['published']) ? (filter_var($_POST['published'], FILTER_VALIDATE_BOOLEAN) ? 1 : 0) : 1;

    // Handle hero image upload
    $heroImage = isset($_POST['existing_hero_image']) ? $_POST['existing_hero_image'] : '';
    if (isset($_FILES['hero_image']) && $_FILES['hero_image']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = '../uploads/news/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }
        $fileName = time() . '_hero_' . basename($_FILES['hero_image']['name']);
        $targetPath = $uploadDir . $fileName;
        if (move_uploaded_file($_FILES['hero_image']['tmp_name'], $targetPath)) {
            $heroImage = '/uploads/news/' . $fileName;
        }
    }

    // Handle gallery image uploads
    $gallery = array();
    if (isset($_POST['existing_gallery'])) {
        $gallery = json_decode($_POST['existing_gallery'], true);
        if (!is_array($gallery)) $gallery = array();
    }
    if (isset($_FILES['gallery_images'])) {
        $uploadDir = '../uploads/news/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }
        $fileCount = count($_FILES['gallery_images']['name']);
        for ($i = 0; $i < $fileCount; $i++) {
            if ($_FILES['gallery_images']['error'][$i] === UPLOAD_ERR_OK) {
                $fileName = time() . '_' . $i . '_' . basename($_FILES['gallery_images']['name'][$i]);
                $targetPath = $uploadDir . $fileName;
                if (move_uploaded_file($_FILES['gallery_images']['tmp_name'][$i], $targetPath)) {
                    $gallery[] = '/uploads/news/' . $fileName;
                }
            }
        }
    }

    $articleData = array(
        'title' => $title,
        'date' => $date,
        'summary' => $summary,
        'content' => $content,
        'hero_image' => $heroImage,
        'gallery' => $gallery,
        'published' => $published,
    );

    if ($id) {
        // Update
        $found = false;
        foreach ($news as &$a) {
            if ($a['id'] == $id) {
                $a = array_merge($a, $articleData);
                $found = true;
                break;
            }
        }
        unset($a);
        if ($found) {
            writeData('news', $news);
            sendJson(array('success' => true, 'message' => 'Article updated'));
        } else {
            sendJson(array('error' => 'Article not found'), 404);
        }
    } else {
        // Create
        $maxId = 0;
        foreach ($news as $a) {
            if (intval($a['id']) > $maxId) {
                $maxId = intval($a['id']);
            }
        }
        $articleData['id'] = strval($maxId + 1);
        $articleData['created_at'] = date('Y-m-d H:i:s');
        $news[] = $articleData;
        writeData('news', $news);
        sendJson(array('success' => true, 'message' => 'Article created', 'id' => $articleData['id']));
    }
    exit;
}

// DELETE
if ($method === 'DELETE') {
    $id = isset($_GET['id']) ? $_GET['id'] : null;
    if (!$id) sendJson(array('error' => 'No ID provided'), 400);

    $news = readData('news');
    $filtered = array();
    foreach ($news as $a) {
        if ($a['id'] != $id) {
            $filtered[] = $a;
        }
    }
    writeData('news', $filtered);
    sendJson(array('success' => true, 'message' => 'Article deleted'));
}
?>