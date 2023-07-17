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
function get_reset_permission(email) {
  ajaxCall(
    "post",
    `${api}/UserMusics`,
    JSON.stringify(user_obj),
    (response) => {
      sessionStorage.setItem("user", JSON.stringify(response));
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
