
Parse.Cloud.define('other', () => {
	return 'file';
});

Parse.Cloud.define('sideHasWhitespace', () => {
	const PCString = require('@panda-clouds/string');

	return PCString.hasWhitespace('ya> <here');
});

Parse.Cloud.define('sideDoesntHasWhitespace', () => {
	const PCString = require('@panda-clouds/string');

	return PCString.hasWhitespace('no');
});
