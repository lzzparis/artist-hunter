var React = require("react");
var connect = require("react-redux").connect;

var actions = require("../actions/actions");

var SeedArtistForm = React.createClass({
  formSubmit: function(event){
    event.preventDefault();
    var artistName = this.refs.textIn.value;
    console.log(artistName);
    this.props.dispatch(actions.fetchArtistId(artistName));
  },
  render: function(){
    return(
      <div>
        <h2>Enter an artist</h2>
        <form>
          <input className="artistInputText" type="text" ref="textIn" />
          <input className="artistInputSubmit" type="submit" onClick={this.formSubmit} />
        </form>
        <p className={this.props.topResultClass}>
          Top result: {this.props.seedArtistName}
        </p>
      </div>
    );
  }
});

var mapStateToProps = function(state, props){
  return{
    topResultClass: state.topResultClass,
    seedArtistName: state.seedArtistName
  }
}

var SeedArtistFormContainer = connect(mapStateToProps)(SeedArtistForm);


module.exports = SeedArtistFormContainer;
