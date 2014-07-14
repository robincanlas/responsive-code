define([
	"app",
	"apps/dialog/swap/swap_view",
	"product"
], function(App, View){

	App.module("DialogApp.Swap", function(Swap, App, Backbone, Marionette, $, _){
			Swap.Controller = Marionette.Controller.extend({
		
					initialize: function(options){
						this.isDragging = false;
						
						this.layout = this.getLayoutView();
						
						this.wishlist = App.request("product:entities:wishlist");
						this.swaplist = App.request("product:entities:swaplist");

						this.model = options.model;
						
						var wish = this.wishlist;
						this.getwishlist(options);
						this.swapandwishMatched();
						// this.setReady();

						this.listenTo(this.layout, "show", function(){
							this.swapHeader();
							this.swapModelReceive();
							this.swapCollections();
						});

						options.region.show(this.layout);
						
						this.listenTo(this.header, "previous:modal", function(options){
							App.vent.trigger("open:dialog:layout", {model:options.model});
						});
						this.listenTo(this.seller, "itemview:item:product:select", this.productSelect);
						// this.listenTo(this.trader, "itemview:item:product:select", this.productSelect);
						// this.listenTo(this.trader, "itemview:item:product:select:drag", this.productSelect);
						// this.listenTo(this.trader, "drag:item:product:selected", this.selectDeselectDragCollection);

						// PA's new event handlers
						// this.listenTo(this.trader, "drag:start", this.onDragStart);
						// this.listenTo(this.trader, "drag:done", this.onDragDone);
						this.listenTo(this.trader, "itemview:item:product:select", this.onSwapClick)
						
					},

					getLayoutView: function(){
						return new View.Layout();
					},


					/* Header */
					getSwapHeaderView: function(){
						return new View.Header({model: this.model});
					},

					swapHeader:function(){
						this.header = this.getSwapHeaderView();
						this.layout.swapHeader.show(this.header);
					},

					/* Model */
					getModelReceiveView: function(){
						return new View.ModelReceive({model:this.model});
					},

					swapModelReceive: function(){
						this.modelReceived = this.getModelReceiveView();
						this.layout.swapModelReceive.show(this.modelReceived);
					},

					/* Collection Layout*/
					getSwapCollectionView: function(){
						return new View.Collections();
					},

					setReady: function(){
						var wishList = this.wishlist.getValues('forSwap');
						var swapList = this.swaplist.getValues('forSwap');
						var temp = [true];

						var intersection = _.intersection(wishList, swapList);
						var match = _.intersection(intersection, temp);
						var nulled = _.isEmpty(match);

						if (nulled) {
							this.model.set('setReady', false);
						}else{
							this.model.set('setReady', true);
						}
					},

					swapCollections: function(){
						this.collectionTemp = this.getSwapCollectionView();

						this.listenTo(this.collectionTemp, "show", function(){
							this.sellerRegion();
							this.traderRegion();
						});
						
						this.layout.swapCollections.show(this.collectionTemp);
					},

					/* Seller Region*/
					getSellerRegionView:function(){
						return new View.CollectionSeller({collection:this.wishlist});
					},

					sellerRegion: function(){
						this.seller = this.getSellerRegionView();
						this.collectionTemp.sellerRegion.show(this.seller);
					},

					/* Trader Region*/
					traderRegion: function(){
						this.trader = this.getTraderRegionView();
						this.collectionTemp.traderRegion.show(this.trader);
					},

					getTraderRegionView:function(){
						return new View.CollectionTrader({collection: this.swaplist});
					},

					/* Getting the wishlist of the user that is selling the product */
					getwishlist: function(options){
						
						var wishList = [];
						var user = options.model.get('user');

						var getList = this.wishlist.each(function(model){
							if (model.get('user') == user ) {
								wishList.push({
									id: model.get('id'),
									brand: model.get('brand'),
									name: model.get('name'),
									image: model.get('image'),
									user: model.get('user'),
									price: model.get('price'), 
								});
							};
						});

						this.wishlist.reset(wishList);
					},

					/* Matched items highlighted */
					swapandwishMatched: function(){
						var that = this;
						var swap = this.swaplist.getValues('id');
						var wish = this.wishlist.getValues('id');
						var intersection = _.intersection(swap, wish);
						
						var initialMatched = _.each(intersection, function(match){
							
							var getSwap = that.swaplist.each(function(list){
								if ( list.get('id') == match) {
									list.set({
										initialMatched: true,
										// selected: true
									});
								}; 
							});

							var getWish = that.wishlist.each(function(list){
								if ( list.get('id') == match) {
									list.set({
										initialMatched: true,
										// selected: true
									});
								}; 
							});

						});

					},

					/* Model Select on ItemView */
					productSelect: function(iv){
						// if (iv.) {};
						this.wishlist.each(function(wish){

							if (wish.get('id') == iv.model.get('id')) {
								wish.set({
									forSwap: true,
									// selectedItem: true
								});

								var match = wish.get('forSwap');

							};
						});

						this.swaplist.each(function(swap){
							if (swap.get('id') == iv.model.get('id')) {
								swap.set({
									forSwap: true,
									// selectedItem: true
								});

								var match = swap.get('forSwap');

							};
						});

						this.setReady();

					},

					// /* Model Deselect on ItemView */
					// productDeselect: function(iv){
					// 	if (iv.model.get('forSwap') == true) {
					// 		iv.model.set('forSwap', false)
					// 	};
					// 	this.setReady();
					// },

					onSwapClick: function(){
						console.log(this.model.get('hasCheck'));
						if ( this.isDragging ) {
							if ( this.model.get('hasCheck') != true ) {	
								this.model.set('hasCheck', true);	
							} else {
								console.log("false");
								this.model.set('hasCheck', false);
							}
						console.log(this.model.get('hasCheck'));
						}
					}

				});
			});
	return App.DialogApp.Swap;
});