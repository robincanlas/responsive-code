define([
	"app",
	"text!apps/dialog/buy/templates/buy.html"	
], function(App, BuyTemplate){

	App.module("DialogApp.Buy", function(Buy, App, Backbone, Marionette, $, _){

		Buy.ItemViewBuy = Marionette.ItemView.extend({
			template: BuyTemplate,
			templateHelpers:{
				
				expirationDateYear: function(){
					var list = '';
					for (var i = 1991; i <= 2030; i++) {
						list += "<option value=\""+i+"\">"+i+"</option>";;
					};
					return list;
				},
				expirationDateMonth: function(){
					var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
					console.log(month.length);
					var list = "";
					for (var i = 0; i < month.length; i++) {
						list += "<option value=\""+month[i]+"\">"+month[i]+"</option>";
						// list += month[i];
					};
					return list;
				}
			},
			
			triggers: {
				"click [data-bought]": "item:buy",
			},
			
			events: {
				"click [data-cancel]": "previousModal"					
			},
			
			previousModal: function(){
				this.trigger("previous:modal", this);
			},

		});

	});

	return App.DialogApp.Buy;

});