// ajaxcall before and groabal
// $(document).ready(function () {
//   const user_info = JSON.parse(sessionStorage.getItem("User"));
//   if (user_info == undefined) {
//     window.location.replace("./login.html");
//   }
//   $("#logout-btn").on("click", logOut);
//   getProfileImage(user_info.imgUrl, $(".user-image"));
// });

function LoadAdminPage() {
  LoadNumberOfUsersAndSongs();
}
function LoadNumberOfUsersAndSongs() {
  GetNumberOfUsers((data) => {
    console.log(data);
    document.getElementById("TotalNumberOfUsers").innerHTML = data;
  });
  GetNumberOfSongs((data) => {
    console.log(data);
    document.getElementById("TotalNumberOfSongs").innerHTML = data;
  });
}
