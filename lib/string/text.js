var Node = require("./node"),
ent      = require("./ent");



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
    this.nodeValue = encode ? ent(value) : value;
  }
});

module.exports = Text;