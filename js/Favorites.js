var data = JSON.parse(sessionStorage.getItem("User"));

$(document).ready(function () {
  $("#logout-btn").on("click", logOut);
});

function LoadFavoritesPage() {
  GetAllFavoriteSongForGivenUserId((d) => {
    for (item of d) {
      AddSongToPage(item, "SongS");
    }
  }, data.id);
}
