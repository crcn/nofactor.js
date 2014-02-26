var BaseFactory = require("./base"),
factories       = require("factories");

function CustomFactory (mainFactory, elements) {
	BaseFactory.call(this);
	this._mainFactory = mainFactory;

	if (!mainFactory) {
		throw new Error("main factory must be provided. User string, or dom");
	}
	
	this._factories = {
		element: {}
	}

	if (elements) {
		this.registerElements(elements);
	}
}


BaseFactory.extend(CustomFactory, {

	/**
	 */

	registerElement: function (name, factory) {
		this._factories.element[name] = factories.factory.create(factory);
		return this;
	},

	/**
	 */

	registerElements: function (elements) {
		for (var name in elements) {
			this.registerElement(name, elements[name]);
		}
		return this;
	},

	/**
	 */

	createElement: function (name) {
		var factory = this._factories.element[name];
		if (factory) return factory.create(name);
		return this._mainFactory.createElement(name);
	},


	/**
	 */

	createComment: function (text) {
		return this._mainFactory.createTextNode(text);
	},

	/**
	 */

	createTextNode: function (text) {
		return this._mainFactory.createTextNode(text);
	},

	/**
	 */

	createFragment: function () {
		return this._mainFactory.createFragment.apply(this._mainFactory, arguments);
	},

	/**
	 */

	parseHtml: function (source) {
		return this._mainFactory.parseHtml(source);
	}
});

module.exports = function (mainFactory, elements) {
	return new CustomFactory(mainFactory, elements);
};