define(["app"], function(App){

	App.module("DialogApp", function(DialogApp, App, Backbone, Marionette, $, _){

		DialogApp.Router = Marionette.AppRouter.extend({
			appRoutes: {
				"dialog": "showDialog"
			}
		});

		var API = {
			showDialog: function(options){
				require(["apps/dialog/show/show_controller"], function(){
					new DialogApp.Show.Controller(options);
				});
			},
			showBuy: function(options){
				require(["apps/dialog/buy/buy_controller"], function(){
					new DialogApp.Buy.Controller(options);
				});
			},
			showSwap: function(options){
				require(["apps/dialog/swap/swap_controller"], function(){
					new DialogApp.Swap.Controller(options);
				});
			}
		};

		App.vent.on("dialog:show:dialog", function(options){
			API.showDialog(options);		
		});

		App.vent.on("dialog:show:buy", function(options){
			API.showDialog(options);
		});

		App.vent.on("close:dialog:layout", function(options){
			API.showDialog(options);			
		});

		App.vent.on("open:dialog:layout", function(options){
			API.showDialog(options);			
		});		


		App.addInitializer(function(){
			new DialogApp.Router({
				controller: API
			});
		});

		App.commands.setHandler("open:buy:modal", function(options){
			API.showBuy(options);
		});

		App.commands.setHandler("click:swap:item", function(options){
			API.showSwap(options);
		});

	});

	return App.DialogApp;

});
