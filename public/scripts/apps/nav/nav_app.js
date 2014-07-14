define([
	"app"
], function(App){

	App.module("NavApp", function(NavApp, App, Backbone, Marionette, $, _){
	
		this.startWithParent = false;
		
		var API = {
			showNav: function(){
				require(["apps/nav/show/show_controller"], function(){
					new NavApp.Show.Controller();
				});
			}
		};
		
		App.addInitializer(function(){
			API.showNav();
		});

	});

	return App.NavApp;
});