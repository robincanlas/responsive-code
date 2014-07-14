define([
	"app",
	"text!apps/dialog/swap/templates/swap.html",
	"text!apps/dialog/swap/templates/swap.header.html",
	"text!apps/dialog/swap/templates/swap.modelreceive.html",
	"text!apps/dialog/swap/templates/swap.collection.layout.html",
	"text!apps/dialog/swap/templates/swap.seller.layout.html",
	"text!apps/dialog/swap/templates/swap.trader.layout.html",
	"jqueryui"
], function(App, SwapTemplate, SwapHeaderTemplate, SwapModelReceiveTemplate, SwapCollectionViewTemplate, SellerTemplate, TraderTemplate){

	App.module("DialogApp.Swap", function(Swap, App, Backbone, Marionette, $, _){
		
		/* --Layout-- */
		Swap.Layout = Marionette.LayoutView.extend({
			template: SwapTemplate,
			regions: {
				swapHeader: "#swap-header",
				swapModelReceive: "#swap-modelReceive",
				swapCollections: "#swap-collections"		
			}
		});

		/* --Header-- */
		Swap.Header = Marionette.ItemView.extend({
			modelEvents: {
				"change:setReady": "render"
			},
			template: SwapHeaderTemplate,
			templateHelpers: {
				isProcessing: function(){
					if ( this.setReady === true ) {
						return "<button class='ready' disabled>Match Found</button>";

					} else {
						return "<button class='process' disabled>Processing<span id='word'></span></button>";
					}
				},

				requestSwap: function(){
					if ( this.setReady === true ) {
						return "<button class='ready'><img src='images/swap_icon.png'> REQUEST SWAP</button>";
					} else {
						return "<button class='process-request' disabled>REQUEST SWAP</button>";
					}
				}
			},
			triggers: {
				"click [data-cancel]": "previous:modal"
			}
		});

		/* --Model of the selected item-- */
		Swap.ModelReceive = Marionette.ItemView.extend({
			template: SwapModelReceiveTemplate
		});


		/* --Swap Layout-- */
		Swap.Collections = Marionette.LayoutView.extend({
			template: SwapCollectionViewTemplate,
			className: "main-container",
			regions: {
				sellerRegion: '#swap-SellerRegion',
				traderRegion: '#swap-TraderRegion'
			},
			
		});

		/* --Seller Wishlist-- */
		Swap.Seller = Marionette.ItemView.extend({
			template: SellerTemplate,
			className: "images",
			tagName: "li",
			templateHelpers: {
				isMatched: function(){
					if ( this.initialMatched === true ) {
						return 'match';
					} else {
						return 'no-match';
					}
				},
				selected: function(){

					if ( this.forSwap === true ) {
						return "<img class='unchecked check' src='http://i.imgur.com/fA6Z6.png'>";
					}else{
						return "<img class='unchecked' src='http://i.imgur.com/fA6Z6.png'>";
					}
				}
			},

			modelEvents:{
				"change:forSwap" : "render",
				"change:matched": "render",
			},
			
			events:{
				"click": "select",
				// "click" : "itemDeselect"
			},

			select: function(e){
				this.trigger("item:product:select");
				if ( this.model.get("selectedItem") != true ){
				    this.$el.find("img.unchecked").toggleClass("check");
					this.$el.toggleClass('tempSelected');
				}
			},
		});

		Swap.CollectionSeller = Marionette.CollectionView.extend({
			childView: Swap.Seller,
			className: "seller-main",
			tagName: "ul",
		});

		/* --Buyer Swaplist-- */
		Swap.Trader = Marionette.ItemView.extend({
			template: TraderTemplate,
			className: "images",
			tagName: "li",
			modelEvents:{
				// "all" : "render",
				"change:hasCheck":"render",
				// "change:hasCheck": "toggleCheck"
			},

			templateHelpers: {
				isMatched: function(){
					if ( this.initialMatched === true ) {
						return 'match';
					}  else {
						return 'no-match';
					}
				}
			},
			events: {
				"click": "select",
			},
			select: function(e){
				this.trigger("item:product:select");
				if ( this.model.get("selectedItem") != true ){
				    this.$el.find("img.unchecked").toggleClass("check");
					this.$el.toggleClass('tempSelected');
				}
			},
		});
		
		Swap.CollectionTrader = Marionette.CollectionView.extend({
			childView: Swap.Trader,
			className: "trader-main",
			tagName: "ul",
			// events:{
			// 	// "click .tempSelected" : "selectedfromItemViewMultipleDrag"
			// },
			// onDomRefresh: function(){
			// 	var that = this;
			// 	$(".images").draggable({
			// 		containment: ".main-container",
			// 		revert: true,

			// 		start: function() {
			// 			that.trigger("drag:start")
			// 			console.log("can drag");
			// 		},

			// 		drag: function(e,ui) {
			//             $('.sellerSelected').css({
			//                 top: ui.position.top,
			//                 left: ui.position.left
			//             });
			// 		},

			// 		stop: function(){
			//             $('.sellerSelected').css({
			//                 top: 0,
			//                 left: 0
			//             });
			// 			that.trigger("drag:done");
			// 		}
			// 	});



			// 	// this.selectedfromItemViewMultipleDrag();
			// 	/* draggable */
			// },
			// selectedfromItemViewMultipleDrag: function() {

			// 	var that = this;

			// 	$(".tempSelected").draggable({
			// 		containment: ".main-container",
			// 		revert: true,


			// 		start: function() {
			// 		},

			// 		drag: function(e,ui) {
			//             $('.tempSelected').css({
			//                 top: ui.position.top,
			//                 left: ui.position.left
			//             });
			// 		},

			// 		stop: function(){
			//             $('.tempSelected').css({
			//                 top: 0,
			//                 left: 0
			//             });

			//             // This is the problem that causes multiple wish items to be
			//             // be set as true
			// 			// that.collection.each(function(model){
			// 			// 	if ( model.get("selectedItem") != true ) {
			// 			// 		model.set("forSwap", true);
			// 			// 		that.trigger("drag:item:product:selected", model);
			// 			// 	}
			// 			// });
			// 			that.trigger("drag:done");
			// 		}
			// 	});
			// },

		});	

	});
	return App.DialogApp.Swap; 
});
