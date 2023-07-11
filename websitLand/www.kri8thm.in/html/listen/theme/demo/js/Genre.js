$(document).ready(function () {
    GetAllSongs((data)=>{
        for(item of data){
            AddSongForArtist(item)
        }
    })
})



function AddSongForArtist(data) {
    // Create the outer div with the appropriate classes
    var listDiv = document.createElement('div');
    listDiv.className = 'list__item';
    listDiv.setAttribute('data-song-id', '8');
    listDiv.setAttribute('data-song-name', 'Sadness inside');
    listDiv.setAttribute('data-song-artist', 'Karen Jennings');
    listDiv.setAttribute('data-song-album', 'Sadness');
    listDiv.setAttribute('data-song-url', 'audio/ringtone-8.mp3');
    listDiv.setAttribute('data-song-cover', 'images/cover/small/8.jpg');

    // Create the cover div
    var coverDiv = document.createElement('div');
    coverDiv.className = 'list__cover';

    // Create the cover image
    var coverImg = document.createElement('img'); // need to change
    coverImg.src = 'images/cover/small/8.jpg';
    coverImg.alt = 'Sadness'; 

    // Create the play button
    var playButtonLink = document.createElement('a');
    playButtonLink.href = 'javascript:void(0);';
    playButtonLink.className = 'btn btn-play btn-sm btn-default btn-icon rounded-pill';
    playButtonLink.setAttribute('data-play-id', '8');
    playButtonLink.setAttribute('aria-label', 'Play pause');

    var playButtonIconPlay = document.createElement('i');
    playButtonIconPlay.className = 'ri-play-fill icon-play';

    var playButtonIconPause = document.createElement('i');
    playButtonIconPause.className = 'ri-pause-fill icon-pause';

    // Append the play button icons to the play button link
    playButtonLink.appendChild(playButtonIconPlay);
    playButtonLink.appendChild(playButtonIconPause);

    // Append the cover image and play button link to the cover div
    coverDiv.appendChild(coverImg);
    coverDiv.appendChild(playButtonLink);

    // Create the content div
    var contentDiv = document.createElement('div');
    contentDiv.className = 'list__content';

    // Create the title anchor element
    var titleLink = document.createElement('a');
    titleLink.href = 'song-details.html';
    titleLink.className = 'list__title text-truncate';
    titleLink.textContent = data.name;
 
    // Create the subtitle paragraph
    var subtitleP = document.createElement('p');
    subtitleP.className = 'list__subtitle text-truncate';

    // Create the artist anchor element
    var artistLink = document.createElement('a');
    artistLink.href = 'artist-details.html';
    artistLink.textContent = data.artistName;

    // Append the artist link to the subtitle paragraph
    subtitleP.appendChild(artistLink);

    // Append the title link and subtitle paragraph to the content div
    contentDiv.appendChild(titleLink);
    contentDiv.appendChild(subtitleP);

    // Create the options list
    var optionsList = document.createElement('ul');
    optionsList.className = 'list__option';

    // Create the option list items
    var optionListItem1 = document.createElement('li');
    var optionListItem2 = document.createElement('li');
    var optionListItem3 = document.createElement('li');
    var optionListItem4 = document.createElement('li');

    // Create the badge element for VIP crown
    var badgeSpan = document.createElement('span');
    badgeSpan.className = 'badge rounded-pill bg-info';

    var crownIcon = document.createElement('i');
    crownIcon.className = 'ri-vip-crown-fill';

    // Append the crown icon to the badge span
    badgeSpan.appendChild(crownIcon);

    // Append the badge span to the first option list item
    optionListItem1.appendChild(badgeSpan);

    // Create the favorite button
    var favoriteButtonLink = document.createElement('a');
    favoriteButtonLink.href = 'javascript:void(0);';
    favoriteButtonLink.setAttribute('role', 'button');
    favoriteButtonLink.className = 'd-inline-flex';
    favoriteButtonLink.setAttribute('aria-label', 'Favorite');
    favoriteButtonLink.setAttribute('data-favorite-id', '8');

    var heartEmptyIcon = document.createElement('i');
    heartEmptyIcon.className = 'ri-heart-line heart-empty';

    var heartFillIcon = document.createElement('i');
    heartFillIcon.className = 'ri-heart-fill heart-fill';

    // Append the heart icons to the favorite button link
    favoriteButtonLink.appendChild(heartEmptyIcon);
    favoriteButtonLink.appendChild(heartFillIcon);

    // Append the favorite button link to the second option list item
    optionListItem2.appendChild(favoriteButtonLink);

    // Create the duration
    var durationListItem = document.createElement('li');
    durationListItem.textContent = '04:43'; // need to find the time *********

    // Create the dropdown menu
    var dropdownMenu = document.createElement('ul');
    dropdownMenu.className = 'dropdown-menu dropdown-menu-sm';

    // Create the dropdown menu items
    var dropdownMenuItem1 = document.createElement('li');
    var dropdownMenuItem2 = document.createElement('li');
    var dropdownMenuItem3 = document.createElement('li');
    var dropdownMenuItem4 = document.createElement('li');
    var dropdownMenuItem5 = document.createElement('li');
    var dropdownMenuItemDivider = document.createElement('li');
    var dropdownMenuItem6 = document.createElement('li');

    // Create the "Add to playlist" link
    var addToPlaylistLink = document.createElement('a');
    addToPlaylistLink.className = 'dropdown-item';
    addToPlaylistLink.href = 'javascript:void(0);';
    addToPlaylistLink.setAttribute('role', 'button');
    addToPlaylistLink.setAttribute('data-playlist-id', '8');
    addToPlaylistLink.textContent = 'Add to playlist';

    // Create the "Add to queue" link
    var addToQueueLink = document.createElement('a');
    addToQueueLink.className = 'dropdown-item';
    addToQueueLink.href = 'javascript:void(0);';
    addToQueueLink.setAttribute('role', 'button');
    addToQueueLink.setAttribute('data-queue-id', '8');
    addToQueueLink.textContent = 'Add to queue';

    // Create the "Next to play" link
    var nextToPlayLink = document.createElement('a');
    nextToPlayLink.className = 'dropdown-item';
    nextToPlayLink.href = 'javascript:void(0);';
    nextToPlayLink.setAttribute('role', 'button');
    nextToPlayLink.setAttribute('data-next-id', '8');
    nextToPlayLink.textContent = 'Next to play';

    // Create the "Share" link
    var shareLink = document.createElement('a');
    shareLink.className = 'dropdown-item';
    shareLink.href = 'javascript:void(0);';
    shareLink.setAttribute('role', 'button');
    shareLink.textContent = 'Share';

    // Create the dropdown menu divider
    var dropdownMenuDivider = document.createElement('li');
    dropdownMenuDivider.className = 'dropdown-divider';

    // Create the "Play" link
    var playLink = document.createElement('a');
    playLink.className = 'dropdown-item';
    playLink.href = 'javascript:void(0);';
    playLink.setAttribute('role', 'button');
    playLink.setAttribute('data-play-id', '8');
    playLink.textContent = 'Play';

    // Append the dropdown menu items to the dropdown menu
    dropdownMenuItem1.appendChild(addToPlaylistLink);
    dropdownMenuItem2.appendChild(addToQueueLink);
    dropdownMenuItem3.appendChild(nextToPlayLink);
    dropdownMenuItem4.appendChild(shareLink);
    dropdownMenuItem5.appendChild(dropdownMenuDivider);
    dropdownMenuItem6.appendChild(playLink);

    // Append the dropdown menu items to the dropdown menu
    dropdownMenu.appendChild(dropdownMenuItem1);
    dropdownMenu.appendChild(dropdownMenuItem2);
    dropdownMenu.appendChild(dropdownMenuItem3);
    dropdownMenu.appendChild(dropdownMenuItem4);
    dropdownMenu.appendChild(dropdownMenuItem5);
    dropdownMenu.appendChild(dropdownMenuItem6);

    // Create the dropdown toggle
    var dropdownToggle = document.createElement('a');
    dropdownToggle.className = 'dropdown-link';
    dropdownToggle.href = 'javascript:void(0);';
    dropdownToggle.setAttribute('role', 'button');
    dropdownToggle.setAttribute('data-bs-toggle', 'dropdown');
    dropdownToggle.setAttribute('aria-label', 'Cover options');
    dropdownToggle.setAttribute('aria-expanded', 'false');

    var dropdownToggleIcon = document.createElement('i');
    dropdownToggleIcon.className = 'ri-more-fill';

    // Append the dropdown toggle icon to the dropdown toggle
    dropdownToggle.appendChild(dropdownToggleIcon);

    // Create the dropdown wrapper
    var dropdownWrapper = document.createElement('li');
    dropdownWrapper.className = 'dropstart d-inline-flex';

    // Append the dropdown toggle to the dropdown wrapper
    dropdownWrapper.appendChild(dropdownToggle);

    // Append the dropdown menu to the dropdown wrapper
    dropdownWrapper.appendChild(dropdownMenu);

    // Append the option list items and the dropdown wrapper to the options list
    optionsList.appendChild(optionListItem1);
    optionsList.appendChild(optionListItem2);
    optionsList.appendChild(durationListItem);
    optionsList.appendChild(dropdownWrapper);

    // Append the cover div, content div, and options list to the list div
    listDiv.appendChild(coverDiv);
    listDiv.appendChild(contentDiv);
    listDiv.appendChild(optionsList);

    document.getElementById("SongS").appendChild(listDiv)
}
