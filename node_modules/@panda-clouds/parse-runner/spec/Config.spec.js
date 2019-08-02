const PCParseRunner = require('../src/PCParseRunner.js');

describe('test Mongo inserts', () => {
	it('should throw if we change mongo ', async () => {
		expect.assertions(1);

		const parseRunner = new PCParseRunner();

		parseRunner.parseVersion('3.1.3');
		parseRunner.serverConfig({ appId: '' });

		try {
			await parseRunner.startParseServer();
			expect(1).toBe(2);
		} catch (e) {
			expect(e.message).toBe('Parse Server crashed. Please check logs to debug cloud or configuration issues.');
			await parseRunner.cleanUp();
		}
	}, 2 * 60 * 1000);
});
