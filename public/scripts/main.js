require.config({
	// urlArgs: "bust=" + (new Date()).getTime(), // for development
	paths: {
		backbone: "libs/backbone/backbone",
		marionette: "libs/backbone/backbone.marionette",
		jquery: "libs/jquery/jquery-2.1.1",
		underscore: "libs/lodash/lodash",
		text: "libs/require/text",
		moment: "libs/utils/moment",
		jqueryui: "libs/jqueryui/jquery-ui-1.10.4",
        spin: "libs/utils/spin.min",
        "jqueryspin": "libs/utils/jquery.spin"
	},
	shim: {
		backbone: {
			deps: ["jquery", "underscore"],
			exports: "Backbone"
		},
		marionette: {
			deps: ["backbone"],
			exports: "Marionette"
		},
		jqueryui: {
			deps: ["jquery"]
		},
        spin: {
            exports:"spin"
        },
        "jqueryspin": {
            exports:"jqueryspin"
        }
	}
});

if ( window.mocha ) {
	require(["../../tests/specRunner"]);
} else {
	require(["app"], function(App){
		App.start();
	});
}