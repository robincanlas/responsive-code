define([
	"app",
	"apps/marketplace/list/list_view",
	"product"
], function(App, View){

	App.module("MarketplaceApp.Show", function(Show, App, Backbone, Marionette, $, _){
			Show.Controller = Marionette.Controller.extend({
		
					initialize: function(options){

						this.layout = this.getLayoutView();
						this.collection = App.request("product:entities:marketplace");

						this.cloneCollection = _.clone(this.collection);

						this.listenTo(this.layout, "show", function(){
							this.itemRegion();
							this.sidebarRegion();
						});

						App.mainRegion.show(this.layout);
						this.listenTo(this.products, "itemview:click:price:buy", this.buySelectedProduct);
						this.listenTo(this.products, "itemview:show:dialog", this.showDialog);
					},

					/* Creates a vent trigger that will be listen by the dialog_app
						to open the dialog layout
					 */ 
					showDialog: function(iv){
						App.vent.trigger("dialog:show:dialog", {model: iv.model});
					},

					/* itemview triggers buy */
					buySelectedProduct:function(iv){
						App.vent.trigger("dialog:show:buy", {
							dialog: "buy",
							model: iv.model
						});
					},
					

					/*
					PA - Should group all view getters together from parent to child
					*/
					getLayoutView: function(){
						return new View.Layout();
						console.log("controller layout");
					},		

					getItemfromView: function(){
						return new View.Products({collection:this.collection});
					},

					/*
					Returns the sidebar layout view
					*/
					getSidebarLayoutView: function(){
						return new View.SidebarLayout();
					},

					getTagsView: function(options){
						return new View.Tags(options);
					},
					
					/*
					Returns the brands itemview filter
					Passes an array of brands
					*/
					getBrandsFilterView: function(filterCollection){
						return new View.BrandsFilter({collection:filterCollection});
					},

					/*
					Returns the price itemview filter
					*/					
					getPriceFilterView: function(options){
						return new View.PriceFilter(options);
					},

					//collectionView & listener
					itemRegion: function(){
						this.products = this.getItemfromView();
						this.layout.itemRegion.show(this.products);

					},

					sidebarRegion: function(){
						this.sidebar = this.getSidebarLayoutView();

						this.listenTo(this.sidebar, "show", function(){
							this.tagsFilterRegion(); // Moved original tags code here
							this.brandsFilterRegion();
							this.priceFilterRegion();
						});

						this.layout.sidebarRegion.show(this.sidebar);
					},

					/*
					Displays brands filter view in the sidebar
					*/
					tagsFilterRegion: function(){
						var options = {
							tags: this.collection.getValues('tags')
						};

						var tag = this.getTagsView(options);

						this.sidebar.tagsFilterRegion.show(tag);
						this.listenTo(tag, "sidebar:tags:remove", this.filterByTags);
					},

					/*
					Displays brands filter view in the sidebar
					*/
					brandsFilterRegion: function(){
						var options = {
							data: this.collection.getUniqueValues('brand')
						};

						var filterCollection = App.request("product:entities:filter", options);
						var brandsFilterView = this.getBrandsFilterView(filterCollection);

						this.sidebar.brandsFilterRegion.show(brandsFilterView);
						this.listenTo(brandsFilterView, "itemview:brand:remove", this.filterByBrand)
					},

					/*
					Displays price filter view in the sidebar
					*/
					priceFilterRegion: function(){

						var values = this.collection.getValues('price');
						var nulled = _.isEmpty(values);
						var temp = [];

						if ( nulled ) {

							var options = {
								price: '0'
							}
							
						}else{

							var prices = values.sort(function(a, b){return a - b;});
							var lowPrice = _.first(prices);
							var highPrice = _.last(prices);
							temp.push(lowPrice, highPrice);
							
							var options = {
								price: temp
							};
							
						}

						var priceFilterView = this.getPriceFilterView(options);
						this.sidebar.priceFilterRegion.show(priceFilterView);

					},	

					/*
					Triggered from the Brand Itemview inside the BrandsFilter CompositeView
					Reset a collection without the clicked brand
					Reopens the brands region with the new collection
					*/
					filterByBrand: function(itemview){
						var filtered = this.collection.filter(function(model){
							return model.get("brand") != itemview.model.get("brand");
						});


						this.collection.reset(filtered);
						this.artificialRender();
					},

					/* filter the tags */
					filterByTags: function(tags){
						console.log(tags);

						var temp = [tags];
						var tagList = this.collection.getValues("tags");
						var difference = _.difference(tagList, temp);

						var filtered = []


						this.collection.each(function(model){

							var intersection =  _.intersection( model.get('tags'), difference );

							if ( intersection.length > 0 ) {

								filtered.push({
									id: model.get('id'),
									brand: model.get('brand'),
									name: model.get('name'),
									image: model.get('image'),
									user: model.get('user'),
									price: model.get('price'),
									tags: intersection
								});
							};
						});

						
						this.collection.set(filtered);
						console.log(this.collection);
						this.artificialRender();
					},

					artificialRender: function(){
						this.sidebar.tagsFilterRegion.close();
						this.sidebar.brandsFilterRegion.close();
						this.tagsFilterRegion();
						this.brandsFilterRegion();
						this.priceFilterRegion();
					}
			
				});
			});
	return App.MarketplaceApp.Show; 
});