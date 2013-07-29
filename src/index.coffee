module.exports = 
  string  : require("./string")
  dom     : require("./dom")


module.exports.default = if (typeof window isnt "undefined") then module.exports.dom else module.exports.string