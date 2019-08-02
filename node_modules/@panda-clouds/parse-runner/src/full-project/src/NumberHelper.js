class NumberHelper {
	static return5() {
		return 5;
	}

	static return21() {
		return 21;
	}

	static return47() {
		return 47;
	}

	static add1Number(a) {
		return a;
	}

	static add2Numbers(a, b) {
		return a + b;
	}

	static add3Numbers(a, b, c) {
		return a + b + c;
	}

	static add10Numbers(a, b, c, d, e, f, g, h, i, j) {
		return a + b + c + d + e + f + g + h + i + j;
	}

	static throwBadNumbers() {
		throw new Error('Bad Numbers!');
	}
}

module.exports = NumberHelper;
