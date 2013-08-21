
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

    childrenToArray = []

    for child in children
      childrenToArray.push child

    for child in childrenToArray
      frag.appendChild child

    frag


  ###
  ###

  parseHtml: (text) -> 
    div = @createElement "div"
    div.innerHTML = text
    @createFragment div.childNodes...





module.exports = new DomFactory()