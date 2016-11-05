var React = require("react");
var connect = require("react-redux").connect;
var router = require('react-router');
var Router = router.Router;
var hashHistory = router.hashHistory;

var actions = require("../actions/actions");

var SeedArtistForm = React.createClass({
  formSubmit: function(event){
    event.preventDefault();
    var artistName = this.refs.textIn.value;
    console.log(artistName);
    this.props.dispatch(actions.fetchArtistId(artistName));
    hashHistory.push("/search");
  },
  render: function(){
    return(
      <div>
        <h2>Enter an artist</h2>
        <form>
          <input type="text" ref="textIn" />
          <input type="submit" onClick={this.formSubmit} />
        </form>
      </div>
    );
  }
});

var mapStateToProps = function(state, props){
  return{
    topResultClass: state.topResultClass,
  }
}

var SeedArtistFormContainer = connect(mapStateToProps)(SeedArtistForm);


module.exports = SeedArtistFormContainer;
