
PCString
=========
maintained by [PandaClouds.com](https://pandaclouds.com)

`PCString` is a lightweight JavaScript library for Node.js that provides additional String methods.


Installation
------------

1. If you want to use this library, you first need to install the [Node.js] (https://nodejs.org/en/).

2. When you install node.js, will also be installed [npm] (https://www.npmjs.com/).

3. Please run the following command.

```
npm install --save @panda-clouds/string
```

Usage
-----

### Node.js

```javascript
const PCString = require('@panda-clouds/string');

// example usage
PCString.isString('yup!'); // => true;
PCString.hasWhitespace('ABC'); // => false;
```

You can replace PCString with any variable.


Methods
-------

[Unit Tests] are an additional resource for learning functionality.

### - isString(string)

Returns whether a given object is a String.

Example:

```javascript
PCString.isString('ABC') // => true
PCString.isString(5) // => false
PCString.isString({}) // => false
PCString.isString([]) // => false
```

### - hasWhiteSpace(string)

returns true if the string has white space, false if not.


Example:

```javascript
PCString.hasWhitespace(' ') // => true
PCString.hasWhitespace('A B') // => true
PCString.hasWhitespace('AB') // => false
PCString.hasWhitespace('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-!@#$%^&*()') // => false
```


### - removeWhitespace(string)

Removes all white characters from the given string.

Example:

```javascript
PCString.removeWhitespace(' A B  C   D    ') // => 'ABCD'
PCString.removeWhitespace('	A	B	C			D	') // => 'ABCD'
PCString.removeWhitespace('\nA\nB\n\nC\n\n\nD\n\n\n\n') // => 'ABCD'
PCString.removeWhitespace(null) // => ''
```

### - domainSafeString(string)

Removes all non-domain-safe characters.

Example:

```javascript
PCString.domainSafeString('_A_B__C___D____') // => 'ABCD'
PCString.domainSafeString('	A	B	C			D	') // => 'ABCD'
PCString.domainSafeString('\nA\nB\n\nC\n\n\nD\n\n\n\n') // => 'ABCD'
PCString.domainSafeString(null) // => ''
```


Contributions
-------------

Pull requests are welcome! here is a checklist to speed things up:

- modify `PCString.js`
- add unit tests in `PCString.spec.js`
- run `npm test`
- document method in `README.md`
- add your name to 'Contributors' in `README.md`


### Contributors

(Add your name)

- [*] [Marc Smith](https://github.com/mrmarcsmith)


[Unit Tests]: https://github.com/panda-clouds/string/blob/master/spec/PCString.spec.js
