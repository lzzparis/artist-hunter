var React = require("react");
var ReactDOM = require("react-dom");

var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;
var IndexRoute = router.IndexRoute;
var Link = router.Link;


var App = require("./app");
var Help = require("./help");
var RecommendationListContainer = require("./recommendation-list-container");

var routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="help" component={Help} />
      <Route path="search" component={RecommendationListContainer}>
        <Route path="help" component={Help} />
      </Route>

      <Route component={RecommendationListContainer}>
        <Route path="help" component={Help} />
      </Route>
    </Route>
  </Router>
);

module.exports = routes;
