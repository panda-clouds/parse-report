
const PCParseRunner = require('../../src/PCParseRunner.js');
let Parse;

describe('yes schema/ no manual inserts', () => {
	const parseRunner = new PCParseRunner();

	parseRunner.prefillMongo(async parseRunner => {
		// Note: For testing the SCHEMA doesn't need to have ALL the keys
		// 	     Just the _id and all pointer and relations
		const schema = {
			_id: 'People',
			createdBy: '*People',
		};

		await parseRunner.insertOne('_SCHEMA', schema);

		const God = {
			_id: 'theBigMan',
		};

		await parseRunner.insertOne('People', God);

		const brad = {
			_id: 'Brad',
			nullValueCheck: null,
			number: 594,
			stringKey: 'hi',
			_p_createdBy: 'People$theBigMan',
			birthday: '2019-08-20T17:03:46.681Z',

		};

		await parseRunner.insertOne('People', brad);

		const sally = {
			_id: 'Sally',
			_p_createdBy: { __type: 'Pointer', className: 'People', objectId: 'theBigMan' },
			birthday: { __type: 'Date', iso: '2019-08-20T17:03:46.681Z' },
		};

		await parseRunner.insertOne('People', sally);

		// const results = await parseRunner.find('People');

		// console.log(results);
	});

	beforeAll(async () => {
		Parse = await parseRunner.startParseServer();
	}, 1000 * 60 * 2);

	afterAll(async () => {
		await parseRunner.cleanUp();
	});

	it('should find Brad', async () => {
		expect.assertions(6);
		const query = new Parse.Query('People');
		const brad = await query.get('Brad');
		const nullVar = brad.get('nullValueCheck');
		const num = brad.get('number');
		const stringKey = brad.get('stringKey');
		const createdBy = brad.get('createdBy');
		const birthday = brad.get('birthday');

		expect(num).toBe(594);
		expect(nullVar).toBeNull();

		const results = await parseRunner.find('_SCHEMA');

		console.log(results);
		console.log(createdBy);
		expect(createdBy).toBeDefined();
		expect(createdBy.id).toBe('theBigMan');
		expect(stringKey).toBe('hi');
		expect(birthday.getTime()).toBe(1566320626681);
	});

	it('should find Sally', async () => {
		expect.assertions(3);
		const query = new Parse.Query('People');
		const sally = await query.get('Sally');
		const createdBy = sally.get('createdBy');
		const birthday = sally.get('birthday');

		expect(createdBy).toBeDefined();
		expect(createdBy.id).toBe('theBigMan');
		expect(birthday.getTime()).toBe(1566320626681);
	});
});
