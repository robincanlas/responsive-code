define([
	"app",
	"text!apps/dialog/show/templates/layout.html",	
	"text!apps/dialog/show/templates/dialog.html",	
	"text!apps/dialog/show/templates/modal.html",
	"text!apps/dialog/show/templates/close.html"
], function(App, LayoutTemplate, DialogTemplate, ModalTemplate, CloseTemplate){

	App.module("DialogApp.Show", function(Show, App, Backbone, Marionette, $, _){

		/* Main Layout */
		Show.Layout = Marionette.Layout.extend({
			initialize: function(){
				$("body").addClass("overflow");
			},
			template: LayoutTemplate,			
			regions: {
				dialogRegion : "#dialog-region",
			},
			events: {
				"click [data-overlay]": "closeDialog",			
			},
			closeDialog: function(){
				$("body").removeClass("overflow");
				this.close();
			}																
		});

		/* Dialog Template */
		Show.Dialog = Marionette.Layout.extend({
			template: DialogTemplate,
			regions: {
				closeRegion: "#close-region",
				modalRegion: "#modal-region"
			}
		});

		/* Close Template contains the x button */
		Show.CloseItemView = Marionette.ItemView.extend({
			template: CloseTemplate,
			events: {
				"click [data-close]": "closeDialog"
			},
			closeDialog: function(){
				$("body").removeClass("overflow");
				this.trigger("close:dialog");
			}
		});

		/* Modal Template */
		Show.ModalItemView = Marionette.ItemView.extend({			
			template: ModalTemplate,		
			events:{
				"click [data-buy]": "openBuyModal",
				"click [data-swap]": "openSwapModal",
			},
			templateHelpers:{
				userTooltip: function(){
					return "<div data-tooltip='"+ this.user+"' class='tooltip'>"+this.user+"</div>";
				}
			},
			openBuyModal: function(options){
				var that = this;
				console.log("open buy modal");				
				$("#buy").addClass("animate");
				$("#swap").addClass("hide");
				$("#buy").on('webkitAnimationEnd', function(){
					that.trigger("open:buy:modal", that);	
				});								
			},
			openSwapModal: function(options){
				var that = this;
				this.trigger("click:swap:item", that);
				
				$("#swap").addClass("animate");
				$("#buy").addClass("hide");	
				$("#swap").on('webkitAnimationEnd', function(){
					that.trigger("click:swap:item", that);				
				});							
			},		
		});		

	});

	return App.DialogApp.Show;

});
