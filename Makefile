.PHONY: test

test:
	npm test

install:
	npm ci

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

test-coverage:
	npm test -- --coverage --coverageProvider=v8