define([
	"marionette"
], function(Marionette){

	var App = new Marionette.Application();

	App.addRegions({
		headerRegion: "#header-region",
		navRegion: "#nav-region",
		mainRegion:"#main-region",
		dialogRegion:"#dialog-region"
	});

	App.on("before:start", function(){
		require(["config/settings"]);
	});

	App.addInitializer(function(){
		require([
			"apps/nav/nav_app",
			"apps/header/header_app",				
		], function(){	
			App.module("NavApp").start();
			App.module("HeaderApp").start();
		});
	});

	App.on("before:start", function() {
		if (Backbone.history) {
			require([
				"apps/marketplace/marketplace_app",							
				"apps/dialog/dialog_app",
			], function(){
				Backbone.history.start();

				$(document).on('click', 'a:not([data-bypass])', function(e) {
					var href = $(this).attr('href');
					var protocol = this.protocol + '//';

					if (href.slice(protocol.length) !== protocol) {
						e.preventDefault();
						Backbone.history.navigate(href, true);
					}
				});
			});
		}
	});	

	return App;
});