const PCParseRunner = require('@panda-clouds/parse-runner');
let Parse;

describe('the PCReport.js class', () => {
	const parseRunner = new PCParseRunner();

	parseRunner.helperClass('./PCReport.js');
	parseRunner.projectDir(__dirname + '/..');
	parseRunner.prefillMongo(async parseRunner => {
		await parseRunner.insertOne('MyInnerClass', { _id: 'escapeBar', bar: 'bad \\" escapes \' and ` , \n more \\\' stupid " characters' });
		await parseRunner.insertOne('MyInnerClass', { _id: 'stringBar', bar: 'hello' });
		await parseRunner.insertOne('MyInnerClass', { _id: 'numBar', bar: 56 });
		await parseRunner.insertOne('MyInnerClass', { _id: 'nullBar', bar: null });
		await parseRunner.insertOne('MyInnerClass', { _id: 'noBar' });
	});
	parseRunner.injectCode(`
const PCReport = require('./PCReport.js');

Parse.Cloud.define('goodSubValueEscape', async request => {
	const report = new PCReport();

	report.name('test 1');
	report.keys(['My Foo:foo.bar']);

	let inner = new Parse.Object('MyInnerClass');
	inner.id = 'escapeBar'

	let obj = new Parse.Object('MyClass');
	obj.set('foo',inner);

	const saved = await obj.save();

	console.log('bla' + saved.id);

	const query2 = new Parse.Query('MyClass');
	query2.include('foo');
	const real = await query2.get(saved.id);



	report.objects([real]);

	return report.getCSVString();
});

Parse.Cloud.define('goodSubValueString', async request => {
	const report = new PCReport();

	report.name('test 1');
	report.keys(['My Foo:foo.bar']);

	let inner = new Parse.Object('MyInnerClass');
	inner.id = 'stringBar'

	let obj = new Parse.Object('MyClass');
	obj.set('foo',inner);

	const saved = await obj.save();

	console.log('bla' + saved.id);

	const query2 = new Parse.Query('MyClass');
	query2.include('foo');
	const real = await query2.get(saved.id);



	report.objects([real]);

	return report.getCSVString();
});

Parse.Cloud.define('goodSubValueNumber', async request => {
	const report = new PCReport();

	report.name('test 1');
	report.keys(['My Foo:foo.bar']);

	let inner = new Parse.Object('MyInnerClass');
	inner.id = 'numBar'

	let obj = new Parse.Object('MyClass');
	obj.set('foo',inner);

	const saved = await obj.save();

	console.log('bla' + saved.id);

	const query2 = new Parse.Query('MyClass');
	query2.include('foo');
	const real = await query2.get(saved.id);



	report.objects([real]);

	return report.getCSVString();
});

Parse.Cloud.define('didntFetchSubValue', async request => {
	const report = new PCReport();

	report.name('test 1');
	report.keys(['My Foo:foo.bar']);

	let inner = new Parse.Object('MyInnerClass');
	inner.id = 'numBar'

	let obj = new Parse.Object('MyClass');
	obj.set('foo',inner);

	const saved = await obj.save();

	console.log('bla' + saved.id);

	const query2 = new Parse.Query('MyClass');
	// query2.include('foo'); Intentionally NOT Fetching
	const real = await query2.get(saved.id);



	report.objects([real]);

	return report.getCSVString();
});

Parse.Cloud.define('nullSubValue', async request => {
	const report = new PCReport();

	report.name('test 1');
	report.keys(['My Foo:foo.bar']);

	let inner = new Parse.Object('MyInnerClass');
	inner.id = 'nullBar'

	let obj = new Parse.Object('MyClass');
	obj.set('foo',inner);

	const saved = await obj.save();

	console.log('bla' + saved.id);

	const query2 = new Parse.Query('MyClass');
	query2.include('foo');
	const real = await query2.get(saved.id);



	report.objects([real]);

	return report.getCSVString();
});

Parse.Cloud.define('noSubValue', async request => {
	const report = new PCReport();

	report.name('test 1');
	report.keys(['My Foo:foo.bar']);

	let inner = new Parse.Object('MyInnerClass');
	inner.id = 'noBar'

	let obj = new Parse.Object('MyClass');
	obj.set('foo',inner);

	const saved = await obj.save();

	console.log('bla' + saved.id);

	const query2 = new Parse.Query('MyClass');
	query2.include('foo');
	const real = await query2.get(saved.id);



	report.objects([real]);

	return report.getCSVString();
});
`);

	beforeAll(async () => {
		Parse = await parseRunner.startParseServer();
	}, 1000 * 60 * 2);

	afterAll(async () => {
		await parseRunner.cleanUp();
	}, 1000 * 60 * 2);

	describe('getCSVString', () => {
		it('should pass goodSubValueEscape', async () => {
			expect.assertions(1);

			const results = await Parse.Cloud.run('goodSubValueEscape');

			expect(results).toBe('My Foo,\n"bad \\"" escapes \' and ` , \n more \\\' stupid "" characters"\n');
		});

		it('should pass goodSubValueString', async () => {
			expect.assertions(1);

			const results = await Parse.Cloud.run('goodSubValueString');

			expect(results).toBe('My Foo,\n"hello"\n');
		});

		it('should pass goodSubValueNumber', async () => {
			expect.assertions(1);

			const results = await Parse.Cloud.run('goodSubValueNumber');

			expect(results).toBe('My Foo,\n56\n');
		});

		it('should pass nullSubValue', async () => {
			expect.assertions(1);

			const results = await Parse.Cloud.run('nullSubValue');

			expect(results).toBe('My Foo,\n(null)\n');
		});

		it('should pass noSubValue', async () => {
			expect.assertions(1);

			const results = await Parse.Cloud.run('noSubValue');

			expect(results).toBe('My Foo,\n(null)\n');
		});

		it('should pass didntFetchSubValue', async () => {
			expect.assertions(1);

			const results = await Parse.Cloud.run('didntFetchSubValue');

			expect(results).toBe('My Foo,\n(null)\n');
		});
	});
});
