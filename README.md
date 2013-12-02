Nofactor is DOM API adapter that's supported in node.js, and on the web. It's used for DOM creation / manipulation in [paperclip.js](/classdojo/paperclip.js). [![Alt ci](https://travis-ci.org/classdojo/nofactor.js.png)](https://travis-ci.org/classdojo/nofactor.js)


```javascript
var nofactor = require("nofactor"),
nostr = nofactor.string;


var element = nostr.createElement("div"),
element.setAttribute("id", "test");


console.log(element.toString()); //<div id="test"></div>
```
