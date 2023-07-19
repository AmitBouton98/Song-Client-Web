// gloabal before this js
$(document).ready(function () {
  const user_info = JSON.parse(sessionStorage.getItem("User"));
  if (user_info == undefined) {
    window.location.replace("./login.html");
  }
  getProfileImage(user_info.imgUrl, $(".user-image"));
  $("#password").on("input", function () {
    this.setCustomValidity("");
    // input the password text in the validator
    checkPasswordValidation($("#password").val());
  });

  $("#logout-btn").on("click", logOut);
  // the eye for the passwords
  $(".fa-solid").on("click", function () {
    changeTheEye(this);
  });
});

function LoadProfile() {
  var data = JSON.parse(sessionStorage.getItem("User"));
  LoadProfileDetails(data);
}

function LoadProfileDetails(data) {
  $("#firstName").val(data.first);
  $("#lastName").val(data.last);

  let SaveProfileDetails = document.getElementById("SaveProfileDetails");
  SaveProfileDetails.onclick = () => {
    updateINFO;
  };
  $("#change_user_data_form").submit(function () {
    updateINFO(data);
    return false;
  });
}

function updateINFO(user_old_info) {
  const file_flag = $("#profile_pic")[0].files.length > 0;
  const password_flag = $("#password").val().length > 0;
  // get the image file end extension image always !!
  const image_extension = file_flag
    ? $("#profile_pic")[0].files[0].name.split(".").pop()
    : "png";
  // the id and the image path is automatic generated
  const user_obj = {
    id: user_old_info.id,
    first: $("#firstName").val(),
    last: $("#lastName").val(),
    email: user_old_info.email,
    password: "dose not matter",
    imgUrl: file_flag
      ? `${user_old_info.email}.${image_extension}`
      : user_old_info.imgUrl, // updated now
    registrationDate: getCurrentDate(),
  };
  // send the user to the server
  update_user_to_server(user_obj);
  // send the picture of the user to the server
  if (file_flag) upload_image(user_old_info.email, image_extension);

  //update user_password
  if (password_flag) {
    ChangePassowrdForUser(
      user_old_info.id,
      $("#old_password").val(),
      $("#password").val()
    );
  }
  sessionStorage.removeItem("User");
  sessionStorage.setItem("User", JSON.stringify(user_obj));
}
