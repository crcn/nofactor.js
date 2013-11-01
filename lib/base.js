var structr = require("structr");

function BaseFactory () {

}

structr(BaseFactory, {

  /**
   */

  createElement: function (element) { },

  /**
   */

  createFragment: function () { },

  /**
   */

  createComment: function (value) { },

  /**
   */

  createTextNode: function (value) { },

  /**
   */

  parseHtml: function (content) { }
});



module.exports = BaseFactory;
