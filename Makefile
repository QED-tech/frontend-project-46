.PHONY: test

test:
	npm test

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix