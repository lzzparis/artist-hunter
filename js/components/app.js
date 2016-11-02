var React = require("react");
var ReactDOM = require("react-dom");

var SeedArtistFormContainer = require("./seed-artist-form");
var RecommendationListContainer = require("./recommendation-list");

var App = function(){
  return (
    <div>
      <h1>Artist Hunter</h1>    
      <SeedArtistFormContainer />
      <RecommendationListContainer />
    </div>
  );
};

module.exports = App;
