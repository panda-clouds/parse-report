
class PCReportError {
	constructor() {
		// Empty Constructor
	}

	static missing_objects() {
		return 'Please pass an array of Parse.Objects to the "objects" field.';
	}

	static missing_keys() {
		return 'Please specify the "keys" field to communicate what fields you would like to have in the report for example report.keys(["birthday","First Name:firstName"])';
	}
}

module.exports = PCReportError;
