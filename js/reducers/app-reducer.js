var React = require("react");

var actions = require("../actions/actions");

var initialState = {
  seedArtistName: null,
  seedArtistId: null,
  numRecommendations:4,
  recommendations: []
};

var Artist = function(artistInput) {
  this.name = artistInput.name;
  this.id = artistInput.id;
  this.images = artistInput.images;
}

var appReducer = function(state, action) {
  state = state || initialState;
  if(action.type === actions.RESET_STATE) {
    return initialState;
  }
  else if(action.type === actions.FETCH_ARTIST_ID_SUCCESS) {
    return Object.assign( {}, state, 
                          {seedArtistName: action.artistName}, 
                          {seedArtistId: action.artistId},
                          {topResultClass: "showTopResult"});
  }
  else if (action.type === actions.FETCH_ARTIST_ID_ERROR) {
    return Object.assign( {}, state,
                          {seedArtistName: action.artistName},
                          {seedArtistId: null},
                          {recommendations: []});
  }
  else if (action.type === actions.FETCH_TOP_SONGS_SUCCESS) {
    var newRecommenations = state.recommendations.concat(action.recommendation);
    return Object.assign({}, state, {recommendations: newRecommenations});
  }
  return state;
}

module.exports = appReducer;
