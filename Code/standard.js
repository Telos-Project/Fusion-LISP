module.exports = [
	{
		process: (context, args) => {

			return context.local.operator == "add" ?
				`(${args.join("+")})` : null;
		},
		tags: ["standard", "add"]
	},
	{
		process: (context, args) => {

			return context.local.operator == "and" ?
				`(${args.join("&&")})` : null;
		},
		tags: ["standard", "and"]
	},
	{
		process: (context, args) => {

			return context.local.operator == "arguments" ?
				`Array.from(arguments).slice(1)` : null;
		},
		tags: ["standard", "arguments"]
	},
	{
		process: (context, args) => {

			return context.local.operator == "at" ?
				`${args[0]}[${args[1]}]` : null;
		},
		tags: ["standard", "at"]
	},
	{
		process: (context, args) => {

			return context.local.operator == "break" ?
				(args.length > 0 ? `if(${args[0]})break;` : "break;") : null;
		},
		tags: ["standard", "break"]
	},
	{
		process: (context, args) => {

			return context.local.operator == "define" ?
				`(...args)=>{let arguments=[null].concat(args);${
					args.join("\n")
				}}\n` : null;
		},
		tags: ["standard", "define"]
	},
	{
		process: (context, args) => {

			return context.local.operator == "divide" ?
				`(${args.join("/")})` : null;
		},
		tags: ["standard", "divide"]
	},
	{
		process: (context, args) => {

			return context.local.operator == "do" ?
				`${args[0]}(${args.slice(1).join(",")})\n` : null;
		},
		tags: ["standard", "do"]
	},
	{
		process: (context, args) => {

			return context.local.operator == "equals" ?
				`(${args.map((item, index) => {

					return index < args.length - 1 ?
						`${args[index]}==${args[index + 1]}` : "true";
				}).join("&&")})` : null;
		},
		tags: ["standard", "equals"]
	},
	{
		process: (context, args) => {

			return context.local.operator == "evaluate" ?
				`eval(${args[0]})\n` : null;
		},
		tags: ["standard", "evaluate"]
	},
	{
		process: (context, args) => {

			return context.local.operator == "greater" ?
				`(${args.map((item, index) => {

					return index < args.length - 1 ?
						`${args[index]}>${args[index + 1]}` : "true";
				}).join("&&")})` : null;
		},
		tags: ["standard", "greater"]
	},
	{
		process: (context, args) => {

			return context.local.operator == "less" ?
				`(${args.map((item, index) => {

					return index < args.length - 1 ?
						`${args[index]}<${args[index + 1]}` : "true";
				}).join("&&")})` : null;
		},
		tags: ["standard", "less"]
	},
	{
		process: (context, args) => {

			return context.local.operator == "list" ?
				`[${args.join(",")}]` : null;
		},
		tags: ["standard", "list"]
	},
	{
		process: (context, args) => {

			return context.local.operator == "loop" ?
				(args.length > 0 ? `if(${args[0]})continue;` : "continue;") :
				null;
		},
		tags: ["standard", "loop"]
	},
	{
		process: (context, args) => {

			return context.local.operator == "multiply" ?
				`(${args.join("*")})` : null;
		},
		tags: ["standard", "multiply"]
	},
	{
		process: (context, args) => {

			return context.local.operator == "modulus" ?
				`(${args.join("%")})` : null;
		},
		tags: ["standard", "modulus"]
	},
	{
		process: (context, args) => {

			return context.local.operator == "not" ?
				`(${args.map(item => `!${item}`).join("&&")})` : null;
		},
		tags: ["standard", "not"]
	},
	{
		process: (context, args) => {

			return context.local.operator == "or" ?
				`(${args.join("||")})` : null;
		},
		tags: ["standard", "or"]
	},
	{
		process: (context, args) => {

			return context.local.operator == "print" ?
				`console.log(${args.join(",")});` : null;
		},
		tags: ["standard", "print"]
	},
	{
		process: (context, args) => {
			return context.local.operator == "random" ? `Math.random()` : null;
		},
		tags: ["standard", "random"]
	},
	{
		process: (context, args) => {

			return context.local.operator == "return" ?
				`context.value=${
					args.length > 1 ? "[" : ""
				}${
					args.join(",")
				}${
					args.length > 1 ? "]" : ""
				};return context.value;` : null;
		},
		tags: ["standard", "return"]
	},
	{
		process: (context, args) => {

			return context.local.operator == "scope" ?
				`while(true){${args.join(";")}break;}` : null;
		},
		tags: ["standard", "scope"]
	},
	{
		process: (context, args) => {

			return context.local.operator == "set" ?
				(context.state[args[0]] != null ?
					`${args[0]}=context.state[${args[0]}];` :
					`${
						args[0]
					}=${
						args[1]
					},context.state["${
						args[0]
					}"]=${
						args[0]
					};`
				) : null;
		},
		tags: ["standard", "set"]
	},
	{
		process: (context, args) => {

			return context.local.operator == "size" ?
				`(${args[0]}).length` : null;
		},
		tags: ["standard", "size"]
	},
	{
		process: (context, args) => {

			return context.local.operator == "subtract" ?
				`(${args.join("-")})` : null;
		},
		tags: ["standard", "subtract"]
	},
	{
		process: (context, args) => {

			return context.local.operator == "xor" ?
				`(${args.join("^")})` : null;
		},
		tags: ["standard", "xor"]
	}
];