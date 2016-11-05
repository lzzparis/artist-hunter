var React = require("react");
var ReactDOM = require("react-dom");
var TestUtils = require("react-addons-test-utils");
var should = require("chai").should();

var store = require("../js/store");

var App = require("../js/components/app");
var SeedArtistForm = require("../js/components/seed-artist-form");
var RecommendationList = require("../js/components/recommendation-list");

var Artist = function(artistInput){
  this.name = artistInput.name;
  this.id = artistInput.id;
  this.images = artistInput.images;
  this.songList = [];
}

var RECOMMENDATIONS = [
    new Artist({name:"Beach Bats", id:"1234567890", images:["http://placekitten.com/400/400"]}),
    new Artist({name:"Beach Bears", id:"0987654321", images:["http://placekitten.com/420/410"]}),
    new Artist({name:"Beach Bills", id:"qwertyuiop", images:["http://placekitten.com/430/450"]}),
    new Artist({name:"Beach 'Borgs", id:"poiuytrewq", images:["http://placekitten.com/440/440"]})
]

describe("App", function(){
  it("Displays header and form", function(){
    var renderer = TestUtils.createRenderer();
    renderer.render(<App />);
    var result = renderer.getRenderOutput();

    var header = result.props.children[0];
    header.props.children.should.equal("Artist Hunter");

    var form = result.props.children[1];
    TestUtils.isElementOfType(form, "SeedArtistFormContainer");
  })
});

describe("Seed Artist Form", function(){
  it("Displays header, form, and result p", function(){
    var renderer = TestUtils.createRenderer();
    renderer.render(<SeedArtistForm />);
    var result = renderer.getRenderOutput();

    var header = result.props.children[0];
    header.props.children.should.equal("Enter an artist");

    var form = result.props.children[1];
    form.type.should.equal("form");
    var textInput = form.props.children[0];
    textInput.type.should.equal("input");

    var submitInput = form.props.children[1];
    submitInput.type.should.equal("input");
  });
});

describe("Recommendation list", function(){
  it("Displays recommendation list", function(){
    var renderer = TestUtils.createRenderer();
    renderer.render(<RecommendationList recommendations={RECOMMENDATIONS} seedArtistName="Beach Boys"/>);
    var result = renderer.getRenderOutput();

    var resultsP = result.props.children[0];
    resultsP.type.should.equal("p");
    resultsP.props.children[0].should.equal("Top result: ");
    resultsP.props.children[1].should.equal("Beach Boys");

    var recommendationListUl = result.props.children[1];
    recommendationListUl.props.className.should.equal("recommendation-list");

    for(var i=0 ; i < recommendationListUl.props.children.length; i++){
      var recommendationLi = recommendationListUl.props.children[i];
      recommendationLi.props.recommendation.should.equal(RECOMMENDATIONS[i]);
    }
  });
});
