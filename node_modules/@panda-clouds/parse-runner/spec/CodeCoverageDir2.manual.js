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

// const PCParseRunner = require('../src/PCParseRunner.js');
// const PCBash = require('@panda-clouds/parse-bash');
// let Parse;

// describe('full project', () => {
// 	const parseRunner = new PCParseRunner();

// 	parseRunner.parseVersion('3.4.0');
// 	parseRunner.projectDir('./src/full-project');
// 	parseRunner.coverageDir('/tmp/testing/coverage');

// 	beforeAll(async () => {
// 		// await PCBash.runCommandPromise('docker build -t test-user/test-repo:2 src/full-project');

// 		// process.env.CI_PROD_IMAGE_AND_TAG = 'test-user/test-repo:2';
// 		Parse = await parseRunner.startParseServer();
// 	}, 1000 * 60 * 2);

// 	afterAll(async () => {
// 		await parseRunner.cleanUp();

// 		try {
// 			// this removed the coverage file required for coverageDir1 and coverageDir2
// 			await PCBash.runCommandPromise('rm -r ' + PCParseRunner.tempDir() + '/coverage');
// 		} catch (e) {
// 			// Disregard failures
// 		}
// 	});

// 	// this one test is omitted from the CodeCoverageDir1
// 	// so we could test merging of "coverage" data
// 	it('should return only in 2', async () => {
// 		expect.assertions(1);
// 		const result = await Parse.Cloud.run('codeCove2');

// 		expect(result).toBe(2);
// 	});
// });
