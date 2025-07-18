var jsonLISP = {
	toJSON: (code) => {

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
						default: return JSON.stringify(token).
							split("\\\\").join("\\");
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
			(typeof item == "string" ?
				(item.match(/\s+|\(|\)|\"/) ?
					(/^".*"$/.test(item) ?
						JSON.stringify(
							item.substring(1, item.length - 1)
						) :
						JSON.stringify(item)
					) :
					item
				) :
				"" + item
			)
		).join(" ") + (nest ? ")" : "");
	}
};

if(typeof module == "object")
	module.exports = jsonLISP;