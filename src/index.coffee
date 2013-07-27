module.exports = 
  string  : require("./string")
  dom     : require("./dom")


module.exports.default = if (typeof process is "undefined") then module.exports.dom else module.exports.string