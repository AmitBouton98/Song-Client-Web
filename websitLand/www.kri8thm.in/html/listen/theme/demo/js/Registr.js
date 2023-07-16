const regexList = {
  At_least_length_8_chars: new RegExp(".{8,}"),
  At_least_One_number: new RegExp("\\d"),
  At_least_One_small_latter: new RegExp(".*[a-z]"),
  At_least_One_capital_latter: new RegExp(".*[A-Z]"),
};

$(document).ready(() => {
  $("#password").on("input", function () {
    this.setCustomValidity("");
    // input the password text in the validator
    checkPasswordValidation($("#password").val());
  });
  $("#c_password").on("input", function () {
    this.setCustomValidity("");
    checkPasswordMatch();
  });
  // assign the submit funciton to the form
  $("#register-form").submit(function () {
    registerUser();
    return false;
  });
  // the eye for the passwords
  $(".fa-solid").on("click", function () {
    changeTheEye(this);
  });
});

function changeTheEye(elm) {
  if ($(`#${elm.getAttribute("data-eye")}`).attr("type") == "password") {
    $(`#${elm.getAttribute("data-eye")}`).attr("type", "text");
    elm.classList.remove("fa-eye");
    elm.classList.add("fa-eye-slash");
  } else {
    $(`#${elm.getAttribute("data-eye")}`).attr("type", "password");
    elm.classList.remove("fa-eye-slash");
    elm.classList.add("fa-eye");
  }
}
function checkPasswordMatch() {
  if ($("#c_password").val() == $("#password").val()) {
    document.getElementById("c_password").setCustomValidity("");
  } else {
    document.getElementById("c_password").setCustomValidity("Invalid field.");
  }
}
// get the current date as yyy-mm-dd
function getCurrentDate() {
  return new Date().toJSON().slice(0, 10);
}
//reister the user
function registerUser() {
  const file_flag = $("#profile_pic")[0].files.length > 0;
  // get the image file end extension image always !!
  const image_extension = file_flag
    ? $("#profile_pic")[0].files[0].name.split(".").pop()
    : "png";
  // the id and the image path is automatic generated
  const user_boj = {
    id: "-1",
    first: $("#firstName").val(),
    last: $("#lastName").val(),
    email: $("#email").val(),
    password: $("#password").val(),
    imgUrl: file_flag
      ? `${$("#email").val()}.${image_extension}`
      : `defualt.${image_extension}`,
    registrationDate: getCurrentDate(),
  };
  // send the user to the server
  register_user_to_server(user_boj);
  // send the picture of the user to the server
  if (file_flag) upload_image($("#email").val(), image_extension);
  //   location.replace("./home.html");
}

//upload the file to the server
function upload_image(userEmail, image_extension) {
  var data = new FormData();
  var file = $("#profile_pic").get(0).files[0];
  // Add the uploaded file to the form data collection
  if (file != undefined) {
    // it always will be one file for every user
    // the form data funciton give us the appilty to assign new name to the fiel
    data.append("file", file, `${userEmail}.${image_extension}`);
  }
  console.log(data);
  upload_user_profile_pic(data);
}

function checkPasswordValidation(text) {
  if (regexList["At_least_length_8_chars"].test(text)) {
    document.getElementById("password-pattern1").classList.remove("inValid");
    document.getElementById("password-pattern1").classList.add("Valid");
  } else {
    document.getElementById("password-pattern1").classList.remove("Valid");
    document.getElementById("password-pattern1").classList.add("inValid");
  }
  if (regexList["At_least_One_number"].test(text)) {
    document.getElementById("password-pattern2").classList.remove("inValid");
    document.getElementById("password-pattern2").classList.add("Valid");
  } else {
    document.getElementById("password-pattern2").classList.remove("Valid");
    document.getElementById("password-pattern2").classList.add("inValid");
  }
  if (regexList["At_least_One_small_latter"].test(text)) {
    document.getElementById("password-pattern3").classList.remove("inValid");
    document.getElementById("password-pattern3").classList.add("Valid");
  } else {
    document.getElementById("password-pattern3").classList.remove("Valid");
    document.getElementById("password-pattern3").classList.add("inValid");
  }
  if (regexList["At_least_One_capital_latter"].test(text)) {
    document.getElementById("password-pattern4").classList.remove("inValid");
    document.getElementById("password-pattern4").classList.add("Valid");
  } else {
    document.getElementById("password-pattern4").classList.remove("Valid");
    document.getElementById("password-pattern4").classList.add("inValid");
  }
}
