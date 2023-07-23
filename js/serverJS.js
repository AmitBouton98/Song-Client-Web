// const api = "https://localhost:7281/api";

function register_user_to_server(user_obj) {
  ajaxCall(
    "post",
    `${api}/UserMusics`,
    JSON.stringify(user_obj),
    (response) => {
      Swal.fire({
        icon: "info",
        title: `Status code: ${response.status}`,
        text: `Server message: ${response.responseText}`,
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        window.location.replace("./login.html");
      }, 1500);
    },
    (resolve) => {
      // in time it retyrn 0 then goes here because of that we need to do theis
      Swal.fire({
        icon: "info",
        title: `Status code: ${resolve.status}`,
        text: `Server message: ${resolve.responseText}`,
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        window.location.replace("./login.html");
      }, 1500);
    }
  );
}
function update_user_to_server(user_obj) {
  ajaxCall(
    "post",
    `${api}/UserMusics`,
    JSON.stringify(user_obj),
    (response) => {
      Swal.fire({
        icon: "info",
        title: `Status code: ${response.status}`,
        text: `Server message: ${response.responseText}`,
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1600);
    },
    (resolve) => {
      // in time it retyrn 0 then goes here because of that we need to do theis
      Swal.fire({
        icon: "info",
        title: `Status code: ${resolve.status}`,
        text: `Server message: ${resolve.responseText}`,
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1600);
    }
  );
}

function upload_user_profile_pic(data) {
  $.ajax({
    type: "POST",
    url: `${api}/Upload`,
    contentType: false,
    processData: false,
    data: data,
    success: (suc) => {
      setTimeout(() => {
        window.location.reload();
      }, 1600);
    },
    error: (error) => console.log(error),
  });
}
function get_reset_permission(email, callbackfunction) {
  ajaxCall(
    "GET",
    `${api}/UserMusics/GetByemail/email/${email}`,
    null,
    (response) => {
      sessionStorage.setItem("User", JSON.stringify(response));
      Swal.fire({
        icon: "info",
        title: `check your email for the unique key`,
        text: `Server message: you have premission to reset password email send  to ${response.emial}`,
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        callbackfunction();
      }, 1600);
    },
    (resolve) => {
      // in time it retyrn 0 then goes here because of that we need to do theis
      Swal.fire({
        icon: "info",
        title: `Status code: ${resolve.status}`,
        text: `Server message: ${resolve.responseText}`,
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
      sessionStorage.setItem("User", JSON.stringify(response));
      Swal.fire({
        icon: "success",
        title: `The password have been channged`,
        text: `you can user the new password now have a good day `,
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        window.location.replace("./login.html");
      }, 1500);
    },
    (resolve) => {
      // in time it retyrn 0 then goes here because of that we need to do theis
      Swal.fire({
        icon: "info",
        title: `Status code: ${resolve.status}`,
        text: `Server message: ${resolve.responseText}`,
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
      sessionStorage.setItem("User", JSON.stringify(response));
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
        text: `Server message: ${resolve.responseText}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  );
}
function getProfileImage(image_url, image_elms) {
  image_elms.each(function () {
    $(this).attr("src", `${api}/Upload?fileName=${image_url}`);
  });
}
function add_comment_to_song(comment_song_obj, callback) {
  ajaxCall(
    "POST",
    `${api}/Comments/PostSongComment`,
    JSON.stringify(comment_song_obj),
    (response) => {
      callback();
      Swal.fire({
        icon: "success",
        title: `Correct info`,
        text: `have fun and enjoy your time in our website `,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    (resolve) => {
      console.log(resolve);
      // in time it retyrn 0 then goes here because of that we need to do theis
      Swal.fire({
        icon: "info",
        title: `Status code: ${resolve.status}`,
        text: `Server message: ${resolve.responseText}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  );
}
function add_comment_to_artist(comment_artist_obj, callback) {
  ajaxCall(
    "POST",
    `${api}/Comments/PostArtistComment`,
    JSON.stringify(comment_artist_obj),
    (response) => {
      callback();
      Swal.fire({
        icon: "success",
        title: `Correct info`,
        text: `have fun and enjoy your time in our website `,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    (resolve) => {
      // console.log(resolve);
      // in time it retyrn 0 then goes here because of that we need to do theis
      Swal.fire({
        icon: "info",
        title: `Status code: ${resolve.status}`,
        text: `Server message: ${resolve.responseText}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  );
}
function get_comment_for_song(song_id, callback) {
  ajaxCall(
    "GET",
    `${api}/Comments/GetSongComments/songId/${song_id}`,
    null,
    (response) => {
      callback(response);
    },
    (resolve) => {
      console.log(resolve);
      // in time it retyrn 0 then goes here because of that we need to do theis
      Swal.fire({
        icon: "info",
        title: `Status code: ${resolve.status}`,
        text: `Server message: ${resolve.responseText}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  );
}
function get_comment_for_artist(artist_name, callback) {
  ajaxCall(
    "GET",
    `${api}/Comments/GetArtistComments/artistName/${artist_name}`,
    null,
    (response) => {
      callback(response);
    },
    (resolve) => {
      console.log(resolve);
      // in time it retyrn 0 then goes here because of that we need to do theis
      Swal.fire({
        icon: "info",
        title: `Status code: ${resolve.status}`,
        text: `Server message: ${resolve.responseText}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  );
}

function get_user_by_id_comments(user_id, callback) {
  ajaxCall(
    "GET",
    `${api}/UserMusics/GetUserById/Id/${user_id}`,
    null,
    (response) => {
      const user_info = {
        imgUrl: response.imgUrl,
        name: response.first + " " + response.last,
      };
      callback(user_info);
      // console.log(user_info);
    },
    (resolve) => {
      console.log(resolve);
      // in time it retyrn 0 then goes here because of that we need to do theis
      Swal.fire({
        icon: "info",
        title: `Status code: ${resolve.status}`,
        text: `Server message: ${resolve.responseText}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  );
}

function delete_song_comment_from_server(comment_id) {
  ajaxCall(
    "DELETE",
    `${api}/Comments/DeleteSongComment/commentId/${comment_id}`,
    null,
    (response) => {
      console.log("yes yes");
      Swal.fire({
        icon: "success",
        title: `Deleted successfully`,
        text: `Server message: The message has been deleted`,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    (resolve) => {
      // in time it retyrn 0 then goes here because of that we need to do theis
      Swal.fire({
        icon: "info",
        title: `Status code: ${resolve.status}`,
        text: `Server message: ${resolve.responseText}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  );
}
function delete_artist_comment_from_server(comment_id, callback) {
  ajaxCall(
    "DELETE",
    `${api}/Comments/DeleteArtistComment/commentId/${comment_id}`,
    null,
    (response) => {
      callback();
      Swal.fire({
        icon: "success",
        title: `Deleted successfully`,
        text: `Server message: The message has been deleted`,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    (resolve) => {
      // in time it retyrn 0 then goes here because of that we need to do theis
      Swal.fire({
        icon: "info",
        title: `Status code: ${resolve.status}`,
        text: `Server message: ${resolve.responseText}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  );
}
function get_top_ten_scores(callback) {
  ajaxCall(
    "GET",
    `${api}/UserPoints/GetTop10Scores`,
    null,
    (response) => {
      console.log(response);
      callback(response);
    },
    (resolve) => {
      // in time it retyrn 0 then goes here because of that we need to do theis
      Swal.fire({
        icon: "info",
        title: `Status code: ${resolve.status}`,
        text: `Server message: ${resolve.responseText}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  );
}

function get_question(questionName, callback) {
  ajaxCall(
    "GET",
    `${api}/QuestionMusics/${questionName}`,
    null,
    (response) => {
      callback(response);
    },
    (resolve) => {
      // in time it retyrn 0 then goes here because of that we need to do theis
      Swal.fire({
        icon: "info",
        title: `Status code: ${resolve.status}`,
        text: `Server message: ${resolve.responseText}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  );
}
function set_Score(score_obj, callback) {
  ajaxCall(
    "POST",
    `${api}/UserPoints`,
    JSON.stringify(score_obj),
    (response) => {
      callback();
    },
    (resolve) => {
      console.log(resolve);
      callback();
    }
  );
}
