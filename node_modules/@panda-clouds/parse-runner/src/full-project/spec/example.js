
require('./otherFile.js');

Parse.Cloud.define('challenge', () => {
	return 'everest';
});

Parse.Cloud.define('pwd', () => {
	const testFolder = './cloud';
	const fs = require('fs');

	const all = fs.readdirSync(testFolder);

	return all;
});

Parse.Cloud.define('pwd-node', () => {
	const testFolder = './cloud/node_modules';
	const fs = require('fs');

	const all = fs.readdirSync(testFolder);

	return all;
});

Parse.Cloud.define('mainHasWhitespace', () => {
	const PCString = require('@panda-clouds/string');

	return PCString.hasWhitespace('ya> <here');
});

Parse.Cloud.define('mainDoesntHasWhitespace', () => {
	const PCString = require('@panda-clouds/string');

	return PCString.hasWhitespace('no');
});
