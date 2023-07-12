

function LoadHome(){
    GetTop10GlobalSongs((data)=>{
        for(item of data){
            CreateLargeMusic(item)
        }
    })
}
// Event handler for button click
function buttonClickHandler(btn) {
    // Check which button was clicked by examining the event target
    //remove the active from all the other buttons
    var buttons = document.getElementsByClassName('btn');

    for (var i = 0; i < buttons.length; i++) {
        // Check if the button is not the clicked one
        buttons[i].classList.remove('active');
    }
    // add active to the clicked button
    btn.classList.add('active');
    document.getElementById("SongListSearch").innerHTML = "" // need to check why it doesnt clear the data
    $('#search_form').submit(() => {
        console.log(btn.innerHTML)
        var searchInput = document.getElementById('search_input');
        var searchValue = searchInput.value;
        // Perform actions based on the clicked button
        if (btn.innerHTML == 'Song name' && btn.classList.contains('active')) {
            getSongByName((data) => {
                CreateElemFromReasrch(data, "SongListSearch", false)
            }, searchValue)
        } else if (btn.innerHTML == 'Artist name' && btn.classList.contains('active')) {
            getArtistByName((data) => {
                CreateElemFromReasrch(data, "ArtistListSearch", true)
            }, searchValue)
        } else if (btn.innerHTML == 'Song text' && btn.classList.contains('active')) {
            getSongsByText((data) => {
                for (item of data) {
                    CreateElemFromReasrch(item, "SongListSearch", false)
                }
            }, searchValue)
        }
        return false;
    });
}

function CreateElemFromReasrch(data, WhereToInster, song) {
    console.log(data)
    var div = document.getElementById(WhereToInster);
    // Create the outer div with the appropriate classes
    var colDiv = document.createElement('div');
    colDiv.className = 'col-xl-3 col-md-4 col-sm-6';

    // Create the inner div with the appropriate classes
    var listDiv = document.createElement('div');
    listDiv.className = 'list__item';

    // Create the anchor element for the cover image
    var coverLink = document.createElement('a');
    coverLink.href = 'song-details.html';
    coverLink.className = 'list__cover';

    // Create the cover image element
    var coverImg = document.createElement('img');
    coverImg.src = 'images/cover/small/6.jpg'; // need to change!
    // coverImg.alt = data.name; 

    // Append the cover image to the cover link
    coverLink.appendChild(coverImg);

    // Create the content div
    var contentDiv = document.createElement('div');
    contentDiv.className = 'list__content';

    // Create the title anchor element
    var titleLink = document.createElement('a');
    titleLink.href = 'song-details.html';
    titleLink.className = 'list__title text-truncate';
    titleLink.textContent = data.name; // name of the song



    // Create the subtitle paragraph
    var subtitleP = document.createElement('p');
    subtitleP.className = 'list__subtitle text-truncate';

    // Create the artist anchor element
    var artistLink = document.createElement('a');
    artistLink.href = 'artist-details.html';
    artistLink.textContent = data.artistName; // name of the artist
    if (song) {
        // add the artist to local storage !
        listDiv.addEventListener('click', function (event) {
            // event.preventDefault();
            navigateToPageArtistDetails(data)
            console.log('Title link clicked');
            // Add your code here to handle the click event for the title link
        });
    }
    else {
        // add the song to local storage !
        listDiv.addEventListener('click', function (event) {
            // event.preventDefault();
            navigateToPageSongDetails(data) // need to add ************
            console.log('Title link clicked');
            // Add your code here to handle the click event for the title link
        });
    }

    // Append the artist link to the subtitle paragraph
    subtitleP.appendChild(artistLink);

    // Append the title link and subtitle paragraph to the content div
    contentDiv.appendChild(titleLink);
    contentDiv.appendChild(subtitleP);

    // Append the cover link and content div to the inner div
    listDiv.appendChild(coverLink);
    listDiv.appendChild(contentDiv);

    // Append the inner div to the outer div
    colDiv.appendChild(listDiv);

    div.appendChild(colDiv);
}
function CreateLargeMusic(data) {
    var swiperSlide = document.createElement('div');
    swiperSlide.className = 'swiper-slide';

    var coverDiv = document.createElement('div');
    coverDiv.className = 'cover cover--round';
    coverDiv.setAttribute('data-song-id', '2'); // here is to change th song itself (מה שמתנגן)
    coverDiv.setAttribute('data-song-name', 'I love you mummy');
    coverDiv.setAttribute('data-song-artist', 'Arebica Luna');
    coverDiv.setAttribute('data-song-album', 'Mummy');
    coverDiv.setAttribute('data-song-url', 'audio/ringtone-1.mp3');
    coverDiv.setAttribute('data-song-cover', 'images/cover/small/1.jpg');

    var coverHeadDiv = document.createElement('div');
    coverHeadDiv.className = 'cover__head';

    var coverLabelUl = document.createElement('ul');
    coverLabelUl.className = 'cover__label d-flex';

    var coverLabelLi1 = document.createElement('li');
    var badgeSpan1 = document.createElement('span');
    badgeSpan1.className = 'badge rounded-pill bg-danger';
    var heartIcon = document.createElement('i'); // need to check if the user like this music or not
    heartIcon.className = 'ri-heart-fill';

    badgeSpan1.appendChild(heartIcon);
    coverLabelLi1.appendChild(badgeSpan1);
    coverLabelUl.appendChild(coverLabelLi1);

    var coverLabelLi2 = document.createElement('li');
    var badgeSpan2 = document.createElement('span');
    badgeSpan2.className = 'badge rounded-pill bg-info';
    var crownIcon = document.createElement('i');
    crownIcon.className = 'ri-vip-crown-fill';

    badgeSpan2.appendChild(crownIcon);
    coverLabelLi2.appendChild(badgeSpan2);
    coverLabelUl.appendChild(coverLabelLi2);

    coverHeadDiv.appendChild(coverLabelUl);
    coverDiv.appendChild(coverHeadDiv);

    var coverImageDiv = document.createElement('div');
    coverImageDiv.className = 'cover__image';
    var coverImage = document.createElement('img');
    coverImage.src = 'images/cover/large/1.jpg';
    coverImage.alt = 'I love you mummy';

    var btnPlay = document.createElement('button');
    btnPlay.type = 'button';
    btnPlay.className = 'btn btn-play btn-default btn-icon rounded-pill';
    btnPlay.setAttribute('data-play-id', '1');

    var playIcon = document.createElement('i');
    playIcon.className = 'ri-play-fill icon-play';

    var pauseIcon = document.createElement('i');
    pauseIcon.className = 'ri-pause-fill icon-pause';

    btnPlay.appendChild(playIcon);
    btnPlay.appendChild(pauseIcon);

    coverImageDiv.appendChild(coverImage);
    coverImageDiv.appendChild(btnPlay);
    coverDiv.appendChild(coverImageDiv);

    var coverFootDiv = document.createElement('div');
    coverFootDiv.className = 'cover__foot';
    var coverTitleLink = document.createElement('a');
    coverTitleLink.href = 'song-details.html';
    coverTitleLink.className = 'cover__title text-truncate';
    coverTitleLink.textContent = data.name

    var coverSubtitleP = document.createElement('p');
    coverSubtitleP.className = 'cover__subtitle text-truncate';
    var artistDetailsLink = document.createElement('a');
    artistDetailsLink.href = 'artist-details.html';
    artistDetailsLink.textContent = data.artistName

    coverSubtitleP.appendChild(artistDetailsLink);
    coverFootDiv.appendChild(coverTitleLink);
    coverFootDiv.appendChild(coverSubtitleP);

    coverDiv.appendChild(coverFootDiv);
    swiperSlide.appendChild(coverDiv);
    document.getElementById("LargeMusicTop10").appendChild(swiperSlide)
}
function navigateToPageArtistDetails(data) {
    var ArtistDetails = { artistName: data.artistName, content: data.content, published: data.published, listeners: data.listeners, playcount: data.playcount, likes: data.likes };
    localStorage.setItem('ArtistDetails', JSON.stringify(ArtistDetails));
}
function navigateToPageSongDetails(data) {
    console.log(data.lyriclink)
    var SongDetails = { id: data.id, artistName: data.artistName, name: data.name, likes: data.likes, lyriclink: data.lyricLink, playLink: data.playLink };
    localStorage.setItem('SongDetails', JSON.stringify(SongDetails));
}