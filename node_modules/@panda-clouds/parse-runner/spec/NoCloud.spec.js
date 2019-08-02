const PCParseRunner = require('../src/PCParseRunner.js');
let Parse;

describe('test Mongo inserts', () => {
	const parseRunner = new PCParseRunner();

	parseRunner.parseVersion('3.1.3');
	// NOTICE: no cloud code here...


	beforeAll(async () => {
		Parse = await parseRunner.startParseServer();
	}, 1000 * 60 * 2);

	afterAll(async () => {
		await parseRunner.cleanUp();
	});

	beforeEach(async () => {
		await parseRunner.dropDB();
	}, 1000 * 60 * 2);

	it('should add a user to mongo', async () => {
		expect.assertions(1);

		const query = new Parse.Query('BlaNever');
		const results = await query.find();

		expect(results).toHaveLength(0);
	});
});
