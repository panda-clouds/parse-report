
PCReport
=========
maintained by [PandaClouds.com](https://pandaclouds.com)

`PCReport` provides a clean way to validate data in Parse Sever Cloud Code.


Installation
------------

1. If you want to use this library, you first need to install the [Node.js](https://nodejs.org/en/).

2. When you install node.js, will also be installed [npm](https://www.npmjs.com/).

3. Please run the following command.

```
npm install --save @panda-clouds/parse-report
```

Usage
-----

### Node.js

```javascript
const PCReport = require('@panda-clouds/parse-report');

// example usage
const report = new PCReport();

// Name of your file.
report.name('August 2019 Financial Report');

// The Keys you want to look for in the objects
// follows the patterns
// A. "keyOnObject"                     => displays "keyOnObject" as the CSV Column Title
// B. "CSV Title:keyOnObject"           => displays "CSV Title" as the CSV Title
// C. "CSV Title:keyOnObject.subValue"  => displays "CSV Title" as the CSV Title
// D. "keyOnObject.subValue"            => displays "keyOnObject" as the CSV Column Title
report.keys(['date','Cost Category:categ','Amount Spent:amt','Users First Name:user.firstName']);

// Fill the objects
// Alternativily, these objects could be fetched from the database
const userPointer = ...
let obj = new Parse.Object('Receipt');
obj.set('amt',2883);
obj.set('categ','car');
obj.set('date',new Date());
obj.set('nullKey',null);
obj.set('user',userPointer);
const saved = await obj.save();

report.objects([saved]);

// Output options:
// A: Get a CSV String
let csvString = report.getCSVString(); // returns a String

// B: Save a csv object as ParseFile 
let parseFile = await report.saveCSVFile() // returns a Parse.File

// C: Create a "Report" obejct that has a pointer to the report File
let parseReportObject = await report.saveCSVReport() // returns a Parse.Object

```

You can replace PCReport with any variable.


Methods
-------

[Unit Tests] are an additional resource for learning functionality.

### - keys() *Required*

the keys is the array of keys for the CSV string.

Example:

```javascript
const report = new PCReport();
// Name of your file.
report.keys(['date','My CSV Display Field:myKeyField']);
```

### - objects() *Required*

the objects is the array of Parse Objects to base the CSV values on

Example:

```javascript
const report = new PCReport();
// Name of your file.
report.objects([obj1, obj2]);
```

### - name()

the name of the file to be created in "saveCSVFile" function

Example:

```javascript
const report = new PCReport();
// Name of your file.
report.name('August 2019 Financial Report');
```

### - type()

the type of the file to be created in "saveCSVFile" function

Example:

```javascript
const report = new PCReport();
// Name of your file.
report.type('Financial Report');
```

### - timeZone()

the timeZone of the dates in the CSV String

Example:

```javascript
const report = new PCReport();
// Name of your file.
report.timeZone('America/Phoenix');
```

### - customBlock()

the customBlock allows for additional manipulation of the "Parse File" Report

Example:

```javascript
const report = new PCReport();
// Name of your file.
report.customBlock((report) =>{
	report.set("myCustomField","Custom Value")
	return report
});
```



Contributions
-------------

Pull requests are welcome! here is a checklist to speed things up:

- modify `PCReport.js`
- add unit tests in `PCReport.spec.js`
- run `npm test`
- document method in `README.md`
- add your name to 'Contributors' in `README.md`


### Contributors

(Add your name)

- [*] [Marc Smith](https://github.com/mrmarcsmith)


[Unit Tests]: https://github.com/panda-clouds/string/blob/master/spec/PCReport.spec.js
