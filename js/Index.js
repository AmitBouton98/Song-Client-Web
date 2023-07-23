function LoadIndexPage(){
  GetTop10ListenedArtists((data) => {
    if (data.length == 0) {
      $("#TrendingArtists").hide();
    }
    for (item of data) {
      CreateArtistDiv(item);
    }
  });

}
function CreateArtistDiv(data) {
  const swiperSlide = document.createElement("div");
  swiperSlide.classList.add("swiper-slide");

  const avatarDiv = document.createElement("div");
  avatarDiv.classList.add("avatar", "avatar--xxl", "d-block", "text-center");

  const avatarImageDiv = document.createElement("div");
  avatarImageDiv.classList.add("avatar__image");
  // token
  const artistImage = document.createElement("img");
  artistImage.src = data.artistUrl; // cchange the img
  // artistImage.src = 'images/cover/large/12.jpg'; // cchange the img
  artistImage.alt = data.artistName;


  avatarImageDiv.appendChild(artistImage);

  const artistTitleLink = document.createElement("a");
  artistTitleLink.classList.add("avatar__title", "mt-3");
  artistTitleLink.textContent = data.artistName;

  avatarDiv.appendChild(avatarImageDiv);
  avatarDiv.appendChild(artistTitleLink);

  swiperSlide.appendChild(avatarDiv);
  document.getElementById("TrendingArtists").appendChild(swiperSlide);
}
