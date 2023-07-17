var data = JSON.parse(localStorage.getItem('User'));

function LoadFavoritesPage(){
    GetAllFavoriteSongForGivenUserId((d)=>{
        for(item of d){
            AddSongToPage(item,"SongS")
        }
    },data.id)
}