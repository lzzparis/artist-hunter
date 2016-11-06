var React = require("react");

var Recommendation = function(props){
  var trackset = [];    
  for(var i = 0 ; i < props.recommendation.songList.tracks.length; i++){
    trackset.push(props.recommendation.songList.tracks[i].id);
  };
  var encodedArtistName = props.recommendation.name.split(" ");
  encodedArtistName = encodedArtistName.join("%20");
  encodedArtistName = encodedArtistName.replace("&","%26");
  var commaTrackset = trackset.join(",");
  var playlistUri = "https://embed.spotify.com/?uri=spotify:trackset:"
                    + encodedArtistName + "%20Top%20" +
                    + trackset.length + ":"
                    + commaTrackset;
  var imageUrl = props.recommendation.images[0].url;

  return(
    <li className="recommendation">
      <h4>{props.recommendation.name}</h4>
      <img className="recommendation--image" src={imageUrl} />
      <iframe className="recommendation--playlist" src={playlistUri} frameBorder="0" allowTransparency="true"></iframe>
    </li>
  );
};

module.exports = Recommendation;