define([
	"app",
	"apps/dialog/buy/buy_view",	
], function(App, View){

	App.module("DialogApp.Buy", function(Buy, App, Backbone, Marionette, $, _){

		Buy.Controller = Marionette.Controller.extend({

			initialize: function(options){
				/* Declare the model globally to this controller */
				this.model = options.model

				this.buyView = this.getBuyView();
		
				options.region.show(this.buyView);

					/* if the buyer directly clicks the price/buy button
					 we will set the css property display to none */
					if (options.dialog == "buy"){
						$("#cancel").css("display", "none");
					} else{
						$("#cancel").css("display", "inline");
					}

				this.listenTo(this.buyView, "previous:modal", function(options){
					
					/* Vent Trigger for closing the dialog 
					that will be listen by dialog_app */
					App.vent.trigger("close:dialog:layout", {model:options.model});
				});
				this.listenTo(this.buyView, "item:buy", this.itemBought);
			},

			getBuyView: function(){
				return new View.ItemViewBuy({model: this.model});
			},

			/* triggered for buying the item*/
			itemBought: function(iv){
				console.log(iv.model.get('price'));
			},

		});
	
	});

	return App.DialogApp.Buy;

});
