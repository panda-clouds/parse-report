
const PCParseRunner = require('../../src/PCParseRunner.js');
let Parse;

describe('no schema/ yes manual insert', () => {
	const parseRunner = new PCParseRunner();

	parseRunner.parseVersion('3.1.3');

	parseRunner.prefillMongo(async parseRunner => {
		const God = {
			_id: 'theBigMan',
		};

		await parseRunner.insertOne('People', God);

		const brad = {
			_id: 'Brad',
			nullValueCheck: null,
			number: 594,
			_p_createdBy: 'People$theBigMan',

		};

		await parseRunner.insertOne('People', brad);

		const sally = {
			_id: 'Sally',
			_p_createdBy: { __type: 'Pointer', className: 'People', objectId: 'theBigMan' },
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

	let ricksId;

	it('should find a person', async () => {
		expect.assertions(1);
		const rick = new Parse.Object('People');

		rick.set('nullValueCheck', 56);
		rick.set('number', 93);
		const theBigMan = new Parse.Object('People');

		theBigMan.id = 'theBigMan';
		rick.set('createdBy', theBigMan);

		const saved = await rick.save();

		ricksId = saved.id;
		expect(saved).toBeDefined();
		console.log(saved);

		const results = await parseRunner.find('People');

		console.log(results);
	});

	it('should find Rick', async () => {
		expect.assertions(2);
		const query = new Parse.Query('People');
		const sally = await query.get(ricksId);
		const createdBy = sally.get('createdBy');

		expect(createdBy).toBeDefined();
		expect(createdBy.id).toBe('theBigMan');
	});

	it('should find Brad', async () => {
		expect.assertions(4);
		const query = new Parse.Query('People');
		const brad = await query.get('Brad');
		const nullVar = brad.get('nullValueCheck');
		const num = brad.get('number');
		const createdBy = brad.get('createdBy');

		expect(num).toBe(594);
		expect(nullVar).toBeNull();

		const results = await parseRunner.find('_SCHEMA');

		console.log(results);
		console.log(createdBy);
		expect(createdBy).toBeDefined();
		expect(createdBy.id).toBe('theBigMan');
	});

	it('should find Sally', async () => {
		expect.assertions(2);
		const query = new Parse.Query('People');
		const sally = await query.get('Sally');
		const createdBy = sally.get('createdBy');

		expect(createdBy).toBeDefined();
		expect(createdBy.id).toBe('theBigMan');
	});
});

