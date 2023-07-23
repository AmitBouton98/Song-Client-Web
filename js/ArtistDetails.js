var data = JSON.parse(sessionStorage.getItem("ArtistDetails"));
$(document).ready(function () {
  //     var data = JSON.parse(localStorage.getItem('ArtistDetails'));
  //     AddInfoArtist(data)
  //     GetSongsForArtis((songs)=>{
  //         console.log(songs)
  //         for(item of songs){
  //             AddSongForArtist(item)
  //         }
  //     },data.artistName)
  $("#commentForm").submit(function () {
    create_comment_artist("#comments-area");
    UpdateArtistAvgLikes()
    return false;
  });
  get_comment_for_artist(data.artistName, loopINComments);
  $("#logout-btn").on("click", logOut);
});

function UpdateArtistAvgLikes(){
  GetAvgNumberForGivenArtist((num)=>{
    // artist likes
    document.getElementById("ArtistLikes").textContent = Number(num.toFixed(2));
  },data.artistName)
}
function loopINComments(comments) {
  async function processComment(comment) {
    return new Promise((resolve) => {
      get_user_by_id_comments(comment.userId, function (user) {
        create_comment(
          "#comments-area",
          user.imgUrl,
          user.name,
          comment.createDate,
          comment.stars,
          comment.text,
          comment.userId,
          comment.id,
          "artist"
        );
        resolve();
      });
    });
  }

  async function loop() {
    for (let comment of comments) {
      await processComment(comment);
    }
  }

  loop();
}
function LoadArtistPage() {
  var Artist = JSON.parse(sessionStorage.getItem("ArtistDetails"));
  document.getElementById("clear_playlist").click();
  //}, data.artist.name, data.artist.bio.summary, data.artist.bio.published, data.artist.stats.listeners, data.artist.stats.playcount)
  GetArtistInfo((d) => {
    let data = {
      artistName: d.artist.name,
      content: d.artist.bio.summary,
      likes: 0,
      listeners: d.artist.stats.listeners,
      playcount: d.artist.stats.playcount,
      published: d.artist.bio.published, // need to check how to chenge it
    };
    AddInfoArtist(data);
    GetSongsForArtis((songs) => {
      for (item of songs) {
        AddSongToPage(item, "SongForArtist");
      }
    }, data.artistName);
  }, Artist.artistName);
  let ImgForArtistDetails = document.getElementById("ImgForArtistDetails");
  ImgForArtistDetails.src = Artist.artistUrl;
  ImgForArtistDetails.classList.add("ArtistImg");
}
function AddInfoArtist(data) {
  // ul is to add the info down to the name
  let ul = document.getElementById("InfoArtistLi");

  let published = document.createElement("li");
  published.textContent = data.published;

  let listeners = document.createElement("li");
  listeners.innerHTML = "<b>listeners :</b> " + data.listeners;

  let playcount = document.createElement("li");
  playcount.innerHTML = "<b>playcount :</b> " + data.playcount;

  // need to add likes
  ul.appendChild(published);
  ul.appendChild(listeners);
  ul.appendChild(playcount);
  // artist name
  let InfoArtistName = document.getElementById("InfoArtistName");
  InfoArtistName.textContent = data.artistName;
  // artist content
  let InfoArtistContent = document.getElementById("InfoArtistContent");
  InfoArtistContent.innerHTML = data.content;
  
  UpdateArtistAvgLikes()

  GetNumberOfPlayedForGivenArtist((num) => {
    document.getElementById("PlayNumberForArtist").innerHTML = num;
  }, data.artistName);
  GetTheNumberOfAppearanceInUserByGivenArtist((num) => {
    document.getElementById("FavoritesArtist").innerHTML = num;
  }, data.artistName);

  let heartFavorite = document.getElementById("AddArtistToFavorite");
  GetFavoriteArtistByUserId((d) => {
    for (item of d) {
      if (item.artistName == data.artistName) {
        heartFavorite.style.color = "red";
        heartFavorite.className = "ri-heart-fill heart-empty";
      }
    }
  }, User.id);
  heartFavorite.onclick = () => {
    // set favorite song to user
    if (heartFavorite.style.color == "red") {
      DeleteFavoriteArtistToUser(
        (d) => {
          heartFavorite.className = "ri-heart-line heart-empty";
          heartFavorite.style.color = "";
          document.getElementById("FavoritesArtist").innerHTML =
            Number(document.getElementById("FavoritesArtist").innerHTML) - 1;
        },
        User.id,
        data.artistName
      );
    } else {
      PutFavoriteArtistToUser(
        (d) => {
          heartFavorite.className = "ri-heart-fill heart-empty";
          heartFavorite.style.color = "red";
          document.getElementById("FavoritesArtist").innerHTML =
            Number(document.getElementById("FavoritesArtist").innerHTML) + 1;
        },
        User.id,
        data.artistName
      );
    }
  };
}
