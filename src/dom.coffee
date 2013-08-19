
class DomFactory extends require("./base")

  ###
  ###

  name: "dom"
  
  ###
  ###

  constructor: () ->

  ###
  ###

  createElement: (name) -> document.createElement name

  ###
  ###

  createTextNode: (text) -> document.createTextNode text

  ###
  ###

  createFragment: (children = []) -> 
    frag = document.createDocumentFragment() 
    `for(var i = children.length; i--;) {`
    frag.prependChild children[i]
    `}`

  ###
  ###

  parseHtml: (text) -> 
    div = @createElement "div"
    div.innerHTML = text
    @createFragment div.childNodes...





module.exports = new DomFactory()