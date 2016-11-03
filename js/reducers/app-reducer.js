var React = require("react");

var actions = require("../actions/actions");

var initialState = {
  seedArtistName: null,
  seedArtistId: null,
  topResultClass: "hideTopResult",
  numRecommendations:4,
  recommendations: []
};


var Artist = function(artistInput){
  this.name = artistInput.name;
  this.id = artistInput.id;
  this.images = artistInput.images;
}

var appReducer = function(state, action){
  state = state || initialState;
  if(action.type === actions.FETCH_ARTIST_ID_SUCCESS){
    return Object.assign( {}, state, 
                          {seedArtistName: action.artistName}, 
                          {seedArtistId: action.artistId},
                          {topResultClass: "showTopResult"});
  }
  else if(action.type === actions.FETCH_RECOMMENDATIONS_SUCCESS){
    var recommendationSubset = []
    for(var i = 0 ; i < state.numRecommendations; i++){
      var rand = Math.floor(Math.random()*state.numRecommendations);
      var relatedArtist = new Artist(action.recommendations[rand]);
      recommendationSubset.push(relatedArtist);
    }
    return Object.assign({}, state, {recommendations: recommendationSubset});
  }
  else if (action.type === actions.FETCH_TOP_SONGS_SUCCESS){
    console.log(action);
  }
  return state;
}

module.exports = appReducer;
