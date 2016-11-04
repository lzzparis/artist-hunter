var React = require("react");

var Recommendation = function(props){
  // var trackset = [];    
  // for(var i = 0 ; i < props.songs.length; i++){
  //   trackset.push(props.recommendation.songs[i].uri);
  // };
  // var commaTrackset = trackset.join(",");
  // var playlistUri = "https://embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE:" 
  //                   + commaTrackset;
  var imageUrl = props.recommendation.images[0].url;
  
  return(
    <li className="recommendation">
      <h4>{props.recommendation.name}</h4>
      <img src={imageUrl} />
    </li>
  );
};

module.exports = Recommendation;