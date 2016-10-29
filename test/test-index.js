var React = require("react");
var TestUtils = require("react-addons-test-utils");
var should = require("chai").should();

var App = require("../js/components/app");

describe("App", function(){
  it("Prints Hello world", function(){
    var renderer = TestUtils.createRenderer();
    renderer.render(<App/>);
    var result = renderer.getRenderOutput();

    console.log(result);

    var paragraph = result.props.children;
    paragraph.should.equal("Hello world!");

  })

});