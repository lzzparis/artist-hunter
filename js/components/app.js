var React = require("react");
var ReactDOM = require("react-dom");

var SeedArtistForm = require("./seed-artist-form");

var App = function(){
  return (
    <div>
      <h1>Artist Hunter</h1>    
      <SeedArtistForm />
    </div>
  );
};

module.exports = App;
