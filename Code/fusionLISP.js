/*

	state = {
		data: [[JSON_LISP_CODE...]...],
		thread: {
			common: {
				state: {
					data: {
						global: {
							use: null / (state, threadIndex) => { ... },
							...
						},
						local: { ... }
					},
					stack: { ... }
				}
			},
			local: {
				args: [...],
				index: { index: [...], descending: t/f },
				return: ...
			},
			children: { ... }
		}
	}

 */

var fusionLISP = {
	run: (state) => {
		// STUB
	}
};

if(typeof module == "object")
	module.exports = fusionLISP;