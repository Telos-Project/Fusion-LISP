#!/usr/bin/env node

require("telos-use-js");

var fusionLISP = require("./fusionLISP.js");
var fs = require("fs");
var jsonLISP = require("./jsonLISP.js");
var one = require("one-parser");
var pup = require("universal-preprocessor");
var pupLangs = require("universal-preprocessor/pupLangs");

let src = pup.preprocess(pupLangs, fs.readFileSync(process.argv[2], "utf-8"));
let data = [];

try {
	data = JSON.parse(src);
}

catch(error) {

	if(src.trim().startsWith("(") &&
		src.trim().endsWith(")") &&
		(src.match(/\(/g) || []).length ==
			(src.match(/\)/g) || []).length
	) {
		data = jsonLISP.toJSON(src);
	}

	else
		data = one.toList(one.read(src));
}

fusionLISP.run(data);