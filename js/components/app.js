var React = require("react");
var ReactDOM = require("react-dom");

var TasteKidForm = require("./taste-kid-form");

var App = function(){
  return (
    <div>
      <h1>Artist Hunter</h1>    
      <TasteKidForm />
    </div>
  );
};

module.exports = App;