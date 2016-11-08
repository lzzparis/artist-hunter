var React = require("react");
var ReactDOM = require("react-dom");

var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;
var IndexRoute = router.IndexRoute;
var Link = router.Link;

var SeedArtistFormContainer = require("./seed-artist-form-container");

var App = function(props){
  return (
    <div>
      <Link className="nav" to="/help">Wait, what is this?</Link>
      <h1>Artist Hunter</h1>    
      <SeedArtistFormContainer />
      {props.children}
    </div>
  );
};


module.exports = App;
