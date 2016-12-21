var React = require("react");
var router = require("react-router");
var hashHistory = router.hashHistory;

var Help = React.createClass({
  closeHelp:  function() {
    hashHistory.goBack();
  },
  render: function() {
    return (
      <div className="help-modal-container" onClick={this.closeHelp}>
        <div className="help-modal">
          <h3>What do I do?</h3>
          <p>Easy, just search for a musician and you'll get a random selection of related artists 
              from Spotify, as well as a playlist of their top songs.
          </p>
          <p>Created by <a href="http://lizzieparis.herokuapp.com/" target="_blank">Lizzie Paris</a>.</p>
        </div>
      </div>
    );
  }
});

module.exports = Help;
