module.exports = {
	"add": (context, args) => {
		return `(${args.join("+")})`;
	},
	"and": (context, args) => {
		return `(${args.join("&&")})`;
	},
	"break": (context, args) => {
		return `if(${args[0]})break;`;
	},
	"divide": (context, args) => {
		return `(${args.join("/")})`;
	},
	"equals": (context, args) => {

		let str = [];

		for(let i = 0; i < args.length - 1; i++)
			str.push(`${args[i]}==${args[i + 1]}`)

		return `(${str.join("&&")})`;
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
	"loop": (context, args) => {
		return `if(${args[0]})continue;`;
	},
	"multiply": (context, args) => {

		return context.state[args[0]] != null ?
			`${args[0]}=context.state[${[args[0]]}];` :
			`${args[0]}=${args[1]},context.state["${args[0]}"]=${args[0]},`;
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
	"subtract": (context, args) => {
		return `(${args.join("-")})`;;
	}
};