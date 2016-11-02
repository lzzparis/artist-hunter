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
      dispatch(fetchRecommendations(topArtistId));
    })
    //handle error
    .catch(function(error){
      console.error(error);
    });
  }
}


var FETCH_RECOMMENDATIONS_SUCCESS = "FETCH_RECOMMENDATIONS_SUCCESS";
var fetchRecommendationsSuccess = function(artist, recommendations){
  return{
    type: FETCH_RECOMMENDATIONS_SUCCESS,
    artistId: artistId,
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

var fetchRecommendations = function(artistId){
  return function(dispatch){
    console.log(artistId);
    var url = "https://api.spotify.com/v1/artists/"+artistId+"/related-artists"; 
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

    })
    .catch(function(error){});
   }

}

exports.FETCH_ARTIST_ID_SUCCESS = FETCH_ARTIST_ID_SUCCESS;
exports.fetchArtistIdSuccess = fetchArtistIdSuccess;
exports.FETCH_ARTIST_ID_ERROR = FETCH_ARTIST_ID_ERROR;
exports.fetchArtistIdError = fetchArtistIdError;
exports.fetchArtistId = fetchArtistId;

exports.FETCH_RECOMMENDATIONS_SUCCESS = FETCH_RECOMMENDATIONS_SUCCESS;
exports.fetchRecommendationsSuccess = fetchRecommendationsSuccess;
exports.FETCH_RECOMMENDATIONS_ERROR = FETCH_RECOMMENDATIONS_ERROR;
exports.fetchRecommendationsError = fetchRecommendationsError;
