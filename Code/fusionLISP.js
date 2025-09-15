var fusionLISP = {
	construct: (list, operators, state, index, current) => {

		current = current != null ? current : [];

		if(fusionLISP.onPath(index, current))
			return "";

		let newContext = Object.assign(
			JSON.parse(JSON.stringify(fusionLISP.defaultContext)),
			{
				current, index, list, operators, state
			}
		);

		if(typeof list == "string") {

			let operation = fusionLISP.getOperation([list], newContext, []);

			return operation != null ? operation : list;
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

		let operation = fusionLISP.getOperation(list, newContext, args);

		return operation != null ?
			operation :
			(state[list[0]] != null ?
				`(${list[0]})(${args.join(",")})\n` : ""
			);
	},
	defaultContext: {
		list: [],
		operators: [],
		state: { },
		index: [],
		args: [],
		recompile: false,
		value: null
	},
	getOperation(list, context, args) {

		if(typeof list[0] != "string")
			return null;

		let newContext = Object.assign(
			{ local: { operator: list[0], list: list }},
			context
		);

		for(let i = context.operators.length - 1; i >= 0; i--) {

			let operation = context.operators[i].process(
				newContext, args
			);

			if(typeof operation != "undefined" ? operation != null : false)
				return operation;
		}

		return null;
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
	operate: (context) => {

		if(Array.isArray(context))
			context = { list: context };
		
		context = Object.assign(
			JSON.parse(JSON.stringify(fusionLISP.defaultContext)), context
		);

		context.use = (path) => {

			let item = use(path);
			
			if(Array.isArray(item))
				return item;

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

		if(context.operators.filter(item => {

			return Array.isArray(item.tags) ?
				item.tags.length == 1 && item.tags[0] == "use" : false;
		})) {

			context.operators.push({
				process: (context, args) => {

					return context.local.operator == "use" ?
						`${
							args.map(item =>
								`Object.values(context.use(${
									item
								})).forEach(
									operator =>
										context.operators.push(operator)
								);`
							).join("")
						}context.recompile=true;context.index=${
							JSON.stringify(context.current)
						};return;` :
						null;
				},
				tags: ["use"]
			});
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
	run: (list, args) => {

		if(typeof list == "string") {

			let pupUtils = typeof universalPreprocessor != "undefined" ?
				universalPreprocessor : require("universal-preprocessor");

			let pupLanguages = typeof pupLangs != "undefined" ?
				pupLangs : require("universal-preprocessor/pupLangs");

			let pupActive = pupUtils != null && pupLanguages != null ?
				Object.keys(pupUtils).length > 0 &&
					Object.keys(pupLanguages).length > 0 :
				false;

			if(pupActive)
				list = pupUtils.preprocess(pupLanguages, list);

			try {
				list = JSON.parse(list);
			}

			catch(error) {

				if(list.trim().startsWith("(") &&
					list.trim().endsWith(")") &&
					(list.match(/\(/g) || []).length ==
						(list.match(/\)/g) || []).length
				) {

					let parser = typeof jsonLISP != "undefined" ?
						jsonLISP : require("./jsonLISP.js");

					list = parser.toJSON(list);
				}

				else {

					let parser = typeof oneLang != "undefined" ?
						oneLang : require("one-parser");

					list = parser.toList(parser.read(list));
				}
					
			}
		}

		return fusionLISP.operate({
			list: list, args: args != null ? args : []
		}).value;
	}
};

if(typeof module == "object")
	module.exports = fusionLISP;