var Element = require("./element");

function VoidElement () {
	Element.apply(this, arguments);
}

Element.extend(VoidElement, {
	toString: function () {
		return "<" + this._name + "/>";
	},
});

/*
area, base, br, col, command, embed, hr, img, input,
keygen, link, meta, param, source, track, wbr
*/

["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track"].forEach(function (name) {
	exports[name] = VoidElement;
});