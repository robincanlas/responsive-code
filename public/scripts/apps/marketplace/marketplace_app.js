define([
	"app",	
], function(App){

		App.module("MarketplaceApp", function(MarketplaceApp, App, Backbone, Marionette, $, _){

		MarketplaceApp.Router = Marionette.AppRouter.extend({
			appRoutes: {
				"marketplace": "showMarket"
			}
		});
		
		var API = {
			showMarket: function(){
				// require(["apps/marketplace/list/list_controller"], function(){
					console.log("marketplace app");
					// new MarketplaceApp.Show.Controller();
				// });
			},
		};
		
		App.addInitializer(function(){
			new MarketplaceApp.Router({
				controller: API
			});
		});

	});

	return App.MarketplaceApp;
});
