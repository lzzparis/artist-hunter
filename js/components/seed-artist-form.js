var React = require("react");

var SeedArtistForm = React.createClass({
  formSubmit: function(event){
    event.preventDefault();
    console.log(this.refs.textIn.value);
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

module.exports = SeedArtistForm;
