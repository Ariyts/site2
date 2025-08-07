<?php
// Проверяем, что запрос пришел методом POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // --- НАСТРОЙКИ ---
    $to = "goskripko@gmail.com"; // Ваш email, куда придет письмо
    $from = "no-reply@vash-domen.ru"; // Email, с которого будет отправлено письмо. ЗАМЕНИТЕ НА СВОЙ!
    $subject = "Новая заявка на консультацию с сайта";
    // --- КОНЕЦ НАСТРОЕК ---

    // Собираем данные из формы и очищаем их от лишних пробелов и тегов
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $phone = htmlspecialchars(trim($_POST['phone']));
    $topic = htmlspecialchars(trim($_POST['topic']));
    $company = !empty($_POST['company']) ? htmlspecialchars(trim($_POST['company'])) : "Не указана";
    $comment = !empty($_POST['comment']) ? htmlspecialchars(trim($_POST['comment'])) : "Нет комментария";

    // Простая серверная валидация на случай, если JS не сработает
    if (empty($name) || empty($phone) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header('Content-Type: application/json');
        http_response_code(400); // Bad Request
        echo json_encode(['status' => 'error', 'message' => 'Пожалуйста, заполните все обязательные поля.']);
        exit;
    }

    // Составляем тело письма в красивом HTML-формате
    $message = "
    <html>
    <head>
        <title>{$subject}</title>
    </head>
    <body style='font-family: Arial, sans-serif; font-size: 14px; color: #333;'>
        <h2>{$subject}</h2>
        <p><strong>Имя:</strong> {$name}</p>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Телефон:</strong> {$phone}</p>
        <p><strong>Тема обращения:</strong> {$topic}</p>
        <p><strong>Компания:</strong> {$company}</p>
        <p><strong>Комментарий:</strong><br>{$comment}</p>
    </body>
    </html>
    ";

    // Устанавливаем заголовки для отправки HTML-письма с правильной кодировкой
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: Web-форма сайта <" . $from . ">" . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";

    // Отправляем письмо
    if (mail($to, $subject, $message, $headers)) {
        // Если отправка успешна, возвращаем success
        header('Content-Type: application/json');
        echo json_encode(['status' => 'success']);
    } else {
        // Если произошла ошибка, возвращаем error
        header('Content-Type: application/json');
        http_response_code(500); // Internal Server Error
        echo json_encode(['status' => 'error', 'message' => 'Ошибка сервера при отправке письма.']);
    }

} else {
    // Если кто-то пытается зайти на скрипт напрямую через браузер
    die('Доступ запрещен.');
}
?>