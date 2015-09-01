var Node = require("./node");
var he   = require("he");

function Text (value) {
  this.nodeValue = value;
	this._encode = false;
}

Node.extend(Text, {

  /**
   */

  nodeType: 3,

  /**
   */

  getInnerHTML: function () {
    return ( this._nodeValue && this._encode ) ? he.encode( String( this._nodeValue ) ) : this._nodeValue;
  },

  /**
   */

  cloneNode: function () {
     var clone = new Text(this.nodeValue);
    clone._buffer = this._buffer;
    return clone;
  }
});

Object.defineProperty(Text.prototype, "nodeValue", {
  get: function() {
    return this._nodeValue;
  },
  set: function(value) {
    this._nodeValue = value;
		this._encode = true;
    this._triggerChange();
  }
});

module.exports = Text;
