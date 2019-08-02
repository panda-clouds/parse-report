const PCParseRunner = require('../src/PCParseRunner.js');

describe('invalid configurations', () => {
	it('should throw if we set cloud then projectDir', () => {
		expect.assertions(1);
		const parseRunner = new PCParseRunner();

		parseRunner.parseVersion('3.1.3');
		parseRunner.cloud('myCloud');

		try {
			parseRunner.projectDir('should/crash');
			expect(1).toBe(2);
		} catch (e) {
			expect(e.message).toBe('Only set projectDir OR cloud, Not Both.');
		}
	});

	it('should throw if we set projectDir then cloud', () => {
		expect.assertions(1);
		const parseRunner = new PCParseRunner();

		parseRunner.parseVersion('3.1.3');
		parseRunner.projectDir('/my/project');

		try {
			parseRunner.cloud('should crash!');
			expect(1).toBe(2);
		} catch (e) {
			expect(e.message).toBe('Only set projectDir OR cloud, Not Both.');
		}
	});
});
