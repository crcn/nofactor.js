var Element = require("./element");

function VoidElement () {
	Element.apply(this, arguments);
}

Element.extend(VoidElement, {
	toString: function () {
		return Element.prototype.toString.call(this).replace("></" + this._name + ">", "/>");
	},
	cloneNode: function () {
		var clone = new VoidElement(this._name);


	    for (var key in this._attrsByKey) {
	      clone.setAttribute(key, this._attrsByKey[key].value);
	    }

	    clone.setAttribute("style", this.style.toString());

	    return clone;
	}
});

/*
area, base, br, col, command, embed, hr, img, input,
keygen, link, meta, param, source, track, wbr
*/

["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track"].forEach(function (name) {
	exports[name] = VoidElement;
});