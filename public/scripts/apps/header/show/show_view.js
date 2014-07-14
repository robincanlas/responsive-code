define([
	"app",
	"text!apps/header/show/templates/layout.html"
], function(App, LayoutTemplate){

	App.module("HeaderApp.Show", function(Show, App, Backbone, Marionette, $, _){
	
		Show.Layout = Marionette.LayoutView.extend({
			template: LayoutTemplate,
			regions: {
				notificationsRegion: "#notifications",
			}
		});

	});

	return App.HeaderApp.Show;
});