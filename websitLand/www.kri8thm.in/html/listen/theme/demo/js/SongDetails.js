
// $(document).ready(function () {
//     AddInfoSong(data)
// });
function LoadSongDetailsPage() {
    var data = JSON.parse(localStorage.getItem('SongDetails'));
    // console.log(data)
    AddInfoSong(data)
}
function AddInfoSong(data) {
    // number of play
    // let PlayNumberForSong = document.getElementById("PlayNumberForSong")
    // GetSongsForArtis((d) => { // adding the number of played for the song
    //     PlayNumberForSong.innerHTML = d
    // }, data.id)
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

    let Url = document.createElement("li")
    Url.innerHTML = `<a href="https://www.youtube.com/watch?v=${data.youtubeId}"><b>Youtube link</b> </a>`

    ul.appendChild(id)
    ul.appendChild(Url)

    let SongArtistDetails = document.getElementById("SongArtistDetails")
    SongArtistDetails.innerHTML = data.artistName

    let SongLyricsDetails = document.getElementById("SongLyricsDetails")
    SongLyricsDetails.innerHTML = data.lyriclink

    GetNumberOfListenersToMusic((num) => {
        console.log(num)
        document.getElementById("ListenMusic").innerHTML = num
    }, data.id)

    let FavoriteSongsNum = document.getElementById("FavoriteSongsNum")
    GetFavoriteSongByUserId((d)=>{
        for(item of d){
            if(item.id == data.id){
                FavoriteSongsNum.style.color = "red"
                FavoriteSongsNum.className = 'ri-heart-fill heart-empty';
            }
        }
    },User.id)
    FavoriteSongsNum.onclick = () => { // set favorite song to user
        if (FavoriteSongsNum.style.color == "red") {
            DeleteFavoriteSongToUser((d) => {
                FavoriteSongsNum.className = 'ri-heart-line heart-empty';
                FavoriteSongsNum.style.color = ""
                document.getElementById("NumberofFavoritesForSong").innerHTML = Number(document.getElementById("NumberofFavoritesForSong").innerHTML)-1 
            }, User.id, data.id)
        }
        else {
            PutFavoriteSongToUser((d) => {
                FavoriteSongsNum.className = 'ri-heart-fill heart-empty';
                FavoriteSongsNum.style.color = "red"
                document.getElementById("NumberofFavoritesForSong").innerHTML = Number(document.getElementById("NumberofFavoritesForSong").innerHTML)+1 
            }, User.id, data.id)
        }
    }

    // changing the info when play
    var listDiv = document.getElementById("SongPlayDetails");
    listDiv.setAttribute('data-song-id', '0');
    listDiv.setAttribute('data-song-name', data.name);
    listDiv.setAttribute('data-song-artist', data.artistName);
    // listDiv.setAttribute('data-song-album', 'Sadness');
    // listDiv.setAttribute('data-song-url', 'audio/ringtone-8.mp3');
    listDiv.setAttribute('data-song-cover', 'images/cover/small/11.jpg');
    let btnPlay = document.getElementById("SongPlay")
    btnPlay.onclick = () => {
        PlayButtonOnClick(data) 
    }

    let ImgSongUrl = document.getElementById("ImgSongUrl")
    console.log(data)
    ImgSongUrl.src = data.urlLink
}
