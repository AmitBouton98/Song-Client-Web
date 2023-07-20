<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Retrieve form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Compose the email message
    $to = "amitbouton@gmail.com"; // Replace with the recipient's email address
    $subject = "New Message from Website";
    $body = "Name: " . $name . "\n";
    $body .= "Email: " . $email . "\n";
    $body .= "Message: " . $message;

    // Set headers
    $headers = "From: sender@example.com"; // Replace with the sender's email address

    // Send the email
    if (mail($to, $subject, $body, $headers)) {
        // Return a success response to JavaScript
        echo json_encode(array('status' => 'success', 'message' => 'Email sent successfully.'));
    } else {
        // Return an error response to JavaScript
        echo json_encode(array('status' => 'error', 'message' => 'Failed to send email.'));
    }
}
?>
