var React = require("react");
var TestUtils = require("react-addons-test-utils");
var should = require("chai").should();

var App = require("../js/components/app");
var SeedArtistFormContainer = require("../js/components/seed-artist-form");

describe("App", function(){
  it("Displays header and form", function(){
    var renderer = TestUtils.createRenderer();
    renderer.render(<App/>);
    var result = renderer.getRenderOutput();

    var header = result.props.children[0];
    header.props.children.should.equal("Artist Hunter");

    var form = result.props.children[1];
    TestUtils.isElementOfType(form, "SeedArtistFormContainer");

  })

});

describe("Seed Artist Form", function(){
  //it("Contains")

});