module.exports = {
	clearMocks: false,
	testMatch: ['**/?(*.)(spec|snap).js?(x)'],
	collectCoverageFrom: [
		'src/**',
		'!**/specInjection.js',
		'!**/*.json',
	],
	verbose: false,
	collectCoverage: false,
	coverageThreshold: {
		global: {
			branches: 100,
			functions: 100,
			lines: 100,
			statements: 0,
		},
	},
};
