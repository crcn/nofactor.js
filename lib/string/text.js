var Node = require("./node"),
he      = require("he");



function Text (value, encode) {
  this.replaceText(value, encode);
}

Node.extend(Text, {

  /**
   */

  nodeType: 3,

  /**
   */

  toString: function () {
    return this.nodeValue;
  },

  /**
   */

  cloneNode: function () {
    return new Text(this.nodeValue);
  },

  /**
   */

  replaceText: function (value, encode) {
    this.nodeValue = encode ? he.encode(value) : value;
  }
});

module.exports = Text;