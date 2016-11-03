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
      <ul className="recommendation-list">
        {list}
      </ul>
    );
  }
});

var mapStateToProps = function(state, props){
  return {
    recommendations: state.recommendations
  };
};

var RecommendationListContainer = connect(mapStateToProps)(RecommendationList);

module.exports = RecommendationListContainer;