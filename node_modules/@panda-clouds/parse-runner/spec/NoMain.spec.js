
const PCParseRunner = require('../src/PCParseRunner.js');
let Parse;

describe('full project', () => {
	const parseRunner = new PCParseRunner();

	// parseRunner.projectDir(__dirname + '/../src/full-project');
	parseRunner.collectCoverage(false);
	// parseRunner.main(''); // this should stop the project from being loaded

	beforeAll(async () => {
		Parse = await parseRunner.startParseServer();
	}, 1000 * 60 * 2);

	afterAll(async () => {
		await parseRunner.cleanUp();
	});

	it('should return everest', async () => {
		expect.assertions(1);

		// Because we set the main to '' even though the project is there
		// It shouldn't be loaded
		try {
			await Parse.Cloud.run('challenge');
			expect(1).toBe(2);
		} catch (e) {
			expect(e.message).toBe('Invalid function: "challenge"');
		}
	});
});
