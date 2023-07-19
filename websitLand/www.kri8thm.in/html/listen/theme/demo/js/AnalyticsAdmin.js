$(document).ready(function () {
  $("#logout-btn").on("click", logOut);
});

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
