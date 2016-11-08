var React = require("react");

var Help = function(){
  return (
    <div className="help-modal-container">
      <div className="help-modal">
        <h3>What do I do?</h3>
        <p> Easy, just search for a musician and you'll get a random selection of related artists 
            from Spotify, as well as a playlist of their top songs.
        </p>
      </div>
    </div>
    
  );
}

module.exports = Help;