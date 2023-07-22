var User = JSON.parse(sessionStorage.getItem("User"));

// $(document).ready(function () {
//   $("#logout-btn").on("click", logOut);
// });

function LoadArtists() {
  GetFavoriteArtistByUserId((data) => {
    for (item of data) {
      CreateFavoriteArtists(item);
    }
  }, User.id);
  GetAllArtists((data) => {
    for (item of data) {
      CreateArtist(item);
    }
  });
}
function CreateFavoriteArtists(data) {
  // Create the outer div with class "swiper-slide"
  var outerDiv = document.createElement("div");
  outerDiv.className = "swiper-slide";

  // Create the inner div with classes "avatar avatar--xxl d-block text-center"
  var innerDiv = document.createElement("div");
  innerDiv.className = "avatar avatar--xxl d-block text-center";

  // Create the div with class "avatar__image"
  var avatarImageDiv = document.createElement("div");
  avatarImageDiv.className = "avatar__image";

  // Create the anchor tag with href "artist-details.html"
  var anchorTag = document.createElement("a");
  // anchorTag.href = "artist-details.html";
  $(anchorTag).css('cursor','pointer')

  // add the artist to local storage !
  anchorTag.onclick = () => {
    // event.preventDefault();
    navigateToPageArtistDetails(data);
    console.log("Title link clicked");
    // Add your code here to handle the click event for the title link
  };

  // Create the image element with src "images/cover/large/5.jpg" and alt "Jina Moore"
  var imageElement = document.createElement("img");
  imageElement.src = data.artistUrl;
  imageElement.alt = data.artistName;

  // Append the image element to the anchor tag
  anchorTag.appendChild(imageElement);

  // Append the anchor tag to the div with class "avatar__image"
  avatarImageDiv.appendChild(anchorTag);

  // Create the anchor tag with href "artist-details.html" and class "avatar__title mt-3"
  var titleAnchorTag = document.createElement("a");
  // titleAnchorTag.href = "artist-details.html";
  $(titleAnchorTag).css('cursor','pointer')

  titleAnchorTag.className = "avatar__title mt-3";
  titleAnchorTag.textContent = data.artistName;

  // Append the title anchor tag to the inner div
  innerDiv.appendChild(avatarImageDiv);
  innerDiv.appendChild(titleAnchorTag);

  // Append the inner div to the outer div
  outerDiv.appendChild(innerDiv);
  document.getElementById("FavoritesArtist").appendChild(outerDiv);
}
function CreateArtist(data) {
  // Create the outer div with classes "col-6 col-xl-2 col-md-3 col-sm-4"
  var outerDiv = document.createElement("div");
  outerDiv.className = "col-6 col-xl-2 col-md-3 col-sm-4";

  // Create the anchor tag with href "artist-details.html" and class "cover cover--round"
  var anchorTag = document.createElement("a");
  // anchorTag.href = "artist-details.html";
  $(anchorTag).css('cursor','pointer')

  anchorTag.className = "cover cover--round";

  anchorTag.onclick = () => {
    // event.preventDefault();
    navigateToPageArtistDetails(data);
    console.log("Title link clicked");
    // Add your code here to handle the click event for the title link
  };

  // Create the div with class "cover__image"
  var coverImageDiv = document.createElement("div");
  coverImageDiv.className = "cover__image";

  // Create the image element with src "images/cover/large/1.jpg" and alt "Arebica Luna"
  var imageElement = document.createElement("img");
  // imageElement.src = 'images/cover/large/12.jpg';
  // imageElement.alt = data.artistName;
  imageElement.src = data.artistUrl;
  imageElement.alt = data.artistName;
  imageElement.classList.add("ArtistImg");

  // Append the image element to the div with class "cover__image"
  coverImageDiv.appendChild(imageElement);

  // Create the div with class "cover__foot"
  var coverFootDiv = document.createElement("div");
  coverFootDiv.className = "cover__foot";

  // Create the span element with class "cover__title text-truncate" and text content "Arebica Luna"
  var titleSpan = document.createElement("span");
  titleSpan.className = "cover__title text-truncate";
  titleSpan.textContent = data.artistName;

  // Append the title span to the div with class "cover__foot"
  coverFootDiv.appendChild(titleSpan);

  // Append the cover image div and cover foot div to the anchor tag
  anchorTag.appendChild(coverImageDiv);
  anchorTag.appendChild(coverFootDiv);

  // Append the anchor tag to the outer div
  outerDiv.appendChild(anchorTag);

  document.getElementById("AllArtists").appendChild(outerDiv);
}
