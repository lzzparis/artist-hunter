var React = require("react");

var Recommendation = function(props){
  return(
    <li className="recommendation">
      <h4>{props.name}</h4>
      <img src={props.image} />
    </li>
  );
};

module.exports = Recommendation;