const PCParseRunner = require('../src/PCParseRunner.js');
let Parse;

describe('test Mongo inserts', () => {
	const parseRunner = new PCParseRunner();

	parseRunner.parseVersion('3.1.3');

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
		expect.assertions(3);

		const data = { _id: 'ABC',
			foo: 'bar' };

		await parseRunner.insertOne('_User', data);

		const query = new Parse.Query('_User');
		const result = await query.find();

		expect(result).toHaveLength(1);
		expect(result[0].id).toBe('ABC');
		expect(result[0].get('foo')).toBe('bar');
	});

	it('should add many users to mongo', async () => {
		expect.assertions(2);

		const data = [{ _id: 'DEF',
			foo2: 'bar2' },
		{ _id: 'HIJ',
			foo2: 'bar2' }];

		await parseRunner.insertMany('_User', data);

		const query = new Parse.Query('_User');
		const result = await query.find();

		expect(result).toHaveLength(2);
		// we don't care "which" is at 0 just that it's one of the two
		expect(result[0].get('foo2')).toBe('bar2');
	});

	it('should throw insertOne', async () => {
		expect.assertions(1);

		const data = 'bad object';

		try {
			await parseRunner.insertOne('_User', data);
			expect(1).toBe(2);
		} catch (e) {
			expect(e.message).toBe('Cannot create property \'_id\' on string \'bad object\'');
		}
	});

	it('should throw insertMany', async () => {
		expect.assertions(1);

		const data = 'bad object';

		try {
			await parseRunner.insertMany('_User', data);
			expect(1).toBe(2);
		} catch (e) {
			expect(e.message).toBe('docs parameter must be an array of documents');
		}
	});
});
