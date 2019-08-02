class PCString  {

	constructor() {
		//Empty Constructor
	}

	static isString(o) {
		if(o === null) return false;
		return typeof o == "string" || (typeof o == "object" && o.constructor === String);
	}

	static hasWhitespace(string) {
		if(!string) return false;
		return string.indexOf(' ') >= 0;
	}

	static removeWhitespace(string){
		if(!string) return '';
		return string.replace(/\s+/g, '');
	}

	static domainSafeString(string){
		if(!string) return '';
		return string.toLowerCase().replace(/[^a-z0-9\-]/g, '');
	}

}

module.exports = PCString;
