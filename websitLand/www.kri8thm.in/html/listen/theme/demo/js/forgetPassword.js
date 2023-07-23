$(document).ready(function () {
  const user_info = JSON.parse(sessionStorage.getItem("User"));
  $("#user-email").text(user_info["email"]);
  $("#reset-password-form").submit(function () {
    resetPassword();
    return false;
  });
  $("#password").on("input", function () {
    this.setCustomValidity("");
    // input the password text in the validator
    checkPasswordValidation($("#password").val());
  });
  $("#c_password").on("input", function () {
    this.setCustomValidity("");
    checkPasswordMatch();
  });
  // tap to the next input
  $(".unique-digit").keyup(function () {
    if (this.value.length == this.maxLength) {
      $(this).next(".unique-digit").focus();
      $(this).next(".unique-digit").select();
    }
    $(".unique-digit").on("click", function () {
      this.select();
    });
  });
  // the eye for the passwords
  $(".fa-solid").on("click", function () {
    changeTheEye(this);
  });
});

function resetPassword() {
  let key_letters = "";
  const inputs = $(".unique-digit");
  for (var i = 0; i < inputs.length; i++) {
    key_letters += $(inputs[i]).val();
  }
  const user_info = JSON.parse(sessionStorage.getItem("User"));
  // call the change_user_password function from the server
  change_user_password(key_letters, user_info["email"], $("#password").val());
  //changed
  sessionStorage.removeItem("User");
  setTimeout(() => {
    window.location.replace("./login.html");
  }, 1500);
}
