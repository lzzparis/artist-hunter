var React = require("react");

var actions = require("../actions/actions");

var initialState = {
  seedArtistName: null,
  seedArtistId: null,
  topResultClass: "hideTopResult",
  numRecommendations:4,
  recommendations: [ ]
};


var initialStateForStyling = {
  seedArtistName: "Mott the Hoople",
  seedArtistId: 12345678,
  topResultClass: "showTopResult",
  numRecommendations:4,
  recommendations: [
    {artist:"Something1", images: ["http://placekitten/400/400"]},
    {artist:"Something2", images: ["http://placekitten/400/400"]},
    {artist:"Something3", images: ["http://placekitten/400/400"]},
    {artist:"Something4", images: ["http://placekitten/400/400"]},
  ]
} 

var Artist = function(artistInput){
  this.name = artistInput.name;
  this.id = artistInput.id;
  this.images = artistInput.images;
}

var appReducer = function(state, action){
  // state = state || initialState;
  state = state || initialStateForStyling;
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
  return state;
}

module.exports = appReducer;
