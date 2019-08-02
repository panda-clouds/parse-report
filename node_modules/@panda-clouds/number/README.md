
PCNumber
=========
maintained by [PandaClouds.com](https://pandaclouds.com)

`PCNumber` is a lightweight JavaScript library for Node.js that provides additional Number methods.


Installation
------------

1. If you want to use this library, you first need to install the [Node.js](https://nodejs.org/en/).

2. When you install node.js, will also be installed [npm](https://www.npmjs.com/).

3. Please run the following command.

```
npm install --save @panda-clouds/number
```

Usage
-----

### Node.js

```javascript
const PCNumber = require('@panda-clouds/number');

// example usage
PCNumber.isNumber(5) // => true
PCNumber.isNumber("5") // => false
```

You can replace PCNumber with any variable.


Methods
-------

[Unit Tests] are an additional resource for learning functionality.

### - isNumber()

returns if the object is a number object

Example:

```javascript
PCNumber.isNumber(-5) // => true
PCNumber.isNumber(0) // => true
PCNumber.isNumber(5) // => true

PCNumber.isNumber("5") // => false
PCNumber.isNumber(null) // => false
PCNumber.isNumber() // => false
```

Contributions
-------------

Pull requests are welcome! here is a checklist to speed things up:

- modify `PCNumber.js`
- add unit tests in `PCNumber.spec.js`
- run `npm test`
- document method in `README.md`
- add your name to 'Contributors' in `README.md`


### Contributors

(Add your name)

- [*] [Marc Smith](https://github.com/mrmarcsmith)


[Unit Tests]: https://github.com/panda-clouds/string/blob/master/spec/PCNumber.spec.js
