test:
	npm test

benchmark:
	support/benchmark.js

gendoc:
	jsdoc ./lib/csv-express.js -d ./docs

publish:
	npm test && npm publish

.PHONY: test benchmark publish
