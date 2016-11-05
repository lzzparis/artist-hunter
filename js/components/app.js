var React = require("react");
var ReactDOM = require("react-dom");

var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;
var IndexRoute = router.IndexRoute;
var Link = router.Link;

var SeedArtistFormContainer = require("./seed-artist-form");
var RecommendationListContainer = require("./recommendation-list");

var App = function(props){
  return (
    <div>
      <h1>Artist Hunter</h1>    
      <SeedArtistFormContainer />
      {props.children}
    </div>
  );
};

var routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="search" component={RecommendationListContainer} />
    </Route>
  </Router>
);

module.exports = routes;
