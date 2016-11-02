var React = require("react");

var actions = require("../actions/actions");

var initialState = {
  seedArtistName: null,
  seedArtistId: null,
  topResultClass: "hideTopResult",
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
  return state;
}

module.exports = appReducer;
