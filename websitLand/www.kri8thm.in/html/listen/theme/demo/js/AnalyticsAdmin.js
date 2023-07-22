// ajaxcall before and groabal
// $(document).ready(function () {
//   const user_info = JSON.parse(sessionStorage.getItem("User"));
//   if (user_info == undefined) {
//     window.location.replace("./login.html");
//   }
//   $("#logout-btn").on("click", logOut);
//   getProfileImage(user_info.imgUrl, $(".user-image"));
// });
const user_info = JSON.parse(sessionStorage.getItem("User"));

function LoadAdminPage() {
  document.getElementById('UserFirstAndLastName').textContent = `${user_info.first} ${user_info.last}`
  LoadNumberOfUsersAndSongs();
  LoadPlayedNumberForUserAndTopSongAndArtist()
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
function LoadPlayedNumberForUserAndTopSongAndArtist(){
  const Played = document.getElementById('TotalTimeForHearingSong')
  GetNumberOfPlayedForUser((data)=>{
    console.log(data)
    Played.textContent = data
  },user_info.id)
  const Score = document.getElementById('GetScoreForUser')
  GetScoreForUser((data)=>{
    Score.textContent = data
  },user_info.id)
  GetTop1SongForUser((data)=>{
    console.log(data)
  },user_info.id)
  GetTop1ArtistForUser((data)=>{
    console.log(data)
  },user_info.id)
}