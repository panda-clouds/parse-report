const PCParseRunner = require('../src/PCParseRunner.js');
let Parse;
const version = '3.4.0';

describe('check beforesave in v' + version, () => {
	const parseRunner = new PCParseRunner();
	const cloud =
`
Parse.Cloud.define('challenge', request => {
	return 'everest';
});
Parse.Cloud.beforeSave('FailClass', request => {
	throw new Error('Saves to this class always fail');
})
Parse.Cloud.beforeSave('PassClass', request => {
	// passes by default
})`;

	parseRunner.parseVersion('3.4.0');
	parseRunner.cloud(cloud);

	beforeAll(async () => {
		Parse = await parseRunner.startParseServer();
	}, 1000 * 60 * 2);

	afterAll(async () => {
		await parseRunner.cleanUp();
	});

	it('should return everest', async () => {
		expect.assertions(2);
		const result = await Parse.Cloud.run('challenge');

		expect(result).toBe('everest');
		expect(result).not.toBe('superman');
	});

	it('passes when allowed by beforeSave', async () => {
		expect.assertions(2);
		const obj = new Parse.Object('PassClass');

		obj.set('mykey', 'value');
		const result = await obj.save();

		expect(result).toBeDefined();
		expect(result.className).toBe('PassClass');
	});

	it('fails when blocked by beforeSave', async () => {
		expect.assertions(2);
		const obj = new Parse.Object('FailClass');

		obj.set('mykey', 'value');

		try {
			await obj.save();
		} catch (error) {
			expect(error).toBeDefined();
			expect(error.message).toBe('Saves to this class always fail');
		}
	});

	it('dropDB should remove data', async () => {
		expect.assertions(5);
		const obj = new Parse.Object('PassClass');

		obj.set('mykey', 'value');
		const savedObj = await obj.save();

		expect(savedObj).toBeDefined();
		expect(savedObj.className).toBe('PassClass');

		const query = new Parse.Query('PassClass');
		const result = await query.first();

		expect(result).toBeDefined();
		expect(result.get('mykey')).toBe('value');

		await parseRunner.dropDB();

		const query2 = new Parse.Query('PassClass');
		const result2 = await query2.find();

		expect(result2).toHaveLength(0);
	}, 20 * 1000);
});
