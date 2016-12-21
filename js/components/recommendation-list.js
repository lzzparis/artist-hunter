var React = require("react");
var connect = require("react-redux").connect;

var Recommendation = require("./recommendation");

var RecommendationList = React.createClass({
  render: function() {
    var list = [];
    var resultsParagraph = "";
    var recommendations = this.props.recommendations;
    var resultsClass = "";

    if (this.props.seedArtistName == null) {
      resultsParagraph = "";
    } else if (this.props.seedArtistId == null) {
      resultsParagraph = "No results for: " + this.props.seedArtistName;
      resultsClass = "recommendation--no-results";

    } else {
      resultsParagraph = "Showing artists related to: " + this.props.seedArtistName;
    }
    for(var i = 0; i < recommendations.length; i++) {
      var relatedArtist = recommendations[i];
      list.push(<Recommendation key={i} recommendation={relatedArtist} />);
    };
    return(
      <div>
        {this.props.children}
        <p className={resultsClass}>{resultsParagraph}</p>
        <ul className="recommendation-list">
          {list}
        </ul>
      </div>
    );
  }
});

module.exports = RecommendationList;
