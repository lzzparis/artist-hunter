var React = require("react");
var ReactDOM = require("react-dom");

var router = require("react-router");
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;
var IndexRoute = router.IndexRoute;
var Link = router.Link;

var SeedArtistFormContainer = require("./seed-artist-form-container");

var App = function(props) {
  var relativeHelpUrl = props.location.pathname + "/help";
  relativeHelpUrl = relativeHelpUrl.replace("//","/");
  return (
    <div>
      <Link className="nav" to={relativeHelpUrl}>Wait, what is this?</Link>
      <div className="clear-fix"></div>
      <h1>Artist Hunter</h1>    
      <SeedArtistFormContainer />
      {props.children}
    </div>
  );
};


module.exports = App;
