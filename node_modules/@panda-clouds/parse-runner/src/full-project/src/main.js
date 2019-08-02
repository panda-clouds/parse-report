
require('./otherFile.js');

Parse.Cloud.define('codeCove1', () => {
	return 1;
});

Parse.Cloud.define('codeCove2', () => {
	return 2;
});

Parse.Cloud.define('now', () => {
	return new Date().getTime();
});

Parse.Cloud.define('NumberHelperReturn47', () => {
	const NumberHelper = require('./NumberHelper.js');

	return NumberHelper.return47();
});

Parse.Cloud.define('challenge', () => {
	return 'everest';
});

Parse.Cloud.define('selfChallenge', async () => {
	const result = await Parse.Cloud.run('challenge');

	return result;
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
