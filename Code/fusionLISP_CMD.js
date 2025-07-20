#!/usr/bin/env node

require("telos-use-js");

require("./fusionLISP.js").run(
	fs.readFileSync(process.argv[2], "utf-8"),
	process.argv.slice(3)
);