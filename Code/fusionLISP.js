var fusionLISP = {
	defaultContext: {
		list: [],
		operators: { },
		state: { },
		index: [],
		args: [],
		recompile: false,
		value: null
	},
	onPath: (index, current) => {

		let len = Math.min(index.length, current.length);

		if(len == 0)
			return false;

		for(let i = 0; i < len; i++) {

			if(index[i] != current[i])
				return index[i] > current[i];
		}

		return index.length >= current.length;
	},
	construct: (list, operators, state, index, current) => {

		current = current != null ? current : [];

		if(fusionLISP.onPath(index, current))
			return "";

		if(typeof list == "string") {

			return (operators[list] != null ?
				operators[list](state, []) : list);
		}

		if(list.length == 0)
			return "";

		let args = list.slice(1).map((item, i) => fusionLISP.construct(
			item, operators, state, index, current.concat([i + 1])
		));

		if(typeof list[0] == "object") {

			return [fusionLISP.construct(
				list[0], operators, state, index, current.concat([0])
			)].concat(args).join("");
		}

		return operators[list[0]] != null ?
			operators[list[0]](Object.assign(
				JSON.parse(JSON.stringify(fusionLISP.defaultContext)),
				{
					current, index, list, operators, state
				}
			), args) :
			(state[list[0]] != null ?
				`(${list[0]})(${args.join(",")})\n` : ""
			);
	},
	operate: (context) => {

		if(Array.isArray(context))
			context = { list: context };
		
		context = Object.assign(
			JSON.parse(JSON.stringify(fusionLISP.defaultContext)), context
		);

		context.use = (path) => {

			let item = use(path);

			if(Object.values(item).filter(
				item => typeof item != "function"
			).length > 0) {

				let apint = typeof apintUtils != "undefined" ?
					apintUtils : require("apint");

				let result = { };
				
				apint.queryUtilities(
					item, null, { type: "fusion-lisp" }
				).forEach(item => Object.assign(
					result,
					use(
						Array.isArray(item.source) ?
							item.source[0] : item.source
					)
				));

				item = result;
			}

			return item;
		};

		if(typeof context.operators.use != "function") {

			context.operators.use = (context, args) => {

				return `${
					args.map(
						item =>
							`Object.assign(context.operators,context.use(${
								item
							}));`
					).join("")
				}context.recompile=true;context.index=${
					JSON.stringify(context.current)
				};return;`;
			};
		}

		let pupUtils = typeof universalPreprocessor != "undefined" ?
			universalPreprocessor : require("universal-preprocessor");

		let pupLanguages = typeof pupLangs != "undefined" ?
			pupLangs : require("universal-preprocessor/pupLangs");

		let pupActive = pupUtils != null && pupLanguages != null ?
			Object.keys(pupUtils).length > 0 &&
				Object.keys(pupLanguages).length > 0 :
			false;
		
		while(true) {

			let src = fusionLISP.construct(
				context.list, context.operators, context.state, context.index
			);

			if(pupActive)
				src = pupUtils.preprocess(pupLanguages, src);

			(new Function("context", src))(context, ...context.args);

			if(context.recompile) {

				context.recompile = false;

				continue;
			}

			break;
		}

		return context;
	},
	run: (list) => {
		return fusionLISP.operate(list).value;
	}
};

if(typeof module == "object")
	module.exports = fusionLISP;