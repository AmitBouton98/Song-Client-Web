const api = "https://localhost:7281/api"

function ajaxCall(method, api, data, successCB, errorCB) {
    $.ajax({
        type: method, // Get/Post/Put/Delete/Patch
        url: api, // routing to the server
        data: data, // the data we pass in the body (if any…)
        cache: false, // allow caching
        contentType: "application/json", // the data format we expect back
        dataType: "json", // the data format that we send 
        success: successCB, // the success callback function
        error: errorCB // the error callback function
    });
}
function GetArtistInfo(callback, artist) {
    ajaxCall("Get", `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&api_key=458ecbf52daa3d11632dfc7fd9cb1d3f&format=json`, "", function (data) {
        //swal.fire("Update Sucsessfully!", "", "success");
        callback(data);
    }, (data) => {
        console.log("error")
    });
    return false;
}
function GetArtistUrl(callback, artistName) {

    const apiUrl = `https://api.spotify.com/v1/search?type=artist&q=${encodeURIComponent(artistName)}&decorate_restrictions=false&best_match=true&include_external=audio&limit=1`;
    // the access token i got from here (amit) ->  https://open.spotify.com/get_access_token?reason=transport&productType=web_player&_authfailed=1
    const accessToken = 'BQD4HABgheiN96QfdGmkHJnXklmbUGQqH4HuuaUoyqZB-wcaTwkAv6Vh62d4JTqqWOJ_W4jJZlqEM1EIZXMVQCKHgl1v0LRXCSu0-ZohG_Wdrw7gywyeYYD4DmRVXCYx7YNehpMtN-sA-pZs6j4ySlEYXzFev-EasY6labgB24wWqrPo9jtS2uFJqPbCVcWB-HJ3SR2hDTlPN9uuA67JzUE_28wDKEnfH3icVypjIqVV3VPg9LfVaxDknKTTO2-vO380VgDSvrAixmn53ya0cr6BE6vjY8btTorxWtINJcvEc1VRW_h-x05izgCY49JJ-1nVPRBSICXpPtBZMntWUMAaoVJ5","accessTokenExpirationTimestampMs';// access token

    fetch(apiUrl, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
        .then(response => response.json())
        .then(data => {
            callback(data)
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    return false;
}
function httpGet(theUrl)
{
    let xmlhttp;
    
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            return xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET", theUrl, false);
    xmlhttp.send();
    
    return xmlhttp.response;
}
function getSongByName(callback, name) {
    ajaxCall("GET", `${api}/SongMusics/GetSongByName/name/${name}`, "", function (data) {
        callback(data)
    }, NotFound);
    return false;
}
function getSongsByText(callback, text) {
    ajaxCall("GET", `${api}/SongMusics/GetSongByText/text/${text}`, "", function (data) {
        callback(data)
    }, NotFound);
    return false;
}
function getArtistByName(callback, name) {
    ajaxCall("GET", `${api}/ArtistMusics/GetArtistByName/name/${name}`, "", function (data) {
        callback(data)
    }, NotFound);
    return false;
}
function GetSongsForArtis(callback, artistName) {
    ajaxCall("GET", `${api}/SongMusics/GetByArtistName/artistName/${artistName}`, "", function (data) {
        callback(data)
    }, NotFound);
    return false;
}
function GetAllSongs(callback) {
    ajaxCall("GET", `${api}/SongMusics`, "", function (data) {
        callback(data)
    }, NotFound);
    return false;
}
function GetTop10GlobalSongs(callback) {
    ajaxCall("GET", `${api}/SongMusics/GetTop10GlobalSongs`, "", function (data) {
        callback(data)
    }, NotFound);
    return false;
}
'https://localhost:7281/api/SongMusics/GetSongsUserMightLike/UserId/2'
function GetSongsUserMightLike(callback, UserId) {
    ajaxCall("GET", `${api}/SongMusics/GetSongsUserMightLike/UserId/${UserId}`, "", function (data) {
        callback(data)
    }, NotFound);
    return false;
}
function GetNumberOfListenersToMusic(callback, SongId) {
    ajaxCall("GET", `${api}/SongMusics/GetTheNumberPlayedForGivenSong/SongId/${SongId}`, "", function (data) {
        callback(data)
    }, NotFound);
    return false;
}

function GetTheNumberOfAppearanceInUserByGivenSong(callback, SongId) {
    ajaxCall("GET", `${api}/SongMusics/GetTheNumberOfAppearanceInUserByGivenSong/SongId/${SongId}`, "", function (data) {
        callback(data)
    }, NotFound);
    return false;
}
function GetTheNumberOfAppearanceInUserByGivenArtist(callback, ArtistName) {
    ajaxCall("GET", `${api}/ArtistMusics/GetTheNumberOfAppearanceInUserByGivenArtist/ArtistName/${ArtistName}`, "", function (data) {
        callback(data)
    }, NotFound);
    return false;
}
function GetNumberOfPlayedForGivenArtist(callback, ArtistName) {
    ajaxCall("GET", `${api}/ArtistMusics/GetNumberOfPlayedForGivenArtist/ArtistName/${ArtistName}`, "", function (data) {
        callback(data)
    }, NotFound);
    return false;
}
function UpdateUserDetails(callback, first, last, email,id) {
    let User = {
        id: id,
        first: first,
        last: last,
        email: email,
        password: "string",
        imgUrl: "string", // need to check how to chenge it
        registrationDate: "2023-07-12T08:22:14.348Z" // random date
    }
    ajaxCall("POST", `${api}/UserMusics`, JSON.stringify(User), function (data) {
        callback(data)
    }, NotFound);
    return false;
}
function ChangePassowrdForUser(callback, id, OldPassowrd,NewPassword) {
    ajaxCall("PUT", `${api}/UserMusics/Put?id=${id}&password=${OldPassowrd}&passwordToChange=${NewPassword}`, "", function (data) {
        callback(data)
        swal.fire("Password Changed", "Secessfuly", "success");
    }, ()=>{
        swal.fire("Password Changed", "failed", "error");
    });
    return false;
}
function GetFavoriteSongByUserId(callback, UserId) {
    ajaxCall("GET", `${api}/SongMusics/GetFavoriteSongByUserId/UserId/${UserId}`, "", function (data) {
        callback(data)
    }, NotFound);
    return false;
}
function PutFavoriteSongToUser(callback, UserId,SongId) {
    ajaxCall("PUT", `${api}/SongMusics/Put?UserId=${UserId}&SongId=${SongId}`, "", function (data) {
        callback(data)
    }, NotFound);
    return false;
}
function DeleteFavoriteSongToUser(callback, UserId,SongId) {
    ajaxCall("DELETE", `${api}/SongMusics/Delete?UserId=${UserId}&SongId=${SongId}`, "", function (data) {
        callback(data)
    }, NotFound);
    return false;
}
function GetFavoriteArtistByUserId(callback, UserId) {
    ajaxCall("GET", `${api}/ArtistMusics/GetFavoriteArtistByUserId/UserId/${UserId}`, "", function (data) {
        callback(data)
    }, NotFound);
    return false;
}
function GetAllArtists(callback) {
    ajaxCall("GET", `${api}/ArtistMusics`, "", function (data) {
        callback(data)
    }, NotFound);
    return false;
}
function GetTop10ListenedArtists(callback) {
    ajaxCall("GET", `${api}/ArtistMusics/GetTop10Artists`, "", function (data) {
        callback(data)
    }, NotFound);
    return false;
}
function AddPlayedForSongByGivenUserId(callback, SongId,UserId) {
    ajaxCall("PUT", `${api}/SongMusics/CreateOrUpdateNumberOfPlayed?SongId=${SongId}&UserId=${UserId}`, "", function (data) {
        callback(data)
    }, NotFound);
    return false;
}
function GetAllFavoriteSongForGivenUserId(callback, UserId) {
    ajaxCall("GET", `${api}/SongMusics/GetFavoriteSongByUserId/UserId/${UserId}`, "", function (data) {
        callback(data)
    }, NotFound);
    return false;
}
function ChangeUrlByGivenSongId(callback, SongId, Url) {
    ajaxCall("PUT", `${api}/SongMusics/ChangeSongUrl?SongId=${SongId}&Url=${Url}`, "", function (data) {
        callback(data)
    }, ()=>{
        console.log("failed to change url")
    });
    return false;
}
function ChnageYoutubeId(callback, SongId, YoutubeId) {
    ajaxCall("PUT", `${api}/SongMusics/ChangeYoutubeIdSong?SongId=${SongId}&YoutubeId=${YoutubeId}`, "", function (data) {
        callback(data)
    }, ()=>{
        console.log("failed to change youtubeId")
    });
    return false;
}
function GetNumberOfUsers(callback) {
    ajaxCall("GET", `${api}/UserMusics/GetNumberOfUsers`, "", function (data) {
        callback(data)
    }, NotFound);
    return false;
}
function GetNumberOfSongs(callback) {
    ajaxCall("GET", `${api}/SongMusics/GetNumberOfSongs`, "", function (data) {
        callback(data)
    }, NotFound);
    return false;
}
function PutFavoriteArtistToUser(callback, UserId,Artist) {
    ajaxCall("PUT", `${api}/ArtistMusics/Put?UserId=${UserId}&ArtistName=${Artist}`, "", function (data) {
        callback(data)
    }, NotFound);
    return false;
}
function DeleteFavoriteArtistToUser(callback, UserId,Artist) {
    ajaxCall("DELETE", `${api}/ArtistMusics/Delete?UserId=${UserId}&ArtistName=${Artist}`, "", function (data) {
        callback(data)
    }, NotFound);
    return false;
}
function NotFound(error) {
    console.log("Not found")
    console.log(error.responseText)
}