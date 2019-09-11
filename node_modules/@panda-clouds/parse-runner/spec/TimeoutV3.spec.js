
const PCParseRunner = require('../src/PCParseRunner.js');

describe('check beforesave in v3', () => {
	const parseRunner = new PCParseRunner();

	const cloud =
`
const crash = bad value!
`;

	parseRunner.cloud(cloud);
	parseRunner.timeout(10);

	it('should timeout', async () => {
		expect.assertions(1);

		try {
			await parseRunner.startParseServer();
			expect(1).toBe(2);
		} catch (e) {
			await parseRunner.cleanUp();
			expect(1).toBe(1);
		}
	}, 1 * 60 * 1000);
});
