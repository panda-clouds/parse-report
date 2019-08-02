const PCDate = require('@panda-clouds/date');
const PCNumber = require('@panda-clouds/number');
const moment = require('moment-timezone');
const PCReportError = require('./PCReportError.js');

class PCReport {
	constructor() {
		// Empty Constructor
	}

	// input functions
	name(input) {
		this.nameValue = input;
	}

	type(input) {
		this.typeValue = input;
	}

	timeZone(input) {
		this.timeZoneValue = input;
	}

	customBlock(input) {
		this.customBlockValue = input;
	}

	objects(input) {
		this.objectsValue = input;
	}

	keys(input) {
		this.displayKeysValue = input;
	}

	// output functions

	makePDF() {

	}

	makeCSV() {

	}

	static parseKeyForMachinePart(key) {
		if (key.indexOf(':') >= 0) {
			const subKeys = key.split(':');

			return subKeys[1];
		}

		return key;
	}

	static parseKeyForHumanPart(key) {
		if (key.indexOf(':') >= 0) {
			const subKeys = key.split(':');

			return subKeys[0];
		}

		return key;
	}

	static parseMachineKeyForOriginalKey(key) {
		if (key.indexOf('.') >= 0) {
			const subKeys = key.split('.');

			console.log('original::: ' + JSON.stringify(subKeys));

			return subKeys[0];
		}

		return key;
	}

	static parseMachineKeyForSubKey(key) {
		if (key && key.indexOf('.') >= 0) {
			const subKeys = key.split('.');

			console.log('subKey::: ' + JSON.stringify(subKeys));

			return subKeys[1];
		}
	}

	getCSVString() {
		// we put in quotes to escape the comma
		let csvContent = '';
		const keys = this.displayKeysValue;
		const objects = this.objectsValue;

		if (!keys) {
			throw new Error(PCReportError.missing_keys());
		}

		if (!objects) {
			throw new Error(PCReportError.missing_objects());
		}

		for (let i = 0; i < keys.length; i++) {
			const humanKey = PCReport.parseKeyForHumanPart(keys[i]);

			csvContent += humanKey + ',';
		}
		csvContent += '\n';

		// The Whole csv File
		for (let i = 0; i < objects.length; i++) {
			const oneObjectOfTheGroup = objects[i];

			// A single Line Item
			// loop through all the keys we want to read off the object.
			for (let p = 0; p < keys.length; p++) {
				const wholeMachineKey = PCReport.parseKeyForMachinePart(keys[p]);
				const subKey = PCReport.parseMachineKeyForSubKey(wholeMachineKey);
				const aKey = PCReport.parseMachineKeyForOriginalKey(wholeMachineKey);

				// object.get('objectId') doesnt work so we access id directly
				if (aKey === 'id' || aKey === 'objectId') {
					csvContent += oneObjectOfTheGroup.id + ',';
				} else if (oneObjectOfTheGroup.has(aKey)) {
					const value = oneObjectOfTheGroup.get(aKey);

					if (value instanceof Parse.Object || value instanceof Parse.User) {
						if (subKey) {
							console.log('sub: ' + subKey + aKey);

							// we are useing post.author
							if (value.has(subKey)) {
								csvContent += this.formatCSVPrimative(value.get(subKey)) + ',';
							} else {
								csvContent += '(null),';
							}
						} else {
							// display the id of the object
							csvContent += value.id + ',';
						}
					} else {
						csvContent += this.formatCSVPrimative(value) + ',';
					}
				} else {
					// the object doesn't have the key
					csvContent += '(null),';
				}
			}

			// remove last ,
			csvContent = csvContent.slice(0, -1);
			csvContent += '\n';
		}


		return csvContent;
	}

	formatCSVPrimative(input) {
		const format = '"MMMM D, YYYY h:mm A"';

		if (PCDate.isDate(input)) {
			const timeZone = this.timeZoneValue;

			if (timeZone) {
				return moment(input).tz(timeZone).format(format);
			}

			// default to no timezone
			return moment(input).format(format);
		} else if (PCNumber.isNumber(input) || input === true || input === false) {
			// No quotes needed for numbers or bools
			return input;
		} else if (input === 'true') {
			return true;
		} else if (input === 'false') {
			return false;
		} else if (!input) {
			return '(null)';
		}

		return '"' + input + '"';
	}

	async saveCSVFile() {
		const csvString = this.getCSVString();
		const name = this.nameValue;
		const type = this.typeValue;
		const buff = new Buffer(csvString);
		const base64data = buff.toString('base64');
		const file = new Parse.File(name + '.csv', { base64: base64data }, 'text/csv');
		const savedFile = await file.save();

		// The file has been saved to Parse.
		let reportObject = new Parse.Object('Report');

		reportObject.set('reportFile', savedFile);
		reportObject.set('type', type);
		reportObject.set('name', name);
		reportObject.set('extention', 'csv');
		reportObject.set('mimeType', 'text/csv');

		if (this.customBlock) {
			reportObject = this.customBlock(reportObject);
		}

		const savedReport = await reportObject.save(null, { useMasterKey: true });

		return savedReport;
	}
}

module.exports = PCReport;
