var React = require("react");

var FETCH_ARTIST_ID_SUCCESS = "FETCH_ARTIST_ID_SUCCESS";
var fetchArtistIdSuccess = function(artistName, artistId){
  return{
    type: FETCH_ARTIST_ID_SUCCESS,
    artistName: artistName,
    artistId: artistId
  }
}

var FETCH_ARTIST_ID_ERROR = "FETCH_ARTIST_ID_ERROR";
var fetchArtistIdError = function(artistName, errorMessage){
  return{
    type: FETCH_ARTIST_ID_ERROR,
    artistName: artistName,
    errorMessage: errorMessage
  };
};

var fetchArtistId = function(artistName){
  return function(dispatch){
    var encodedArtistName = artistName.split(" ").join("+");
    var url = "https://api.spotify.com/v1/search?q="+encodedArtistName+"&type=artist";

    //execute fetch
    fetch(url)
    //check status
    .then(function(response){
      if(response.status < 200 || response.status >= 300){
        throw error;
      }
      return response
    })
    //parse data
    .then(function(response){
      return response.json();
    })
    //handle success
    .then(function(data){
      console.log(data);
      var topArtistName = data.artists.items[0].name;
      var topArtistId = data.artists.items[0].id;
      // return dispatch(fetchArtistIdSuccess(topArtistName, topArtistId));
      dispatch(fetchArtistIdSuccess(topArtistName, topArtistId));
      return topArtistId;
    })
    .then(function(topArtistId){
      return dispatch(fetchRecommendations(4, topArtistId));
    })
    //handle error
    .catch(function(error){
      console.error(error);
    });
  }
}


var FETCH_RECOMMENDATIONS_SUCCESS = "FETCH_RECOMMENDATIONS_SUCCESS";
var fetchRecommendationsSuccess = function(recommendations){
  return{
    type: FETCH_RECOMMENDATIONS_SUCCESS,
    recommendations: recommendations
  }
}

var FETCH_RECOMMENDATIONS_ERROR = "FETCH_RECOMMENDATIONS_ERROR";
var fetchRecommendationsError = function(artist, recommendations){
  return{
    type: FETCH_RECOMMENDATIONS_ERROR,
    artist: artist,
    recommendations: recommendations
  };
}


var Artist = function(artistInput){
  this.name = artistInput.name;
  this.id = artistInput.id;
  this.images = artistInput.images;
  this.songList = [];
}


var fetchRecommendations = function(quantity, artistId){
  return function(dispatch){
    console.log(artistId);
    var url = "https://api.spotify.com/v1/artists/"+artistId+"/related-artists"; 
    fetch(url)
    //check status
    .then(function(response){
      if(response.status < 200 || response.status >= 300){
        throw error;
      }
      return response;
    })
    //parse data
    .then(function(response){
      return response.json();
    })
    //handle success
    .then(function(data){
      var recommendationSubset = []
      for(var i = 0 ; i < 4; i++){
        var rand = Math.floor(Math.random() * data.artists.length);
        var relatedArtist = new Artist(data.artists[rand]);
        recommendationSubset.push(relatedArtist);
      }
      dispatch(fetchRecommendationsSuccess(recommendationSubset));
      return recommendationSubset;
    })
    .then(function(recommendationSubset){
      console.log(recommendationSubset);
      for(var i = 0 ; i < recommendationSubset.length ; i++){
        dispatch(fetchTopSongs(recommendationSubset[i]));
      }
      return;
    })
    .catch(function(error){
      console.error(error);
    });
   }
}

var FETCH_TOP_SONGS_SUCCESS = "FETCH_TOP_SONGS_SUCCESS";
var fetchTopSongsSuccess = function(artist){
  return {
    type: FETCH_TOP_SONGS_SUCCESS,
    recommendation: artist
  };
};

var fetchTopSongs = function(artist){
  return function(dispatch){
    var url = "https://api.spotify.com/v1/artists/"+artist.id+"/top-tracks?country=US"
    fetch(url)
    //check status
    .then(function(response){
      if(response.status < 200 || response.status >= 300){
        throw error;
      }
      return response;
    })
    //parse data
    .then(function(response){
      return response.json();
    })
    //handle success
    .then(function(data){
      artist.songList = data;
      return dispatch(fetchTopSongsSuccess(artist));
    })
    .catch(function(error){
      console.error(error);
    });
  };
};


exports.FETCH_ARTIST_ID_SUCCESS = FETCH_ARTIST_ID_SUCCESS;
exports.fetchArtistIdSuccess = fetchArtistIdSuccess;
exports.FETCH_ARTIST_ID_ERROR = FETCH_ARTIST_ID_ERROR;
exports.fetchArtistIdError = fetchArtistIdError;
exports.fetchArtistId = fetchArtistId;

exports.FETCH_RECOMMENDATIONS_SUCCESS = FETCH_RECOMMENDATIONS_SUCCESS;
exports.fetchRecommendationsSuccess = fetchRecommendationsSuccess;
exports.FETCH_RECOMMENDATIONS_ERROR = FETCH_RECOMMENDATIONS_ERROR;
exports.fetchRecommendationsError = fetchRecommendationsError;


exports.FETCH_TOP_SONGS_SUCCESS = FETCH_TOP_SONGS_SUCCESS;
exports.fetchTopSongsSuccess = fetchTopSongsSuccess;