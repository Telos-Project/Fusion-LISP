var jsonLISP = {
	toJSON: (code) => {

		return JSON.parse(
			"[" + 
			code.trim().match(
				/"(?:[^"\\]|\\.)*"|[()]|[^\s()"']+|\s+/g
			).map(
				token => {

					switch(true) {
						case token == "(": return "[";
						case token == ")": return "]";
						case /^\s+$/g.test(token): return ",";
						default: return JSON.stringify(token);
					}
				}
			).filter((token, index, array) => {
				return token != "," || !/^\,|\]$/g.test(array[index + 1])
			}).map((token, index, array) => {
				return token == "]" && array[index + 1] == "[" ? "]," : token;
			}).join("") +
			"]"
		);
	},
	toLISP: (data, nest) => {

		return (nest ? "(" : "") + (
			typeof data == "string" ? JSON.parse(data) : data
		).map(item => Array.isArray(item) ?
			jsonLISP.toLISP(item, true) :
			"" + item
		).join(" ") + (nest ? ")" : "");
	}
};

if(typeof module == "object")
	module.exports = jsonLISP;