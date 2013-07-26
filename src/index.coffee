module.exports = 
  string  : require("./string")
  dom     : require("./dom")


module.exports.default = if typeof window isnt undefined then module.dom else module.string