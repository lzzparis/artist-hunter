var React = require("react");
var connect = require("react-redux").connect;
var router = require("react-router");
var Router = router.Router;
var hashHistory = router.hashHistory;

var actions = require("../actions/actions");

var SeedArtistForm = require("./seed-artist-form");

var mapStateToProps = function(state, props) {
  return {
    topResultClass: state.topResultClass,
  }
}

var SeedArtistFormContainer = connect(mapStateToProps)(SeedArtistForm);


module.exports = SeedArtistFormContainer;
