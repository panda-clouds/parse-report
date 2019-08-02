
const PCParseRunner = require('../src/PCParseRunner.js');
let Parse;

describe('full project', () => {
	const parseRunner = new PCParseRunner();

	parseRunner.parseVersion('3.1.3');
	parseRunner.projectDir(__dirname + '/../src/full-project');
	parseRunner.collectCoverage(false);
	parseRunner.injectCode(`
Parse.Cloud.define('injectedFunction', () => {
	return 28;
});

Parse.Cloud.define('injectedUseOfNodeModule', () => {
	const PCString = require('@panda-clouds/string');

	return PCString.hasWhitespace('no');
});
`);
	beforeAll(async () => {
		Parse = await parseRunner.startParseServer();
	}, 1000 * 60 * 2);

	afterAll(async () => {
		await parseRunner.cleanUp();
	});

	it('should return everest', async () => {
		expect.assertions(1);
		const result = await Parse.Cloud.run('injectedFunction');

		expect(result).toBe(28);
	});

	it('should use node module in injection', async () => {
		expect.assertions(1);
		const result = await Parse.Cloud.run('injectedUseOfNodeModule');

		expect(result).toBe(false);
	});
});
