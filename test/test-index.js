var React = require("react");
var ReactDOM = require("react-dom");
var TestUtils = require("react-addons-test-utils");
var should = require("chai").should();

var store = require("../js/store");

var App = require("../js/components/app");
var SeedArtistForm = require("../js/components/seed-artist-form");
var RecommendationList = require("../js/components/recommendation-list");
var Recommendation = require("../js/components/recommendation");
var Help = require("../js/components/help");

var Artist = function(artistInput) {
  this.name = artistInput.name;
  this.id = artistInput.id;
  this.images = artistInput.images;
  this.songList = artistInput.songList;
}

var RECOMMENDATIONS = [
    new Artist({name:"Beach Bats", id:"1234567890", 
        images:[{url:"http://placekitten.com/400/400"}], 
        songList:{tracks:[{id:'1'},{id:'2'},{id:'3'}]}
    }),
    new Artist({name:"Beach Bears", id:"0987654321", 
        images:[{url:"http://placekitten.com/420/410"}], 
        songList:{tracks:[{id:'0'},{id:'9'},{id:'8'}]}
    }),
    new Artist({name:"Beach Bills", id:"qwertyuiop", 
        images:[{url:"http://placekitten.com/430/450"}], 
        songList:{tracks:[{id:'q'},{id:'w'},{id:'e'}]}
    }),
    new Artist({name:"Beach 'Borgs", id:"poiuytrewq", 
        images:[{url:"http://placekitten.com/440/440"}], 
        songList:{tracks:[{id:'p'},{id:'o'},{id:'i'}]}
    })
]


describe("App", function() {
  it("Displays header and form", function() {
    var location = {pathname:"/"};
    var renderer = TestUtils.createRenderer();
    renderer.render(<App location={location}/>);
    var result = renderer.getRenderOutput();

    var nav = result.props.children[0];
    TestUtils.isElementOfType(nav,"Link");
    nav.props.className.should.equal("nav");
    nav.props.to.should.equal("/help");
    nav.props.children.should.equal("Wait, what is this?");

    var clearFix = result.props.children[1];
    clearFix.props.className.should.equal("clear-fix");

    var header = result.props.children[2];
    header.props.children.should.equal("Artist Hunter");

    var form = result.props.children[3];
    TestUtils.isElementOfType(form, "SeedArtistFormContainer");
  })
});

describe("Seed Artist Form", function() {
  it("Displays header, form, and result p", function() {
    var renderer = TestUtils.createRenderer();
    renderer.render(<SeedArtistForm />);
    var result = renderer.getRenderOutput();

    var form = result.props.children;
    form.type.should.equal("form");
    var textInput = form.props.children[0];
    textInput.type.should.equal("input");
    textInput.props.className.should.equal("artist-input-text");
    textInput.props.placeholder.should.equal("Enter an artist");

    var submitInput = form.props.children[1];
    submitInput.props.className.should.equal("artist-input-submit");
    submitInput.type.should.equal("input");
  });
});

describe("Recommendation list", function() {
  it("Displays recommendation list", function() {
    var renderer = TestUtils.createRenderer();
    renderer.render(<RecommendationList recommendations={RECOMMENDATIONS} seedArtistName="Beach Boys"/>);
    var result = renderer.getRenderOutput();

    var resultsP = result.props.children[1];
    resultsP.type.should.equal("p");
    resultsP.props.children[0].should.equal("Showing artists related to: ");
    resultsP.props.children[1].should.equal("Beach Boys");

    var recommendationListUl = result.props.children[2];
    recommendationListUl.props.className.should.equal("recommendation-list");

    for(var i=0 ; i < recommendationListUl.props.children.length; i++) {
      var recommendationLi = recommendationListUl.props.children[i];
      recommendationLi.props.recommendation.should.equal(RECOMMENDATIONS[i]);
    }
  });
});

describe("Recommendation", function() {
  it("Displays recommendation", function() {
    var renderer = TestUtils.createRenderer();
    renderer.render(<Recommendation recommendation={RECOMMENDATIONS[0]} />);
    var result = renderer.getRenderOutput();

    result.props.className.should.equal("recommendation");

    var nameH4 = result.props.children[0];
    nameH4.type.should.equal("h4");
    nameH4.props.children.should.equal(RECOMMENDATIONS[0].name);

    var image = result.props.children[1];
    image.type.should.equal("img");
    image.props.src.should.equal(RECOMMENDATIONS[0].images[0].url);

    var widget = result.props.children[2];
    widget.type.should.equal("iframe");
    var expectedUri = "https://embed.spotify.com/?uri=spotify:trackset:Beach%20Bats%20Top%203:"
    var expectedTracks = [];
    for (var i = 0 ; i < RECOMMENDATIONS[0].songList.tracks.length ; i++) {
        expectedTracks.push(RECOMMENDATIONS[0].songList.tracks[i].id);
    }
    expectedUri += expectedTracks.join(",");

    widget.props.src.should.equal(expectedUri);

  });
});

describe("Help", function() {
  it("Displays help", function() {
    var renderer = TestUtils.createRenderer();
    renderer.render(<Help />);

    var container = renderer.getRenderOutput();
    container.type.should.equal("div");
    container.props.className.should.equal("help-modal-container");

    var modal = container.props.children;
    modal.type.should.equal("div");
    modal.props.className.should.equal("help-modal");

    var header = modal.props.children[0];
    header.type.should.equal("h3");
    header.props.children.should.equal("What do I do?");

    var par = modal.props.children[1];
    par.type.should.equal("p");
    par.props.children.should.equal("Easy, just search for a musician and you'll get a random selection of related artists from Spotify, as well as a playlist of their top songs.")

  });
})
