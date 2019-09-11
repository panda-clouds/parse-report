
const PCParseRunner = require('../src/PCParseRunner.js');

describe('isISO8601withTimeZone', () => {
	describe('with a T', () => {
		it('should pass 2020-08-02T09:37:11.356-07:00', () => {
			expect.assertions(1);
			const result = PCParseRunner.isISO8601withTimeZone('2020-08-02T09:37:11.356-07:00');

			expect(result).toBe(true);
		});

		it('should pass 2010-07-02T16:37:11.356Z', () => {
			expect.assertions(1);
			const result = PCParseRunner.isISO8601withTimeZone('2010-07-02T16:37:11.356Z');

			expect(result).toBe(true);
		});

		it('should fail 2018-08-02T09:37:11.356 no timezone', () => {
			expect.assertions(1);
			const result = PCParseRunner.isISO8601withTimeZone('2018-08-02T09:37:11.356');

			expect(result).toBe(false);
		});

		it('should fail 2018-08-02T09:37:11 no milliseconds', () => {
			expect.assertions(1);
			const result = PCParseRunner.isISO8601withTimeZone('2018-08-02T09:37:11');

			expect(result).toBe(false);
		});

		it('should fail 2018-08-02T09:37 no seconds', () => {
			expect.assertions(1);
			const result = PCParseRunner.isISO8601withTimeZone('2018-08-02T09:37');

			expect(result).toBe(false);
		});

		it('should fail 2018-08-02T09 no minutes', () => {
			expect.assertions(1);
			const result = PCParseRunner.isISO8601withTimeZone('2018-08-02T09');

			expect(result).toBe(false);
		});

		it('should fail 2018-08-02 no time', () => {
			expect.assertions(1);
			const result = PCParseRunner.isISO8601withTimeZone('2018-08-02');

			expect(result).toBe(false);
		});
	});

	describe('with a space', () => {
		it('should pass 2020-08-02 09:37:11.356-07:00', () => {
			expect.assertions(1);
			const result = PCParseRunner.isISO8601withTimeZone('2020-08-02 09:37:11.356-07:00');

			expect(result).toBe(true);
		});

		it('should pass 2010-07-02 16:37:11.356Z', () => {
			expect.assertions(1);
			const result = PCParseRunner.isISO8601withTimeZone('2010-07-02 16:37:11.356Z');

			expect(result).toBe(true);
		});

		it('should fail 2018-08-02 09:37:11.356 no timezone', () => {
			expect.assertions(1);
			const result = PCParseRunner.isISO8601withTimeZone('2018-08-02 09:37:11.356');

			expect(result).toBe(false);
		});

		it('should fail 2018-08-02 09:37:11 no milliseconds', () => {
			expect.assertions(1);
			const result = PCParseRunner.isISO8601withTimeZone('2018-08-02 09:37:11');

			expect(result).toBe(false);
		});

		it('should fail 2018-08-02 09:37 no seconds', () => {
			expect.assertions(1);
			const result = PCParseRunner.isISO8601withTimeZone('2018-08-02 09:37');

			expect(result).toBe(false);
		});

		it('should fail 2018-08-02 09 no minutes', () => {
			expect.assertions(1);
			const result = PCParseRunner.isISO8601withTimeZone('2018-08-02 09');

			expect(result).toBe(false);
		});

		it('should fail 2018-08-02 no time', () => {
			expect.assertions(1);
			const result = PCParseRunner.isISO8601withTimeZone('2018-08-02');

			expect(result).toBe(false);
		});
	});

	describe('fail', () => {
		it('should fail 1 string', () => {
			expect.assertions(1);
			const result = PCParseRunner.isISO8601withTimeZone('1');

			expect(result).toBe(false);
		});

		it('should fail 1234 string', () => {
			expect.assertions(1);
			const result = PCParseRunner.isISO8601withTimeZone('1234');

			expect(result).toBe(false);
		});

		it('should fail 1 number', () => {
			expect.assertions(1);
			const result = PCParseRunner.isISO8601withTimeZone(1);

			expect(result).toBe(false);
		});

		it('should fail 1234 number', () => {
			expect.assertions(1);
			const result = PCParseRunner.isISO8601withTimeZone(1234);

			expect(result).toBe(false);
		});

		it('should fail abc', () => {
			expect.assertions(1);
			const result = PCParseRunner.isISO8601withTimeZone('abc');

			expect(result).toBe(false);
		});

		it('should fail null', () => {
			expect.assertions(1);
			const result = PCParseRunner.isISO8601withTimeZone(null);

			expect(result).toBe(false);
		});

		it('should fail undefined', () => {
			expect.assertions(1);
			// eslint-disable-next-line no-undefined
			const result = PCParseRunner.isISO8601withTimeZone(undefined);

			expect(result).toBe(false);
		});

		it('should fail "a long string that has number 1234-1234-1234-1234-1234"', () => {
			expect.assertions(1);
			const result = PCParseRunner.isISO8601withTimeZone('a long string that has number 1234-1234-1234-1234-1234');

			expect(result).toBe(false);
		});

		it('should fail 1234-1234-1234-1234-1234', () => {
			expect.assertions(1);
			const result = PCParseRunner.isISO8601withTimeZone('1234-1234-1234-1234-1234');

			expect(result).toBe(false);
		});
	});
});
