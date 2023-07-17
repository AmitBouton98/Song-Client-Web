const api = "https://localhost:7281/api";

function register_user_to_server(user_obj) {
  ajaxCall(
    "post",
    `${api}/UserMusics`,
    JSON.stringify(user_obj),
    (response) => {
      Swal.fire({
        icon: "info",
        title: `Status code: ${response.status}`,
        text: `Server message: ${response}`,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    (resolve) => {
      // in time it retyrn 0 then goes here because of that we need to do theis
      Swal.fire({
        icon: "info",
        title: `Status code: ${resolve.status}`,
        text: `Server message: ${resolve}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  );
}

function upload_user_profile_pic(data) {
  for (const value of data.values()) {
    console.log(value);
  }
  $.ajax({
    type: "POST",
    url: `${api}/Upload`,
    contentType: false,
    processData: false,
    data: data,
    success: (suc) => {
      console.log(suc);
    },
    error: (error) => console.log(error),
  });
  return false;
}
function get_reset_permission(email, callbackfunction) {
  ajaxCall(
    "GET",
    `${api}/UserMusics/GetByemail/email/${email}`,
    null,
    (response) => {
      sessionStorage.setItem("user", JSON.stringify(response));
      setTimeout(() => {
        callbackfunction();
      }, 1600);
      Swal.fire({
        icon: "info",
        title: `Status code: ${response.status}`,
        text: `Server message: ${response}`,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    (resolve) => {
      // in time it retyrn 0 then goes here because of that we need to do theis
      Swal.fire({
        icon: "info",
        title: `Status code: ${resolve.status}`,
        text: `Server message: ${resolve}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  );
}
function change_user_password(uniquekey, email, password) {
  ajaxCall(
    "GET",
    `${api}/UserMusics/CheckIfKeyCorrect?key=${uniquekey}&email=${email}&password=${password}`,
    null,
    (response) => {
      sessionStorage.setItem("user", JSON.stringify(response));
      console.log(response);
      Swal.fire({
        icon: "success",
        title: `The password have been channged`,
        text: `you can user the new password now have a good day `,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    (resolve) => {
      // in time it retyrn 0 then goes here because of that we need to do theis
      Swal.fire({
        icon: "info",
        title: `Status code: ${resolve.status}`,
        text: `Server message: ${resolve}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  );
}
function loginUser(email, password) {
  ajaxCall(
    "GET",
    `${api}/UserMusics/CheckIfExists?email=${email}&password=${password}`,
    null,
    (response) => {
      sessionStorage.setItem("user", JSON.stringify(response));
      console.log(response);
      Swal.fire({
        icon: "success",
        title: `Correct info`,
        text: `have fun and enjoy your time in our website `,
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        window.location.replace("./home.html");
      }, 1500);
    },
    (resolve) => {
      // in time it retyrn 0 then goes here because of that we need to do theis
      Swal.fire({
        icon: "info",
        title: `Status code: ${resolve.status}`,
        text: `Server message: ${resolve}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  );
}
