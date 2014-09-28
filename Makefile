test:
	./node_modules/.bin/mocha tests

build:
	npm shrinkwrap
	./node_modules/.bin/browserify -e app/src/app.js -o app/js/app.js