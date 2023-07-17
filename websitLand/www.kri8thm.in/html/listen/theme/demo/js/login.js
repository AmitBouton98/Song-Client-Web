$(document).ready(function () {
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
});

function goToForgetCard() {
  document
    .getElementById("Confirm-email")
    .classList.replace("hide-card", "show-card");
  document
    .getElementById("login-card")
    .classList.replace("show-card", "hide-card");
}
function goToLoginCrard() {
  document
    .getElementById("Confirm-email")
    .classList.replace("show-card", "hide-card");
  document
    .getElementById("login-card")
    .classList.replace("hide-card", "show-card");
}
//sent the unique key for the user
function sendUniqueKey() {
  // sesseion storage user
  const user_email = document.getElementById("email-confirm").innerText;
  sessionStorage.setItem("user_email", user_email);
  // get_User_reset_premiosn
}
