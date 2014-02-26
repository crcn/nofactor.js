var Container = require("./container"),
Style         = require("./style");

function Element (nodeName) {
  Element.superclass.call(this);

  this.nodeName    = nodeName.toUpperCase();
  this._name       = nodeName.toLowerCase();
  this.attributes  = [];
  this._attrsByKey = {};
  this.style       = new Style();
}

Container.extend(Element, {

  /**
   */

  nodeType: 3,

  /**
   */

  setAttribute: function (name, value) {


    name = name.toLowerCase();

    // if the name is a 
    if (name === "style") {
      return this.style.reset(value);
    }

    if (value == undefined) {
      return this.removeAttribute(name);
    }

    var abk;

    if (!(abk = this._attrsByKey[name])) {
      this.attributes.push(abk = this._attrsByKey[name] = {})
    }

    abk.name  = name;
    abk.value = value;
  },

  /**
   */

  removeAttribute: function (name) {

    for (var i = this.attributes.length; i--;) {
      var attr = this.attributes[i];
      if (attr.name == name) {
        this.attributes.splice(i, 1);
        break;
      }
    }

    delete this._attrsByKey[name];
  },

  /**
   */

  getAttribute: function (name) {
    var abk;
    if(abk = this._attrsByKey[name]) return abk.value;
  },

  /**
   */

  toString: function () {

    var buffer = "<" + this._name,
    attribs    =  "",
    attrbuff;

    for (var name in this._attrsByKey) {

      var v    = this._attrsByKey[name].value;
      attrbuff = name;

      if (name != undefined) {
        attrbuff += "=\"" + v + "\"";
      }

      attribs += " " + attrbuff;
    }

    if (this.style.hasStyles()) {
      attribs += " style=" + "\"" + this.style.toString() + "\"";
    }

    if (attribs.length) {
      buffer += attribs;
    }


    return buffer + ">" + this.childNodes.join("") + "</" + this._name + ">"
  },

  /**
   */

  cloneNode: function () {
    var clone = new Element(this.nodeName);

    for (var key in this._attrsByKey) {
      clone.setAttribute(key, this._attrsByKey[key].value);
    }

    clone.setAttribute("style", this.style.toString());

    for (var i = 0, n = this.childNodes.length; i < n; i++) {
      clone.appendChild(this.childNodes[i].cloneNode());
    }

    return clone;
  }
});

module.exports = Element;