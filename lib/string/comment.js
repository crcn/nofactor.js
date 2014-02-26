var Text = require("./text");

function Comment () {
  Comment.superclass.apply(this, arguments);
}

Text.extend(Comment, {

  /**
   */

  nodeType: 8,

  /**
   */

  toString: function () {
    return "<!--" + Comment.__super__.toString.call(this) + "-->";
  },

  /**
   */

  cloneNode: function () {
    return new Comment(this.nodeValue);
  }
});

module.exports = Comment;