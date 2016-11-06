var React = require("react");
var ReactDOM = require("react-dom");
var TestUtils = require("react-addons-test-utils");
var should = require("chai").should();

var store = require("../js/store");

var App = require("../js/components/app");
var SeedArtistForm = require("../js/components/seed-artist-form");
var RecommendationList = require("../js/components/recommendation-list");
var Recommendation = require("../js/components/recommendation");

var Artist = function(artistInput){
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

describe("Recommendation", function(){
  it("Displays recommendation", function(){
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
    var expectedUri = "https://embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE:"
    var expectedTracks = [];
    for (var i = 0 ; i < RECOMMENDATIONS[0].songList.tracks.length ; i++){
        expectedTracks.push(RECOMMENDATIONS[0].songList.tracks[i].id);
    }
    expectedUri += expectedTracks.join(",");

    widget.props.src.should.equal(expectedUri);

  });
});
