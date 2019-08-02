
const PCNumber = require('../src/PCNumber.js');

describe('test isNumber', () => {
	it('should pass 5', () => {
		expect.assertions(1);

		const results = PCNumber.isNumber(5);

		expect(results).toBe(true);
	});

	it('should pass 0', () => {
		expect.assertions(1);

		const results = PCNumber.isNumber(0);

		expect(results).toBe(true);
	});

	it('should pass -5', () => {
		expect.assertions(1);

		const results = PCNumber.isNumber(-5);

		expect(results).toBe(true);
	});

	it('should fail "5"', () => {
		expect.assertions(1);

		const results = PCNumber.isNumber('5');

		expect(results).toBe(false);
	});

	it('should fail null', () => {
		expect.assertions(1);

		const results = PCNumber.isNumber(null);

		expect(results).toBe(false);
	});

	it('should fail empty', () => {
		expect.assertions(1);

		const results = PCNumber.isNumber();

		expect(results).toBe(false);
	});

	it('should fail function', () => {
		expect.assertions(1);

		const func = () => {
			return 5;
		};

		const results = PCNumber.isNumber(func);

		expect(results).toBe(false);
	});
});
