var tests = [
	"../../tests/spec/apps/header",
	"../../tests/spec/apps/dialog",
	"../../tests/spec/apps/marketplace"
]

require(tests, function(){
	mocha.run();
});