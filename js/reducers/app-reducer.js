var React = require("react");

var actions = require("../actions/actions");

var initialState = {
  seedArtistName: null,
  seedArtistId: null,
  topResultClass: "hideTopResult",
  numRecommendations:4,
  recommendations: []
};



var appReducer = function(state, action){
  state = state || initialState;
  if(action.type === actions.FETCH_ARTIST_ID_SUCCESS){
    return Object.assign( {}, state, 
                          {seedArtistName: action.artistName}, 
                          {seedArtistId: action.artistId},
                          {topResultClass: "showTopResult"});
  }
  else if(action.type === actions.FETCH_RECOMMENDATIONS_SUCCESS){
    return Object.assign({}, state, {recommendations: action.recommendations});
  }
  else if (action.type === actions.FETCH_TOP_SONGS_SUCCESS){
    console.log(action);
  }
  return state;
}

module.exports = appReducer;
