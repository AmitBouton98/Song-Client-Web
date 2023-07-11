
$(document).ready(function () {


});

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
                CreateElemFromReasrch(data, "SongListSearch",false)
            }, searchValue)
        } else if (btn.innerHTML == 'Artist name' && btn.classList.contains('active')) {
            getArtistByName((data) => {
                CreateElemFromReasrch(data, "ArtistListSearch",true)
            }, searchValue)
        } else if (btn.innerHTML == 'Song text' && btn.classList.contains('active')) {
            getSongsByText((data) => {
                for (item of data) {
                    CreateElemFromReasrch(item, "SongListSearch",false)
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
function navigateToPageArtistDetails(data) {
    var ArtistDetails = { artistName: data.artistName, content: data.content, published: data.published, listeners: data.listeners, playcount: data.playcount, likes: data.likes };
    localStorage.setItem('ArtistDetails', JSON.stringify(ArtistDetails));
}
function navigateToPageSongDetails(data) {
    console.log(data.lyriclink)
    var SongDetails = { id: data.id, artistName: data.artistName, name: data.name, likes: data.likes, lyriclink: data.lyricLink, playLink: data.playLink };
    localStorage.setItem('SongDetails', JSON.stringify(SongDetails));
}