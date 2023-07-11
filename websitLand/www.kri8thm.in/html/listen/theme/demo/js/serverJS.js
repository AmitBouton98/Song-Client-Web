api = "";
//  just copyed
function registerUser(callback) {
  NewUser = {
    first: $("#FirstRegister").val(),
    last: $("#LastRegister").val(),
    id: "",
    country: $("#CountryRegister").val(),
    email: $("#EmailRegister").val(),
    password: $("#PasswordRegister").val(),
    PhoneNumber: $("#PhoneRegister").val(),
    Profile_img: radios,
  };
  ajaxCall(
    "POST",
    `${api}/WebUsers`,
    JSON.stringify(NewUser),
    function (data) {
      swal.fire("Registered to the server!", "Great Job", "success");
      setTimeout(function () {
        signInUser(data);
        //signInUser(NewUser);
      }, 1500); // 1.5 seconds delay
      callback(data);
    },
    errorRG
  );
  // to prevent refreshing the page evrey time
  return false;
}
