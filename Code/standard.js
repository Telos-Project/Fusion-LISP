function validate(str) {

	if(str.startsWith(":{") && str.endsWith("}:"))
		return str;

	try {

		JSON.parse(str);

		return str;
	}
	
	catch(error) {

		try {

			new Function(str);

			try {

				new Function(
					str.split("\n").map(
						line => line.trim()
					).filter(
						line => line != ""
					).map(
						line => `var ${line}`
					).join("\n")
				);

				return JSON.stringify(str);
			}

			catch(error) {
				return str;
			}
		}
		
		catch(error) {
			return JSON.stringify(str);
		}
	}
}

module.exports = [
	{
		process: (context, args) => {

			return context.local.operator.toLowerCase().trim() == "add" ?
				`(${args.map(arg => validate(arg)).join("+")})` : null;
		},
		tags: ["standard", "add"]
	},
	{
		process: (context, args) => {

			return context.local.operator.toLowerCase().trim() == "and" ?
				`(${args.join("&&")})` : null;
		},
		tags: ["standard", "and"]
	},
	{
		process: (context, args) => {

			return context.local.operator.toLowerCase().trim() == "arguments" ?
				`Array.from(arguments).slice(1)` : null;
		},
		tags: ["standard", "arguments"]
	},
	{
		process: (context, args) => {

			return context.local.operator.toLowerCase().trim() == "at" ?
				`${
					validate(args[0])
				}${
					args.slice(1).map(item => `[${item}]`).join("")
				}` :
				null;
		},
		tags: ["standard", "at"]
	},
	{
		process: (context, args) => {

			return context.local.operator.toLowerCase().trim() == "break" ?
				(args.length > 0 ? `if(${args[0]})break;` : "break;") : null;
		},
		tags: ["standard", "break"]
	},
	{
		process: (context, args) => {

			return context.local.operator.toLowerCase().trim() == "define" ?
				`(...args)=>{let arguments=[null].concat(args);${
					args.join("\n")
				}}\n` : null;
		},
		tags: ["standard", "define"]
	},
	{
		process: (context, args) => {

			return context.local.operator.toLowerCase().trim() == "divide" ?
				`(${args.join("/")})` : null;
		},
		tags: ["standard", "divide"]
	},
	{
		process: (context, args) => {

			return context.local.operator.toLowerCase().trim() == "do" ?
				`${args[0]}(${args.slice(1).join(",")})\n` : null;
		},
		tags: ["standard", "do"]
	},
	{
		process: (context, args) => {

			args = args.map(arg => validate(arg));

			return context.local.operator.toLowerCase().trim() == "equals" ?
				`(${args.map((item, index) => {

					return index < args.length - 1 ?
						`${args[index]}==${args[index + 1]}` : "true";
				}).join("&&")})` : null;
		},
		tags: ["standard", "equals"]
	},
	{
		process: (context, args) => {

			return context.local.operator.toLowerCase().trim() == "evaluate" ?
				`eval(${validate(args[0])})\n` : null;
		},
		tags: ["standard", "evaluate"]
	},
	{
		process: (context, args) => {

			return context.local.operator.toLowerCase().trim() == "greater" ?
				`(${args.map((item, index) => {

					return index < args.length - 1 ?
						`${args[index]}>${args[index + 1]}` : "true";
				}).join("&&")})` : null;
		},
		tags: ["standard", "greater"]
	},
	{
		process: (context, args) => {

			return context.local.operator.toLowerCase().trim() == "less" ?
				`(${args.map((item, index) => {

					return index < args.length - 1 ?
						`${args[index]}<${args[index + 1]}` : "true";
				}).join("&&")})` : null;
		},
		tags: ["standard", "less"]
	},
	{
		process: (context, args) => {

			args = args.map(arg => validate(arg));

			return context.local.operator.toLowerCase().trim() == "list" ?
				(
					args.filter(item =>
						item.startsWith(":{") && item.endsWith("}:")
					).length > 0 ?
						`{${args.map((item, index) =>
							item.startsWith(":{") && item.endsWith("}:") ?
								(value => `${
									value.key
								}:${
									value.value
								}`)(
									JSON.parse(
										item.substring(1, item.length - 1)
									)
								) :
								`"${index}":${item}`
						).join(",")}}` :
						`[${args.join(",")}]`
				) :
				null;
		},
		tags: ["standard", "list"]
	},
	{
		process: (context, args) => {

			return context.local.operator.toLowerCase().trim() == "loop" ?
				(args.length > 0 ? `if(${args[0]})continue;` : "continue;") :
				null;
		},
		tags: ["standard", "loop"]
	},
	{
		process: (context, args) => {

			return context.local.operator.toLowerCase().trim() == "multiply" ?
				`(${args.join("*")})` : null;
		},
		tags: ["standard", "multiply"]
	},
	{
		process: (context, args) => {

			return context.local.operator.toLowerCase().trim() == "modulus" ?
				`(${args.join("%")})` : null;
		},
		tags: ["standard", "modulus"]
	},
	{
		process: (context, args) => {

			return context.local.operator.toLowerCase().trim() == "not" ?
				`(${args.map(item => `!${item}`).join("&&")})` : null;
		},
		tags: ["standard", "not"]
	},
	{
		process: (context, args) => {

			return context.local.operator.toLowerCase().trim() == "on" ?
				`(${args[0]}).then((value)=>{(${args[1]})(value);})\n` : null;
		},
		tags: ["standard", "on"]
	},
	{
		process: (context, args) => {

			return context.local.operator.toLowerCase().trim() == "or" ?
				`(${args.join("||")})` : null;
		},
		tags: ["standard", "or"]
	},
	{
		process: (context, args) => {

			return ["print", "log", "log line"].includes(
				context.local.operator.toLowerCase().trim()
			) ?
				`console.log(${
					args.map(arg => validate(arg)).join(",")
				});` :
				null;
		},
		tags: ["standard", "print"]
	},
	{
		process: (context, args) => {

			return context.local.operator.toLowerCase().trim() == "random" ?
				`Math.random()` : null;
		},
		tags: ["standard", "random"]
	},
	{
		process: (context, args) => {

			args = args.map(arg => validate(arg));

			return context.local.operator.toLowerCase().trim() == "return" ?
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

			return context.local.operator.toLowerCase().trim() == "scope" ?
				`while(true){${args.join(";")}break;}` : null;
		},
		tags: ["standard", "scope"]
	},
	{
		process: (context, args) => {

			return context.local.operator.toLowerCase().trim() == "set" ?
				(context.state[args[0]] != null ?
					`${args[0]}=context.state[${args[0]}];` :
					`${
						args[0]
					}=${
						validate(args[1])
					};context.state["${
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

			return context.local.operator.toLowerCase().trim() == "size" ?
				`(${validate(args[0])}).length` : null;
		},
		tags: ["standard", "size"]
	},
	{
		process: (context, args) => {

			return context.local.operator.toLowerCase().trim() == "subtract" ?
				`(${args.join("-")})` : null;
		},
		tags: ["standard", "subtract"]
	},
	{
		process: (context, args) => {

			return context.local.operator.toLowerCase().trim() == "xor" ?
				`(${args.join("^")})` : null;
		},
		tags: ["standard", "xor"]
	},
	{
		process: (context, args) => {

			return context.local.operator.trim() == ":" ?
				`:{"key":${
					JSON.stringify("" + args[0])
				},"value":${
					JSON.stringify("" + args[1])
				}}:` :
				null;
		},
		tags: ["standard", ":"]
	}
];