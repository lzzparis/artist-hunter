var React = require("react");
var connect = require("react-redux").connect;
var router = require("react-router");
var Router = router.Router;
var hashHistory = router.hashHistory;

var actions = require("../actions/actions");

var SeedArtistForm = React.createClass({
  formSubmit: function(event) {
    event.preventDefault();
    var artistKeywords = this.refs.textIn.value;
    this.props.dispatch(actions.resetState());
    this.props.dispatch(actions.fetchArtistId(artistKeywords));
    hashHistory.push("/search");
  },
  render: function() {
    return(
      <div className="seed-artist-form">
        <h1>Artist Hunter</h1>    
        <form>
          <input className="artist-input-text" type="text" ref="textIn" placeholder="Enter an artist"/>
          <input className="artist-input-submit" type="submit" onClick={this.formSubmit} />
        </form>
      </div>
    );
  }
});


module.exports = SeedArtistForm;
