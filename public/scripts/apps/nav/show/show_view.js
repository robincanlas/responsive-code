define([
	"app",
	"text!apps/nav/show/templates/layout.html"
], function(App, LayoutTemplate){

	App.module("NavApp.Show", function(Show, App, Backbone, Marionette, $, _){
	
		Show.Layout = Marionette.LayoutView.extend({
			template: LayoutTemplate,
			tagName: "nav",
			regions: {
			},
		});

	});

	return App.NavApp.Show;
});