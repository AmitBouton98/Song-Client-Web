
function SendMessageContactPage() {
    $('#SendMessage').submit(SubmitMessage);
    return false;
}
const apiKey = "05956038F4AD3A3D3326E73C46C66134A7EAA277CB9BC2AABEE63A3EC0162C476ACCC28D8396D4178AF36AE2FA219D92"

function SubmitMessage(e) {
    const subject = "Get In Touch" + $("#f_name").val() + " " + $("#l_name").val()
    const sender = "amit.khaled.airbnb@gmail.com"
    const data = {
        apikey: apiKey,
        subject: subject,
        from: sender,
        to: 'amitbouton@gmail.com;kh7292000@gmail.com',
        bodyHtml:
            `
        <body>
            <div style="text-align: center;">
                <img src="https://media.discordapp.net/attachments/1092515523717234700/1130442483952795699/touch-icon-ipad-retina.png?width=208&height=208"
                    alt="">
                <h1 style="text-align: center;">Hello there I want to get in contact with your company</h1>
            </div>
            <p>My email is: <a href="mailto:${$("#mail").val()}">${$("#mail").val()}</a></p>
            <p>My number is : <a href="tel:+${$("#phone").val()}">${$("#phone").val()}</a></p>
            <p>${$("#message").val()}</p>
        </body>
        `,
        // bodyText: $("#message").val(),
        isTransactional: true
    }
    $("#mail").val("")
    $("#phone").val("")
    $("#f_name").val("")
    $("#l_name").val("")
    $("#message").val("")
    //https://elasticemail.com/developers/api-documentation/web-api-v2#Email_Send
    $.ajax({
        type: 'POST',
        url: `https://api.elasticemail.com/v2/email/send`, // The correct path to your server-side script
        data: data,
        dataType: 'json',
        success: function (response) {
            if (response.success) {
                Swal.fire({
                    icon: "success",
                    title: `Sended email successfully`,
                    text: `you have send email to the company developers thank you for contact us`,
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        },
        error: function () {
            // Handle any errors if the email could not be sent
            alert('An error occurred while sending the email.');
        }
    });

    return false;
}


