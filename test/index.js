let assert = require("power-assert");
let sinon = require("sinon");
let _html2jsx = require("../lib/index");

describe("html2jsx-loader", function () {
  let html2jsx, cachable;
  beforeEach(function () {
    cachable = sinon.spy();
    html2jsx = _html2jsx.bind({ cachable });
  });

  describe("html", function () {
    let source = "<h1>Hello! World</h1>";
    let expected =
`module.exports = React.createClass({
  render: function() {
    return (

      <h1>Hello! World</h1>
    );
  }
});`;

    let actual;
    beforeEach(function () {
      actual = html2jsx(source);
    });

    it("should convert html to JSX", function () {
      assert(actual === expected);
    });

    it("should call this.cachable", function () {
      assert.ok(cachable.calledOnce);
    });
  });

  describe("for -> htmlFor", function () {
    let source =
`<div>
  <label for="some-id">
    hoge hoge
  </label>
</div>`;
    let expected =
`module.exports = React.createClass({
  render: function() {
    return (

      <div>
        <label htmlFor="some-id">
          hoge hoge
        </label>
      </div>
    );
  }
});`;

    let actual;
    beforeEach(function () {
      actual = html2jsx(source);
    });

    it("should convert 'for' to 'htmlFor'", function () {
      assert(actual === expected);
    });

    it("should call this.cachable", function () {
      assert.ok(cachable.calledOnce);
    });
  });

  describe("class -> className", function () {
    let source =
`<div class="ex-class-name">
  hoge hoge
</div>`;
    let expected =
`module.exports = React.createClass({
  render: function() {
    return (

      <div className="ex-class-name">
        hoge hoge
      </div>
    );
  }
});`;

    let actual;
    beforeEach(function () {
      actual = html2jsx(source);
    });

    it("should convert 'class' to 'className'", function () {
      assert(actual === expected);
    });

    it("should call this.cachable", function () {
      assert.ok(cachable.calledOnce);
    });
  });


});
