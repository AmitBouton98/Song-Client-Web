var data = JSON.parse(localStorage.getItem('SongDetails'));
$(document).ready(function () {
    AddInfoSong(data)
});
function AddInfoSong(data) {
    // number of play
    let PlayNumberForSong = document.getElementById("PlayNumberForSong")
    GetSongsForArtis((d) => { // adding the number of played for the song
        PlayNumberForSong.innerHTML = d
    }, data.id)
    // song name
    let InfoSongName = document.getElementById("InfoSongName")
    InfoSongName.innerHTML = data.name

    // song dry details
    let ul = document.getElementById("InfoSongDetails")


    let id = document.createElement("li")
    id.innerHTML = "<b>Id :</b> " + data.id
    GetTheNumberOfAppearanceInUserByGivenSong((num) => { // write the number of favorite for song (ליד הכמות השמעות)
        let NumberofFavoritesForSong = document.getElementById("NumberofFavoritesForSong")
        NumberofFavoritesForSong.innerHTML = num
    }, data.id)


    ul.appendChild(id)

    let SongArtistDetails = document.getElementById("SongArtistDetails")
    SongArtistDetails.innerHTML = data.artistName

    let SongLyricsDetails = document.getElementById("SongLyricsDetails")
    SongLyricsDetails.innerHTML = data.lyriclink

    GetNumberOfListenersToMusic((num) => {
        console.log(num)
        document.getElementById("ListenMusic").innerHTML = num
    }, data.id)

    // changing the info when play
    var listDiv = document.getElementById("SongPlayDetails");
    listDiv.setAttribute('data-song-id', '11');
    listDiv.setAttribute('data-song-name', data.name);
    listDiv.setAttribute('data-song-artist', data.artistName);
    listDiv.setAttribute('data-song-album', 'Sadness');
    listDiv.setAttribute('data-song-url', 'audio/ringtone-8.mp3');
    listDiv.setAttribute('data-song-cover', 'images/cover/small/11.jpg');
    let btnPlay = document.getElementById("SongPlay")
    btnPlay.onclick = () => {
        AddPlayedForSongByGivenUserId((status) => {
            console.log(status)
        }, data.id, User.id)
    }
    let ImgSongUrl = document.getElementById("ImgSongUrl")
    console.log(data)
    ImgSongUrl.src = data.urlLink
}
