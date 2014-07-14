define([
	"app",
	"apps/nav/show/show_view"
], function(App, View){

	App.module("NavApp.Show", function(Show, App, Backbone, Marionette, $, _){
	
		Show.Controller = Marionette.Controller.extend({
			initialize: function(){
		
				this.layout = this.getLayout();
		
				this.listenTo(this.layout, "show", function(){
		
				});
		
				App.navRegion.show(this.layout);
			},
		
			getLayout: function(){
				return new View.Layout();
			},
		
			
		});

	});

	return App.NavApp.Show;
});