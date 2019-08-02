
class PCNumber {
	constructor() {
		// Empty Constructor
	}

	static isNumber(maybeNum) {
		return !isNaN(maybeNum) && typeof maybeNum == 'number';
	}
}

module.exports = PCNumber;
