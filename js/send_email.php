<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Retrieve form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Include PHPMailer and its dependencies
    require 'path/to/PHPMailerAutoload.php';

    // Create a new PHPMailer instance
    $mail = new PHPMailer;

    // Enable SMTP
    $mail->isSMTP();

    // Set the SMTP host and port
    $mail->Host = 'smtp.elasticemail.com';
    $mail->Port = 587;

    // Set SMTP authentication
    $mail->SMTPAuth = true;
    $mail->Username = 'amit.khaled.airbnb@gmail.com'; // Replace with the sender's email address
    $mail->Password = '6BA88EB97CC6AE035885DC0CD3A95BB30CC8'; // Replace with the sender's email password

    // Set the sender and recipient
    $mail->setFrom('amit.khaled.airbnb@gmail.com', 'Sender Name');
    $mail->addAddress('amitbouton@gmail.com', 'Recipient Name'); // Replace with the recipient's email address and name

    // Set the email subject and body
    $mail->Subject = 'New Message from Website';
    $mail->Body = "Name: $name\n";
    $mail->Body .= "Email: $email\n";
    $mail->Body .= "Message: $message";

    // Send the email
    if ($mail->send()) {
        // Return a success response to JavaScript
        echo json_encode(array('status' => 'success', 'message' => 'Email sent successfully.'));
    } else {
        // Return an error response to JavaScript
        echo json_encode(array('status' => 'error', 'message' => 'Failed to send email. Error: ' . $mail->ErrorInfo));
    }
}
?>
