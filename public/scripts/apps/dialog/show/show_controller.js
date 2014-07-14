define([
	"app",
	"apps/dialog/show/show_view",
], function(App, View){

	App.module("DialogApp.Show", function(Show, App, Backbone, Marionette, $, _){

		Show.Controller = Marionette.Controller.extend({

			initialize: function(options){
				/* Declare the model globally to this controller */
				this.model = options.model;

				var that = this;

				this.layout = this.getLayoutView();

				this.listenTo(this.layout, "show", function(){

					this.dialogRegion(options);

					if (options.dialog == "buy") {					
						this.buyView(options);												
					}
				});

				App.dialogRegion.show(this.layout);
				$(".modal-box").addClass("show-dialog");			
				
			},


			/* Main Layout */
			getLayoutView: function(){
				return new View.Layout();
			},

			/* Dialog Region */	
			dialogRegion: function(options){
				this.dialogView = this.getDialogView();

				this.listenTo(this.dialogView, "show", function(){
					this.closeRegion();

					if ( options.dialog != "buy" ) {
						this.modalRegion();
					}
				});

				this.layout.dialogRegion.show(this.dialogView);			
			},

			getDialogView: function(){
				return new View.Dialog();
			},			

			/* Close Region for the x button */
			closeRegion: function(){
				this.closeView = this.getCloseView();
				this.dialogView.closeRegion.show(this.closeView);

				this.listenTo(this.closeView, "close:dialog", function(){
					this.layout.close();
				});					
			},

			getCloseView: function(){
				return new View.CloseItemView();
			},

			/* Modal Region for the default Modal */
			modalRegion: function(){
				this.modalView = this.getModalView();
				this.dialogView.modalRegion.show(this.modalView);


				// Delete this later
				// for Coding purposes only
				// var placeholder = {
				// 	model: this.model
				// };
				// // this.requestSwapItem(placeholder)
				// this.buyView(placeholder)
				//End of Delete


				this.listenTo(this.modalView, "open:buy:modal", this.buyView);
				this.listenTo(this.modalView, "click:swap:item", this.requestSwapItem);
			},

			/* insert the model to the item view */
			getModalView: function(){
				return new View.ModalItemView({model:this.model});
			},

			/*	execute a command to open the buy modal,
				if the user directly clicks the the price/buy we will add 
				"dialog":"buy", so we will not display the cancel button, 
				in the buy_controller */
			buyView: function(iv){

				if (iv.dialog != "buy"){
					App.execute("open:buy:modal", {
						region: this.dialogView.modalRegion, 
						model: iv.model});
				}else{
					App.execute("open:buy:modal", {
						region: this.dialogView.modalRegion, 
						model: iv.model, 
						dialog: "buy"});					
				}
			},

			/* execute the swap item */
			requestSwapItem: function(iv){
				App.execute("click:swap:item", {region: this.dialogView.modalRegion, model: iv.model});
			}
		});
	});

	return App.DialogApp.Show;

});
