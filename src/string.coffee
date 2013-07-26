bindable = require "bindable"
ent      = require "ent"

class Node
  __isNode: true

class Container extends Node

  
  ###
  ###

  constructor: () ->
    @childNodes = []

  ###
  ###

  appendChild: (node) -> 

    # fragment?
    if node.nodeType is 11
      @appendChild(child) for child in node.childNodes.concat()  
      return

    @childNodes.push node
    @_link node

  ###
  ###

  removeChild: (child) ->
    i = @childNodes.indexOf child
    return unless ~i
    @childNodes.splice i, 1
    child.previousSibling?.nextSibling = child.nextSibling
    child.nextSibling?.previousSibling = child.previousSibling
    child.parentNode = undefined

  ###
  ###

  insertBefore: (newElement, before) ->

    if newElement.nodeType is 11
      for node in newElement.childNodes.concat().reverse()
        @insertBefore node, before
        before = node
      return

    @_splice @childNodes.indexOf(before), 0, newElement


  ###
  ###

  _splice: (index = -1, count, node) ->

    return unless ~index



    @childNodes.splice arguments...

    if node
      @_link node

  ###
  ###

  _link: (node) ->  

    unless node.__isNode
      throw new Error "cannot append non-node"

    # remove from the previous parent
    if node.parentNode and node.parentNode isnt @
      node.parentNode.removeChild node

    node.parentNode = @
    i = @childNodes.indexOf node

    # FFox compatible
    node.previousSibling = if i isnt 0 then @childNodes[i - 1] else undefined
    node.nextSibling     = if i isnt @childNodes.length - 1 then @childNodes[i + 1] else undefined

    node.previousSibling?.nextSibling = node
    node.nextSibling?.previousSibling = node






class Element extends Container

  ###
  ###

  nodeType: 3

  ###
  ###

  constructor: (@name) ->
    super()
    @attributes = {}

  ###
  ###

  setAttribute: (name, value) -> @attributes[name] = value


  ###
  ###

  toString: () ->
    buffer = ["<", @name]
    attribs = []

    for name of @attributes
      v = @attributes[name]
      attrbuff = name
      if v?
        attrbuff += "=\""+ent.encode(v)+"\""
      attribs.push attrbuff



    if attribs.length
      buffer.push " ", attribs.join " "

    buffer.push ">"
    buffer.push @childNodes...
    buffer.push "</", @name, ">"

    buffer.join ""




class Text extends Node

  ###
  ###

  nodeType: 3

  ###
  ###

  constructor: (@value) ->

  ###
  ###

  toString: () -> ent.encode @value


class Comment extends Text
  
  ###
  ###

  nodeType: 8

  ###
  ###


  toString: () -> "<!--#{super()}-->"



class Fragment extends Container
  
  ###
  ###

  nodeType: 11

  ###
  ###

  toString: () -> @childNodes.join ""



class StringNodeFactory extends require("./base")

  ###
  ###

  constructor: (@context) -> 
    @internal = new bindable.Object()

  ###
  ###

  createElement: (name) -> new Element name

  ###
  ###

  createTextNode: (text) -> new Text text

  ###
  ###

  createComment: (text) -> new Comment text

  ###
  ###

  createFragment: () -> 
    frag = new Fragment()
    for child in arguments
      frag.appendChild child
    frag

  ###
  ###

  parseHtml: (buffer) -> 

    # this should really parse HTML, but too much overhead
    @createTextNode buffer


module.exports = new StringNodeFactory()