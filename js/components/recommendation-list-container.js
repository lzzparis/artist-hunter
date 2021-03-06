var React = require("react");
var connect = require("react-redux").connect;

var RecommendationList = require("./recommendation-list"); 

var mapStateToProps = function(state, props) {
  return {
    seedArtistName: state.seedArtistName,
    seedArtistId: state.seedArtistId,
    recommendations: state.recommendations
  };
};

var RecommendationListContainer = connect(mapStateToProps)(RecommendationList);

module.exports = RecommendationListContainer;
