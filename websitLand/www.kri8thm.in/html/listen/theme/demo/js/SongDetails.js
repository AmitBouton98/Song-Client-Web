$(document).ready(function () {
    var data = JSON.parse(localStorage.getItem('SongDetails'));
    AddInfoSong(data)

});
function AddInfoSong(data) {
    // number of play
    let PlayNumberForSong = document.getElementById("PlayNumberForSong")
    GetSongsForArtis((d)=>{ // adding the number of played for the song
        PlayNumberForSong.innerHTML = d
    },data.id)
    // song name
    let InfoSongName = document.getElementById("InfoSongName")
    InfoSongName.innerHTML = data.name

    // song dry details
    let ul = document.getElementById("InfoSongDetails")


    let id = document.createElement("li")
    id.innerHTML = "<b>Id :</b> " + data.id

    let likes = document.createElement("li")
    likes.innerHTML =  "<b>Likes :</b> " + data.likes

    ul.appendChild(id)
    ul.appendChild(likes)

    let SongArtistDetails = document.getElementById("SongArtistDetails")
    SongArtistDetails.innerHTML = data.artistName

    let SongLyricsDetails = document.getElementById("SongLyricsDetails")
    SongLyricsDetails.innerHTML = data.lyriclink
}
