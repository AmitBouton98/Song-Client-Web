$(document).ready(function () {
  const user_info = JSON.parse(sessionStorage.getItem("User"));
  if (user_info != undefined) {
    goToWebsite();
  }
  $("#forget-btn").on("click", function () {
    goToForgetCard();
  });
  $("#go-back-to-login").on("click", function () {
    goToLoginCrard();
  });
  // the eye for the passwords
  $(".fa-solid").on("click", function () {
    changeTheEye(this);
  });
  $("#Confirm-email-form").submit(function () {
    sendUniqueKey();
    return false;
  });
  $("#login-form").submit(function () {
    loginToSite();
    return false;
  });
});
function loginToSite() {
  const user_email = $("#email").val();
  const user_password = $("#password").val();
  loginUser(user_email, user_password);
}
function goToForgetCard() {
  document
    .getElementById("Confirm-email-form")
    .classList.replace("hide-card", "show-card");
  document
    .getElementById("login-card")
    .classList.replace("show-card", "hide-card");
}
function goToLoginCrard() {
  document
    .getElementById("Confirm-email-form")
    .classList.replace("show-card", "hide-card");
  document
    .getElementById("login-card")
    .classList.replace("hide-card", "show-card");
}
//sent the unique key for the user
function sendUniqueKey() {
  // get_User_reset_premiosn
  get_reset_permission($("#email-confirm").val(), goToChangePassword);
}

function goToChangePassword() {
  window.location.replace("./forgetPassword.html");
}

function goToWebsite() {
  window.location.replace("./home.html");
}
