var React = require("react");

var Recommendation = function(props){
  var trackset = [];    
  console.log(props.recommendation);
  for(var i = 0 ; i < props.recommendation.songList.tracks.length; i++){
    trackset.push(props.recommendation.songList.tracks[i].id);
  };
  var commaTrackset = trackset.join(",");
  var playlistUri = "https://embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE:" 
                    + commaTrackset;
  var imageUrl = props.recommendation.images[0].url;

  return(
    <li className="recommendation">
      <h4>{props.recommendation.name}</h4>
      <img src={imageUrl} />
      <iframe src={playlistUri} frameBorder="0" allowTransparency="true"></iframe>
    </li>
  );
};

module.exports = Recommendation;