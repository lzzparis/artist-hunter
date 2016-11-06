var React = require("react");
var connect = require("react-redux").connect;

var Recommendation = require("./recommendation");

var RecommendationList = React.createClass({
  render: function(){
    var list = [];
    var recommendations = this.props.recommendations;
    for(var i = 0; i < recommendations.length; i++){
      var relatedArtist = recommendations[i];
      list.push(<Recommendation key={i} recommendation={relatedArtist} />);
    };
    return(
      <div>
        <p>Top result: {this.props.seedArtistName}</p>
        <ul className="recommendation-list">
          {list}
        </ul>
      </div>
    );
  }
});

module.exports = RecommendationList;