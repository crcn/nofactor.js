var protoclass  = require("protoclass");


function Node () {

}

protoclass(Node, {

  /**
   */

  _hasChanged: true,

  /**
   */

  __isNode: true,

  /**
   */

  toString: function () {
    if (!this._hasChanged) return this._buffer;
    this._hasChanged = false;
    return this._buffer = this.getInnerHTML();
  },

  /**
   */

  _triggerChange: function () {
    if (this._hasChanged) return;
    this._hasChanged = true;
    if (this.parentNode) this.parentNode._triggerChange();
  }
});

module.exports = Node;