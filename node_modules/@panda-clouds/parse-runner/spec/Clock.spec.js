
const PCParseRunner = require('../src/PCParseRunner.js');
const moment = require('moment');
let Parse;

describe('full project', () => {
	const parseRunner = new PCParseRunner();

	parseRunner.projectDir(__dirname + '/../src/full-project');
	parseRunner.collectCoverage(false);

	beforeAll(async () => {
		Parse = await parseRunner.startParseServer();
	}, 1000 * 60 * 2);

	afterAll(async () => {
		await parseRunner.cleanUp();
	});

	it('should return now', async () => {
		expect.assertions(3);
		await parseRunner.setClock(new Date(1561494028357));
		const result = await Parse.Cloud.run('now');

		expect(result).toBe(1561494028357);

		const result3 = await parseRunner.getClock();

		expect(result3).toBe(1561494028357);

		await parseRunner.resetClock();

		const realNow = new Date().getTime();
		const result2 = await Parse.Cloud.run('now');

		// .toString().slice(0, -4) removed the milliseconds from the current time
		expect(realNow.toString().slice(0, -4)).toBe(result2.toString().slice(0, -4));
	});

	it('should return now with moment', async () => {
		expect.assertions(3);
		await parseRunner.setClock(moment(1561494021234));
		const result = await Parse.Cloud.run('now');

		expect(result).toBe(1561494021234);

		const result3 = await parseRunner.getClock();

		expect(result3).toBe(1561494021234);

		await parseRunner.resetClock();

		const realNow = new Date().getTime();
		const result2 = await Parse.Cloud.run('now');

		expect(realNow.toString().slice(0, -4)).toBe(result2.toString().slice(0, -4));
	});
});
