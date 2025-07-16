var jsonLISP = {
	lispToJSON: (code) => {

		return JSON.parse(
			"[" + 
			code.trim().match(
				/"((?:\\.|[^"\\])*)"|[()]|[^\s()"']+|\s+/g
			).map(
				token => {

					switch(true) {
						case token == "(": return "[";
						case token == ")": return "]";
						case /^\s+$/g.test(token): return ",";
						default: return JSON.stringify(token);
					}
				}
			).join("").replace(",]", "]") +
			"]"
		);	
	},
	jsonToLISP: (data, nest) => {

		return (nest ? "(" : "") + (
			typeof data == "string" ? JSON.parse(data) : data
		).map(item =>
			Array.isArray(item) ?
				jsonLISP.jsonToLISP(item, true) :
				(typeof item == "string" ?
					(item.match(/\s+|\(|\)|\"/) ?
						JSON.stringify(item) : item) :
					"" + item
				)
		).join(" ") + (nest ? ")" : "");
	}
}

if(typeof module == "object")
	module.exports = jsonLISP;