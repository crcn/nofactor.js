var protoclass = require("protoclass");

function Style () {
  this._currentStyles = {};
}

protoclass(Style, {

  /**
   */

  _hasStyle: false,

  /**
   */


  setProperty: function(key, value) {

    if (value === "" || value == undefined) {
      delete this[key];
      return;
    }

    this[key] = value;
  },

  /**
   */

  reset: function (styles) {
    
    var styleParts = styles.split(/;\s*/);

    for (var i = 0, n = styleParts.length; i < n; i++) {
      var sp = styleParts[i].split(/:\s*/);

      if (sp[1] == undefined || sp[1] == "") {
        continue;
      }

      this[sp[0]] = sp[1];
    }
  },

  /**
   */

  toString: function () {
    var buffer = "", styles = this.getStyles();

    for (var key in styles) {
      buffer += key + ":" + styles[key] + ";"
    }

    return buffer;
  },

  /**
   */

  hasStyles: function () {
    if(this._hasStyle) return true;

    for (var key in this) {
      if (key.substr(0, 1) !== "_" && this[key] != undefined && this.constructor.prototype[key] == undefined) {
        return this._hasStyle = true;
      }
    }

    return false;
  },

  /**
   */

  hasChanged: function () {

    var newStyles       = this.getStyles(),
    oldStyles           = this._currentStyles;
    this._currentStyles = newStyles;

    for (var key in newStyles) {
      if (newStyles[key] !== oldStyles[key]) {
        return true;
      }
    }

    for (var key in oldStyles) {
      if (newStyles[key] !== oldStyles[key]) {
        return true;
      }
    }

    return false;
  },

  /**
   */

  getStyles: function () {
    var styles = {};
    for (var key in this) {
      var k = this[key];
      if (key.substr(0, 1) !== "_" && k !== "" && this[key] != undefined && this.constructor.prototype[key] == undefined) {
        styles[key] = this[key];
      }
    }
    return styles;
  }
});

module.exports = Style;