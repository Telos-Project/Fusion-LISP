module.exports = {
	"add": (context, args) => {
		return `(${args.join("+")})`;
	},
	"and": (context, args) => {
		return `(${args.join("&&")})`;
	},
	"arguments": (context, args) => {
		return `Array.from(arguments).slice(1)`;
	},
	"at": (context, args) => {
		return `${args[0]}[${args[1]}]`;
	},
	"break": (context, args) => {
		return args.length > 0 ? `if(${args[0]})break;` : "break;";
	},
	"define": (context, args) => {

		return `(...args)=>{let arguments=[null].concat(args);${
			args.join("\n")
		}}\n`;
	},
	"divide": (context, args) => {
		return `(${args.join("/")})`;
	},
	"do": (context, args) => {
		return `${args[0]}(${args.slice(1).join(",")})\n`;
	},
	"equals": (context, args) => {

		let str = [];

		for(let i = 0; i < args.length - 1; i++)
			str.push(`${args[i]}==${args[i + 1]}`)

		return `(${str.join("&&")})`;
	},
	"evaluate": (context, args) => {
		return `eval(${args[0]});`;
	},
	"greater": (context, args) => {

		let str = [];

		for(let i = 0; i < args.length - 1; i++)
			str.push(`${args[i]}>${args[i + 1]}`)

		return `(${str.join("&&")})`;
	},
	"less": (context, args) => {

		let str = [];

		for(let i = 0; i < args.length - 1; i++)
			str.push(`${args[i]}<${args[i + 1]}`)

		return `(${str.join("&&")})`;
	},
	"list": (context, args) => {
		return `[${args.join(",")}]`;
	},
	"loop": (context, args) => {
		return args.length > 0 ? `if(${args[0]})continue;` : "continue;";
	},
	"multiply": (context, args) => {
		return `(${args.join("*")})`;
	},
	"modulus": (context, args) => {
		return `(${args.join("%")})`;
	},
	"not": (context, args) => {
		return `(${args.map(item => `!${item}`).join("&&")})`;
	},
	"or": (context, args) => {
		return `(${args.join("||")})`;
	},
	"print": (context, args) => {
		return `console.log(${args.join(",")});`;
	},
	"random": (context, args) => {
		return `Math.random()`;
	},
	"return": (context, args) => {
		
		return `context.value=${
			args.length > 1 ? "[" : ""
		}${
			args.join(",")
		}${
			args.length > 1 ? "]" : ""
		};return;`;
	},
	"scope": (context, args) => {
		return `while(true){${args.join(";")}break;}`;
	},
	"set": (context, args) => {

		return context.state[args[0]] != null ?
			`${args[0]}=context.state[${[args[0]]}];` :
			`${args[0]}=${args[1]},context.state["${args[0]}"]=${args[0]};`;
	},
	"size": (context, args) => {
		return `(${args[0]}).length`;
	},
	"subtract": (context, args) => {
		return `(${args.join("-")})`;;
	},
	"xor": (context, args) => {
		return `(${args.join("^")})`;;
	}
};