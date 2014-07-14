define([
	"app",
	"apps/header/show/show_view"
], function(App, View){

	App.module("HeaderApp.Show", function(Show, App, Backbone, Marionette, $, _){
	
		Show.Controller = Marionette.Controller.extend({
			initialize: function(){
		
				this.layout = this.getLayout();
		
				this.listenTo(this.layout, "show", function(){
		
				});
		
				App.headerRegion.show(this.layout);
			},
		
			getLayout: function(){
				return new View.Layout();
			},
		
			
		});

	});

	return App.HeaderApp.Show;
});