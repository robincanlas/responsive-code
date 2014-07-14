define([
	"app"
], function(App){

	App.module("HeaderApp", function(HeaderApp, App, Backbone, Marionette, $, _){
	
		this.startWithParent = false;
		
		var API = {
			showHeader: function(){
				require(["apps/header/show/show_controller"], function(){
					new HeaderApp.Show.Controller();
				});
			}
		};
		
		App.addInitializer(function(){
			API.showHeader();
		});

	});

	return App.HeaderApp;
});