const PCParseRunner = require('@panda-clouds/parse-runner');
let Parse;
const BBReportError = require('../src/PCReportError.js');

describe('the PCReport.js class', () => {
	const parseRunner = new PCParseRunner();

	parseRunner.helperClass('./PCReport.js');
	parseRunner.projectDir(__dirname + '/..');
	parseRunner.prefillMongo(async parseRunner => {
		await parseRunner.insertOne('MyInnerClass', { _id: 'ABC123', bar: 56 });
	});
	parseRunner.injectCode(`
const PCReport = require('./PCReport.js');

Parse.Cloud.define('missingKeys', request => {
	const report = new PCReport();

	report.name('test 1');

	let obj = new Parse.Object('MyClass');
	obj.set('foo','bar');
	report.objects([obj]);

	return report.getCSVString();
});


Parse.Cloud.define('missingObjects', request => {
	const report = new PCReport();

	report.name('test 1');
	report.keys(['basketball']);

	return report.getCSVString();
});

Parse.Cloud.define('stringValue', request => {
	const report = new PCReport();

	report.name('test 1');
	report.keys(['My Foo:foo']);

	let obj = new Parse.Object('MyClass');
	obj.set('foo','bar');
	report.objects([obj]);

	return report.getCSVString();
});

Parse.Cloud.define('numberValue', request => {
	const report = new PCReport();

	report.name('test 1');
	report.keys(['My Foo:foo']);

	let obj = new Parse.Object('MyClass');
	obj.set('foo',43);
	report.objects([obj]);

	return report.getCSVString();
});

Parse.Cloud.define('dateValue', request => {
	const report = new PCReport();

	report.name('test 1');
	report.keys(['My Foo:foo']);

	let obj = new Parse.Object('MyClass');
	const dateValue = new Date(1563580937334);
	obj.set('foo',dateValue);
	report.objects([obj]);

	return report.getCSVString();
});

Parse.Cloud.define('pointerValue', async request => {
	const report = new PCReport();

	report.name('test 1');
	report.keys(['My Foo:foo']);

	let inner = new Parse.Object('MyInnerClass');
	inner.id = 'ABC123';

	const results = await inner.save();

	let obj = new Parse.Object('MyClass');
	obj.set('foo',results);
	report.objects([obj]);

	return report.getCSVString();
});

Parse.Cloud.define('nullValue', request => {
	const report = new PCReport();

	report.name('test 1');
	report.keys(['My Foo:foo']);

	let obj = new Parse.Object('MyClass');
	obj.set('foo',null);
	report.objects([obj]);

	return report.getCSVString();
});




Parse.Cloud.define('noValue', request => {
	const report = new PCReport();

	report.name('test 1');
	report.keys(['My Foo:foo']);

	let obj = new Parse.Object('MyClass');
	obj.set('fooblasndflnaisdncu',5);
	report.objects([obj]);

	return report.getCSVString();
});

Parse.Cloud.define('undefinedValue', request => {
	const report = new PCReport();

	report.name('test 1');
	report.keys(['My Foo:foo']);

	let obj = new Parse.Object('MyClass');
	obj.set('foo',undefined);
	report.objects([obj]);

	return report.getCSVString();
});

Parse.Cloud.define('fullSymphony', async request => {
	const report = new PCReport();

	report.name('test 1');
	report.keys(['My String:str','My Number:num','My Date:dat','My Pointer:poi','My Null:nul','My Never set:never']);

	let obj = new Parse.Object('MyClass');
	obj.set('str','bar');
	obj.set('num',94);
	// Date
	const dateValue = new Date(1563580937334);
	obj.set('dat',dateValue);
	// Pointer
	let inner = new Parse.Object('MyInnerClass');
	inner.id = 'ABC123';
	const results = await inner.save();
	obj.set('poi',results);
	obj.set('nul',null);


	report.objects([obj]);

	return report.getCSVString();
});

Parse.Cloud.define('formatCSVPrimative_Date', request => {
	const report = new PCReport();
	const dateValue = new Date(1563580937334);

	return report.formatCSVPrimative(dateValue);
});

Parse.Cloud.define('formatCSVPrimative_Date_Dubai_Timezone', request => {
	const report = new PCReport();
	report.timeZone('Asia/Dubai')
	const dateValue = new Date(1563580937334);

	return report.formatCSVPrimative(dateValue);
});

Parse.Cloud.define('formatCSVPrimative_Number', request => {
	const report = new PCReport();

	return report.formatCSVPrimative(42);
});

Parse.Cloud.define('formatCSVPrimative_null', request => {
	const report = new PCReport();

	return report.formatCSVPrimative(null);
});

Parse.Cloud.define('formatCSVPrimative_undefined', request => {
	const report = new PCReport();

	return report.formatCSVPrimative(undefined);
});


Parse.Cloud.define('formatCSVPrimative_nothing', request => {
	const report = new PCReport();

	return report.formatCSVPrimative();
});

Parse.Cloud.define('formatCSVPrimative_true', request => {
	const report = new PCReport();

	return report.formatCSVPrimative(true);
});

Parse.Cloud.define('formatCSVPrimative_false', request => {
	const report = new PCReport();

	return report.formatCSVPrimative(false);
});

Parse.Cloud.define('formatCSVPrimative_true_string', request => {
	const report = new PCReport();

	return report.formatCSVPrimative('true');
});

Parse.Cloud.define('formatCSVPrimative_false_string', request => {
	const report = new PCReport();

	return report.formatCSVPrimative('false');
});

Parse.Cloud.define('formatCSVPrimative_escape_string', request => {
	const report = new PCReport();

	return report.formatCSVPrimative("my \\"bad \\n string ");
});
`);

	beforeAll(async () => {
		Parse = await parseRunner.startParseServer();
	}, 1000 * 60 * 2);

	afterAll(async () => {
		await parseRunner.cleanUp();
	});

	describe('getCSVString', () => {
		it('should pass stringValue', async () => {
			expect.assertions(1);

			const results = await Parse.Cloud.run('stringValue');

			expect(results).toBe('My Foo,\n"bar"\n');
		});

		it('should pass numberValue', async () => {
			expect.assertions(1);

			const results = await Parse.Cloud.run('numberValue');

			expect(results).toBe('My Foo,\n43\n');
		});

		it('should pass dateValue', async () => {
			expect.assertions(1);

			const results = await Parse.Cloud.run('dateValue');

			expect(results).toBe('My Foo,\n"July 20, 2019 12:02 AM"\n');
		});

		it('should pass pointerValue', async () => {
			expect.assertions(1);

			const results = await Parse.Cloud.run('pointerValue');

			expect(results).toBe('My Foo,\nABC123\n');
		});

		it('should pass nullValue', async () => {
			expect.assertions(1);

			const results = await Parse.Cloud.run('nullValue');

			expect(results).toBe('My Foo,\n(null)\n');
		});

		it('should pass noValue', async () => {
			expect.assertions(1);

			const results = await Parse.Cloud.run('noValue');

			expect(results).toBe('My Foo,\n(null)\n');
		});

		it('should pass undefinedValue', async () => {
			expect.assertions(1);

			const results = await Parse.Cloud.run('undefinedValue');

			expect(results).toBe('My Foo,\n(null)\n');
		});

		it('should fail missingObjects', async () => {
			expect.assertions(1);

			await expect(Parse.Cloud.run('missingObjects')).rejects.toThrow(BBReportError.missing_objects());
		});

		it('should fail missingKeys', async () => {
			expect.assertions(1);

			await expect(Parse.Cloud.run('missingKeys')).rejects.toThrow(BBReportError.missing_keys());
		});

		it('should pass fullSymphony', async () => {
			expect.assertions(1);

			const results = await Parse.Cloud.run('fullSymphony');

			expect(results).toBe('My String,My Number,My Date,My Pointer,My Null,My Never set,\n"bar",94,"July 20, 2019 12:02 AM",ABC123,(null),(null)\n');
		});
	});

	describe('formatCSVPrimative', () => {
		it('should pass formatCSVPrimative_Date', async () => {
			expect.assertions(1);

			const results = await Parse.Cloud.run('formatCSVPrimative_Date');

			expect(results).toBe('"July 20, 2019 12:02 AM"');
		});

		it('should pass formatCSVPrimative_Date_Dubai_Timezone', async () => {
			expect.assertions(1);

			const results = await Parse.Cloud.run('formatCSVPrimative_Date_Dubai_Timezone');

			expect(results).toBe('"July 20, 2019 4:02 AM"');
		});

		it('should pass numberValue', async () => {
			expect.assertions(1);

			const results = await Parse.Cloud.run('formatCSVPrimative_Number');

			expect(results).toBe(42);
		});

		it('should pass formatCSVPrimative_null', async () => {
			expect.assertions(1);

			const results = await Parse.Cloud.run('formatCSVPrimative_null');

			expect(results).toBe('(null)');
		});

		it('should pass formatCSVPrimative_undefined', async () => {
			expect.assertions(1);

			const results = await Parse.Cloud.run('formatCSVPrimative_undefined');

			expect(results).toBe('(null)');
		});

		it('should pass formatCSVPrimative_nothing', async () => {
			expect.assertions(1);

			const results = await Parse.Cloud.run('formatCSVPrimative_nothing');

			expect(results).toBe('(null)');
		});

		it('should pass formatCSVPrimative_false', async () => {
			expect.assertions(1);

			const results = await Parse.Cloud.run('formatCSVPrimative_false');

			expect(results).toBe(false);
		});

		it('should pass formatCSVPrimative_true', async () => {
			expect.assertions(1);

			const results = await Parse.Cloud.run('formatCSVPrimative_true');

			expect(results).toBe(true);
		});

		it('should pass formatCSVPrimative_false_string', async () => {
			expect.assertions(1);

			const results = await Parse.Cloud.run('formatCSVPrimative_false_string');

			expect(results).toBe(false);
		});

		it('should pass formatCSVPrimative_true_string', async () => {
			expect.assertions(1);

			const results = await Parse.Cloud.run('formatCSVPrimative_true_string');

			expect(results).toBe(true);
		});

		it('should pass formatCSVPrimative_escape_string', async () => {
			expect.assertions(1);

			const results = await Parse.Cloud.run('formatCSVPrimative_escape_string');

			expect(results).toBe('"my "bad \n string "');
		});
	});

	describe('parseMachineKeyForSubKey', () => {
		it('should handle foo.bar', async () => {
			expect.assertions(1);
			const result = await parseRunner.callHelper('parseMachineKeyForSubKey', ['foo.bar']);

			expect(result).toBe('bar');
		});

		it('should handle foo', async () => {
			expect.assertions(1);
			const result = await parseRunner.callHelper('parseMachineKeyForSubKey', ['foo']);

			expect(result).toBeUndefined();
		});
	});

	describe('parseMachineKeyForOriginalKey', () => {
		it('should handle foo.bar', async () => {
			expect.assertions(1);
			const result = await parseRunner.callHelper('parseMachineKeyForOriginalKey', ['foo.bar']);

			expect(result).toBe('foo');
		});

		it('should handle foo', async () => {
			expect.assertions(1);
			const result = await parseRunner.callHelper('parseMachineKeyForOriginalKey', ['foo']);

			expect(result).toBe('foo');
		});
	});

	describe('parseKeyForHumanPart', () => {
		it('should handle foo.bar', async () => {
			expect.assertions(1);
			const result = await parseRunner.callHelper('parseKeyForHumanPart', ['foo.bar']);

			expect(result).toBe('foo.bar');
		});

		it('should handle Name:foo.bar', async () => {
			expect.assertions(1);
			const result = await parseRunner.callHelper('parseKeyForHumanPart', ['Name:foo.bar']);

			expect(result).toBe('Name');
		});

		it('should handle foo', async () => {
			expect.assertions(1);
			const result = await parseRunner.callHelper('parseKeyForHumanPart', ['foo']);

			expect(result).toBe('foo');
		});
	});

	describe('parseKeyForMachinePart', () => {
		it('should handle foo.bar', async () => {
			expect.assertions(1);
			const result = await parseRunner.callHelper('parseKeyForMachinePart', ['foo.bar']);

			expect(result).toBe('foo.bar');
		});

		it('should handle Name:foo.bar', async () => {
			expect.assertions(1);
			const result = await parseRunner.callHelper('parseKeyForMachinePart', ['Name:foo.bar']);

			expect(result).toBe('foo.bar');
		});

		it('should handle foo', async () => {
			expect.assertions(1);
			const result = await parseRunner.callHelper('parseKeyForMachinePart', ['foo']);

			expect(result).toBe('foo');
		});
	});
});
