var protoclass  = require("protoclass");


function Node () {

}

protoclass(Node, {
  __isNode: true
});

module.exports = Node;