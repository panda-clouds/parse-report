// Manualy testing ONLY
// this doesn't actually check anything and breaks CI with the following error

// Error: ENOENT: no such file or directory, mkdir '/parse-server/.nyc_output/processinfo'
//     at Object.mkdirSync (fs.js:752:3)
//     at Function.module.exports.sync (/usr/local/lib/node_modules/nyc/node_modules/make-dir/index.js:97:6)
//     at NYC.createTempDirectory (/usr/local/lib/node_modules/nyc/index.js:313:12)
//     at NYC.reset (/usr/local/lib/node_modules/nyc/index.js:318:10)
//     at Object.<anonymous> (/usr/local/lib/node_modules/nyc/bin/nyc.js:33:9)
//     at Module._compile (internal/modules/cjs/loader.js:701:30)
//     at Object.Module._extensions..js (internal/modules/cjs/loader.js:712:10)
//     at Module.load (internal/modules/cjs/loader.js:600:32)
//     at tryModuleLoad (internal/modules/cjs/loader.js:539:12)
//     at Function.Module._load (internal/modules/cjs/loader.js:531:3)

const PCParseRunner = require('../src/PCParseRunner.js');
// const PCBash = require('@panda-clouds/parse-bash');
let Parse;

describe('full project', () => {
	const parseRunner = new PCParseRunner();

	parseRunner.projectDir('./src/full-project');
	parseRunner.coverageDir('/tmp/testing/my-project/coverage');
	beforeAll(async () => {
		// await PCBash.runCommandPromise('docker build -t test-user/test-repo:1 src/full-project');

		// process.env.CI_PROD_IMAGE_AND_TAG = 'test-user/test-repo:1';
		Parse = await parseRunner.startParseServer();
	}, 1000 * 60 * 2);

	afterAll(async () => {
		await parseRunner.cleanUp();

		// try {
		// 	// this removed the coverage file required for coverageDir1 and coverageDir2
		// 	await PCBash.runCommandPromise('rm -r ' + PCParseRunner.tempDir() + '/my-project');
		// } catch (e) {
		// 	// Disregard failures
		// }
	});

	// This test is not found in CodeCoverageDir2
	// to test merging of "coverage" data
	it('should return only in 1', async () => {
		expect.assertions(1);
		const result = await Parse.Cloud.run('codeCove1');

		expect(result).toBe(1);
	});

	// it('should return everest', async () => {
	// 	expect.assertions(1);
	// 	const result = await Parse.Cloud.run('challenge');

	// 	expect(result).toBe('everest');
	// });

	it('should return self everest', async () => {
		expect.assertions(1);
		const result = await Parse.Cloud.run('selfChallenge');

		expect(result).toBe('everest');
	});

	it('should return pwd', async () => {
		expect.assertions(1);
		const result = await Parse.Cloud.run('pwd');

		expect(result).toContain('Dockerfile');
	});

	it('should return pwd-node', async () => {
		expect.assertions(1);
		const result = await Parse.Cloud.run('pwd-node');

		expect(result).toContain('@panda-clouds');
	});

	it('should read from neighboring file', async () => {
		expect.assertions(1);
		const result = await Parse.Cloud.run('other');

		expect(result).toBe('file');
	});
	it('should read from neighboring file2', async () => {
		expect.assertions(1);
		const result = await Parse.Cloud.run('other');

		expect(result).toBe('file');
	});
	it('should read from neighboring file3', async () => {
		expect.assertions(1);
		const result = await Parse.Cloud.run('other');

		expect(result).toBe('file');
	});
	it('should read from neighboring file4', async () => {
		expect.assertions(1);
		const result = await Parse.Cloud.run('other');

		expect(result).toBe('file');
	});

	it('should use node module from main', async () => {
		expect.assertions(2);
		const result = await Parse.Cloud.run('mainHasWhitespace');

		expect(result).toBe(true);

		const result2 = await Parse.Cloud.run('mainDoesntHasWhitespace');

		expect(result2).toBe(false);
	});

	it('should use node module from side', async () => {
		expect.assertions(2);
		const result = await Parse.Cloud.run('sideHasWhitespace');

		expect(result).toBe(true);

		const result2 = await Parse.Cloud.run('sideDoesntHasWhitespace');

		expect(result2).toBe(false);
	});
});
