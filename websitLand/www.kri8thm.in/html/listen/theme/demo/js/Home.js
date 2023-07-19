var User = JSON.parse(sessionStorage.getItem('User'));
var apiKey = 'AIzaSyAu-HyPrbv66uCgbXS7lvlyQpSCC7gq7Ho';
var player
$(document).ready(function () {
    document.getElementById('clear_playlist').click();

    document.getElementById("FirstNameToShow").innerHTML = User.first
    document.getElementById("FirstAndLastNameToShow").innerHTML = User.first + " " + User.last

});


function LoadHome() {
    GetTop10GlobalSongs((data) => {
        for (item of data) {
            CreateLargeMusic(item, 'LargeMusicTop10')
        }
    })
    // getting 6 songs he might like
    GetSongsUserMightLike((data) => {
        console.log(data)
        if (data.length == 0) {
            $('#SongsUserMightLike').hide()
        }
        for (item of data) {
            CreateLargeMusic(item, '6SongsUserMightLike')
        }
    }, User.id)
    GetTop10ListenedArtists((data) => {
        console.log(data)
        if (data.length == 0) {
            $('#Top10Artists').hide()
        }
        for (item of data) {
            console.log(item)
            CreateArtistDiv(item)
        }
    })

}
function getVideoUrl(query) {
    const apiUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=${apiKey}`;

    fetch(apiUrl, {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length > 0) {
                const videoUrl = data.items[1].snippet.thumbnails.medium.url;
                console.log('Video URL:', videoUrl);
                return videoUrl
            } else {
                console.log('No search results found.');
            }
        })
        .catch(error => {
            console.log('Error:', error);
        });
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
    song == false ? coverImg.src = data.urlLink : coverImg.src = 'images/cover/large/12.jpg'; // img of the song in the search
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
        artistLink.onclick = function (event) {
            // event.preventDefault();
            navigateToPageArtistDetails(data)
            console.log('Title link clicked');
            // Add your code here to handle the click event for the title link
        };
    }
    else {
        // add the song to local storage !
        titleLink.onclick = function (event) {
            // event.preventDefault();
            navigateToPageSongDetails(data) // need to add ************
            console.log('Title link clicked');
            // Add your code here to handle the click event for the title link
        };
        getArtistByName((d) => {
            // add the artist to local storage !
            artistLink.onclick = function (event) {
                // event.preventDefault();
                navigateToPageArtistDetails(d)
                console.log('Title link clicked');
                // Add your code here to handle the click event for the title link
            };
        }, data.artistName)
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

function CreateLargeMusic(data, WhereToInster) {
    var swiperSlide = document.createElement('div');
    swiperSlide.className = 'swiper-slide';

    var coverDiv = document.createElement('div');
    coverDiv.className = 'cover cover--round';
    coverDiv.setAttribute('data-song-id', '0'); // here is to change th song itself (מה שמתנגן)
    coverDiv.setAttribute('data-song-name', data.name);
    coverDiv.setAttribute('data-song-artist', data.artistName);
    // coverDiv.setAttribute('data-song-album', 'Mummy');
    // Uncaught (in promise) DOMException: Failed to load because no supported source was found.
    // coverDiv.setAttribute('data-song-url', 'audio/ringtone-1.mp3'); 
    // coverDiv.setAttribute('data-song-url', 'https://www.youtube.com/embed/tgbNymZ7vqY');
    coverDiv.setAttribute('data-song-cover', 'images/cover/small/11.jpg');

    var coverHeadDiv = document.createElement('div');
    coverHeadDiv.className = 'cover__head';

    var coverLabelUl = document.createElement('ul');
    coverLabelUl.className = 'cover__label d-flex';

    var coverLabelLi1 = document.createElement('li');
    var badgeSpan1 = document.createElement('span');
    badgeSpan1.className = 'badge rounded-pill bg-danger';
    GetFavoriteSongByUserId((d) => { // checking if the song is in the favorit of the user
        for (item of d) {
            if (item.name == data.name) {
                var heartIcon = document.createElement('i');
                heartIcon.className = 'ri-heart-fill';
                badgeSpan1.appendChild(heartIcon);
            }
        }
    }, User.id)

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
    // console.log(getVideoUrl('Pretenders	Dragway 42')) // need to get the url
    coverImage.src = data.urlLink;
    // coverImage.src = 'images/cover/large/11.jpg';
    coverImage.alt = data.name;

    var btnPlay = document.createElement('button');
    btnPlay.type = 'button';
    btnPlay.className = 'btn btn-play btn-default btn-icon rounded-pill';
    btnPlay.setAttribute('data-play-id', '1');
    btnPlay.onclick = () => {
        PlayButtonOnClick(data)
    }

    var playIcon = document.createElement('i');
    playIcon.className = 'ri-play-fill icon-play';
    playIcon.onclick = () => {
        playVideo
    }
    var pauseIcon = document.createElement('i');
    pauseIcon.className = 'ri-pause-fill icon-pause';
    pauseIcon.onclick = () => {
        pauseBtn
    }

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
    coverTitleLink.onclick = () => {
        getSongByName((item) => {
            navigateToPageSongDetails(item)
        }, data.name)
        // coverTitleLink.href = 'song-details.html';
        console.log('Title link clicked');
        // Add your code here to handle the click event for the title link
    };
    var coverSubtitleP = document.createElement('p');
    coverSubtitleP.className = 'cover__subtitle text-truncate';
    var artistDetailsLink = document.createElement('a');
    artistDetailsLink.href = 'artist-details.html';
    artistDetailsLink.textContent = data.artistName
    artistDetailsLink.onclick = () => {
        getArtistByName((item) => {
            navigateToPageArtistDetails(item)
        }, data.artistName)
        console.log('Title link clicked');
        // Add your code here to handle the click event for the title link
    };
    coverSubtitleP.appendChild(artistDetailsLink);
    coverFootDiv.appendChild(coverTitleLink);
    coverFootDiv.appendChild(coverSubtitleP);

    coverDiv.appendChild(coverFootDiv);
    swiperSlide.appendChild(coverDiv);
    document.getElementById(WhereToInster).appendChild(swiperSlide)


}

function CreateArtistDiv(data) {
    const swiperSlide = document.createElement("div");
    swiperSlide.classList.add("swiper-slide");

    const avatarDiv = document.createElement("div");
    avatarDiv.classList.add("avatar", "avatar--xxl", "d-block", "text-center");

    const avatarImageDiv = document.createElement("div");
    avatarImageDiv.classList.add("avatar__image");
    const artistLink = document.createElement("a");
    artistLink.href = "artist-details.html";
    // token
    const artistImage = document.createElement("img");
    artistImage.src = data.artistUrl; // cchange the img
    // artistImage.src = 'images/cover/large/12.jpg'; // cchange the img
    console.log(data)
    artistImage.alt = data.artistName;
    artistLink.appendChild(artistImage);
    artistLink.onclick = () => {
        getArtistByName((item) => {
            navigateToPageArtistDetails(item)
        }, data.artistName)
        console.log('Title link clicked');
        // Add your code here to handle the click event for the title link
    };

    avatarImageDiv.appendChild(artistLink);

    const artistTitleLink = document.createElement("a");
    artistTitleLink.href = "artist-details.html";
    artistTitleLink.classList.add("avatar__title", "mt-3");
    artistTitleLink.textContent = data.artistName;

    avatarDiv.appendChild(avatarImageDiv);
    avatarDiv.appendChild(artistTitleLink);

    swiperSlide.appendChild(avatarDiv);
    document.getElementById('Top10Artists').appendChild(swiperSlide)
}

var playButton = document.getElementById('PlayButton');
var bufferedProgress = document.getElementById('bufferedProgress');
var playedProgress = document.getElementById('playedProgress');
var progressSlider = document.getElementById('progressSlider');
var timeline = document.getElementById('timeline');
var volumeSlider = document.getElementById('VolumeSlider');
function onVolumeChange() {
    // Change the volume when slider value changes
    var volume = volumeSlider.value;
    player.setVolume(volume);
}
function onPlayerReady(event) {
    // Player is ready
    var duration = player.getDuration();
    console.log(duration)
    progressSlider.max = duration;
    playedProgress.max = duration;
    bufferedProgress.max = duration;

    playButton.onclick = togglePlay;
    progressSlider.addEventListener('input', onSliderChange);
    volumeSlider.addEventListener('input', onVolumeChange);
    document.getElementById('durationTime').innerHTML = formatTime(duration)
    timeUpdateInterval = setInterval(updateTimeDisplay, 1000);

}


function onPlayerStateChange(event) {
    // Player state changed
    if (event.data === YT.PlayerState.PLAYING) {
        // Video is playing
        playButton.innerHTML = 'Pause'; // Update button text
        // playButton.className = 'ri-pause-fill icon-pause';
    } else {
        // Video is paused or ended
        playButton.innerHTML = 'Play'; // Update button text
        // playButton.className = 'ri-play-fill icon-play';
    }

}

function onPlaybackQualityChange(event) {
    // Quality of playback has changed
    console.log('Playback quality changed');

}

// function onPlayerProgress(event) {
//     // Update progress time and timeline
//     var currentTime = player.getCurrentTime(); // Retrieves the time  the video play now
//     var duration = player.getDuration(); // Retrieves the total time of the video
//     var buffered = player.getVideoLoadedFraction() * duration;
//     var played = currentTime;

//     playedProgress.value = played;
//     bufferedProgress.value = buffered;
//     progressSlider.value = played;

//     var playedWidth = (played / duration) * 100;
//     var bufferedWidth = (buffered / duration) * 100;
//     timeline.style.width = playedWidth + '%';
//     bufferedProgress.style.width = bufferedWidth + '%';
// }

function onSliderChange() {
    // Seek to the specified time when slider value changes
    var currentTime = progressSlider.value;
    player.seekTo(currentTime);
    document.getElementById('durationTime').innerHTML = formatTime(player.getDuration() - currentTime) // no need
}



function togglePlay() {

    if (player.getPlayerState() === YT.PlayerState.PLAYING) {
        player.pauseVideo();
    } else {
        player.playVideo();
    }
}

function playVideo() {

    player.playVideo();
}

function pauseVideo() {

    player.pauseVideo();
}

function formatTime(duration) {
    var minutes = Math.floor(duration / 60);
    var seconds = Math.floor(duration % 60);

    // Add leading zeros if necessary
    var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    var formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

    return formattedMinutes + ":" + formattedSeconds;

}
// happend every 1 sec (interval)
function updateTimeDisplay() {

    var currentTime = player.getCurrentTime(); // Retrieves the time the video is currently playing
    var duration = player.getDuration(); // Retrieves the total duration of the video
    var remainingTime = duration - currentTime; // Calculates the remaining time

    document.getElementById('durationTime').innerHTML = formatTime(remainingTime);
    progressSlider.value = currentTime // changing the progress slider for current time (every 1 sec)
}
function onPlayerError() {
    // here is if there is error with the song
    player.destroy()
}
function PlayButtonOnClick(data) {
    AddPlayedForSongByGivenUserId((status) => {
        if (window.location.href.includes('song-details.html')) {
            document.getElementById("ListenMusic").innerHTML = Number(document.getElementById("ListenMusic").innerHTML) + 1
        }
        // console.log(status)
    }, data.id, User.id)

    document.getElementById('clear_playlist').click(); // need to check what happen if i delete this element

    if (player && player.getPlayerState() === YT.PlayerState.PLAYING) {
        player.stopVideo(); // Stop the currently playing video
        player.destroy(); // destroy the old vidio

    }

    console.log(document.getElementById('playerR'))

    // AddPlayedForSongByGivenUserId((status) => {
    //     // console.log(status)
    // }, data.id, User.id);
    player = new YT.Player('playerR', {
        height: '0',
        width: '0',
        videoId: data.youtubeId,
        playerVars: {
            autoplay: 1, // Enable autoplay
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onPlaybackQualityChange': onPlaybackQualityChange,
            // 'onProgress': onPlayerProgress,
            'onError': onPlayerError
        }
    });
}



function navigateToPageArtistDetails(data) {
    console.log(data)
    // var ArtistDetails = { artistName: data.artistName, content: data.content, published: data.published, listeners: data.listeners, playcount: data.playcount, likes: data.likes };
    var ArtistDetails = { artistName: data.artistName, likes: data.likes, artistUrl:data.artistUrl };

    sessionStorage.setItem('ArtistDetails', JSON.stringify(ArtistDetails));
}
function navigateToPageSongDetails(data) {
    console.log(data.lyriclink)
    var SongDetails = { id: data.id, artistName: data.artistName, name: data.name, likes: data.likes, lyriclink: data.lyricLink, urlLink: data.urlLink, youtubeId: data.youtubeId };
    sessionStorage.setItem('SongDetails', JSON.stringify(SongDetails));
}
