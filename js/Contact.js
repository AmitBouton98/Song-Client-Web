
function SendMessageContactPage() {
    $('#SendMessage').submit(SubmitMessage);
    return false;
}

function SubmitMessage(e) {
    e.preventDefault();

    $.ajax({
        type: 'POST',
        url: 'send_email.php', // The correct path to your server-side script
        data: $(this).serialize(),
        dataType: 'json',
        success: function (response) {
            // Display the response message (you can customize this part)
            alert(response.message);
        },
        error: function () {
            // Handle any errors if the email could not be sent
            alert('An error occurred while sending the email.');
        }
    });

    return false;
}
