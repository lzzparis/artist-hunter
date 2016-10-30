var React = require("react");

var actions = require("../actions/actions");

var initialState = {
  seedArtist: null,
  recommendations: []
};


var appReducer = function(state, action){
  if(action.type === actions.FETCH_RECOMMEND_SUCCESS){
    console.log("woo!");
  }
}

module.exports = appReducer;
