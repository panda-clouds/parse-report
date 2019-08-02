
const PCParseRunner = require('../src/PCParseRunner.js');
let Parse;

describe('full project', () => {
	const parseRunner = new PCParseRunner();

	parseRunner.parseVersion('3.1.3');

	parseRunner.prefillMongo(async parseRunner => {
		const schema = {
			_id: '_User',
			_metadata: {
				class_permissions: {
					get: {
						'*': true,
					},
					find: {
					},
					create: {
						'*': true,
					},
					update: {
						'*': true,
					},
					delete: {
					},
					addField: {
						'*': true,
					},
				},
				indexes: {
					_id_: {
						_id: 1,
					},
				},
			},
		};

		await parseRunner.insertOne('_SCHEMA', schema);
	});

	beforeAll(async () => {
		Parse = await parseRunner.startParseServer();
	}, 1000 * 60 * 2);

	afterAll(async () => {
		await parseRunner.cleanUp();
	});

	it('should fail searching for users', async () => {
		expect.assertions(1);
		const query = new Parse.Query(Parse.User);

		try {
			await query.find();
			expect(1).toBe(2);
		} catch (e) {
			expect(e.message).toBe('Permission denied for action find on class _User.');
		}
	});
});
