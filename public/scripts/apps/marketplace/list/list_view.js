define([
	"app",
	"text!apps/marketplace/list/templates/layout.html",
	"text!apps/marketplace/list/templates/product.html",
	"text!apps/marketplace/list/templates/tags.html",
	"text!apps/marketplace/list/templates/sidebar.html",
	"text!apps/marketplace/list/templates/filter.brands.html",
	"text!apps/marketplace/list/templates/filter.price.html"
], function(App, LayoutTemplate, ProductTemplate, TagsFilterTemplate, SidebarTemplate,
	BrandsFilterTemplate, PriceFilterTemplate){

	App.module("MarketplaceApp.Show", function(Show, App, Backbone, Marionette, $, _){
		Show.Layout = Marionette.Layout.extend({
			template: LayoutTemplate,
			regions: {
				itemRegion: "#item-region",
				sidebarRegion: "#sidebar-region"
			}			
		});

		/*-- Sub-layout to contain all the filter itemviews --*/
		Show.SidebarLayout = Marionette.Layout.extend({
			template: SidebarTemplate,
			regions: {
				tagsFilterRegion: "#tags-filter",
				brandsFilterRegion: "#brands-filter",
				priceFilterRegion: "#price-filter",
			},
		});

		/*--Collection View for Product--*/
		Show.Item = Marionette.ItemView.extend({
			template: ProductTemplate,
			triggers: {
				"click [data-image],[data-name],[data-user]":"show:dialog",
				"click [data-button]": "click:price:buy"
			},
			events: {
				"mouseover" : "itemShadow",
				"mouseout" : 'shadowDelete',
			},
			templateHelpers:{
				userTooltip: function(){
					return "<div data-tooltip='"+ this.user+"' class='tooltip'>"+this.user+"</div>";
				}
			},
			itemShadow: function(){
				this.$el.find('.body-product').addClass("shadow");
			},
			shadowDelete: function(){
				this.$el.find('.body-product').removeClass("shadow");
			}
		});
		Show.Products = Marionette.CollectionView.extend({
			itemView: Show.Item,
		});
		

					/*--TAGSFILTER--*/
		Show.Tags = Marionette.ItemView.extend({
			initialize: function(options){
				this.tagNames = options.tags;
			},
			template: TagsFilterTemplate,
			
			templateHelpers: {
				tagNames: function(){
					var list = "";
					_.each(this.tags, function(tag){
						list += "<button data-filterButton class='filterButton'>"+tag+" <span class='x'> x</span></button>";
					});

					return list;
				},
			},
			
			serializeData: function(){
				return {
					tags: this.tagNames,
				}
			},
			events: {
				"click button": "removeTags",
				"mouseover"   : "crossDarken",
				"mouseout"    : "crossLighten"
			},
			// xMouseOver: function() {
			// 	this.$el.find("span.x").addClass("dark");
			// },
			// xMouseOut: function() {
			// 	this.$el.find("span.x").removeClass("dark");
			// },
			removeTags: function(e){
				var innerValue = e.currentTarget.innerText.slice(0,-2);
				this.trigger("sidebar:tags:remove", innerValue)
			},

			crossDarken: function(){
				this.$el.find('span').addClass('darken');
				console.log('dark');
			},

			crossLighten: function(){
				this.$el.find('span').removeClass('darken');
				console.log('light');
			},
		});

					/*--PRICEFILTER--*/
		Show.PriceFilter = Marionette.ItemView.extend({
			initialize: function(options){
				this.priceMinMax = options.price;
			},
			template: PriceFilterTemplate,
			
			templateHelpers: {
				priceMinMax: function(){
					var list = "";
					_.each(this.price, function(price){
							list += "<span>"+ price +" "+ "</span>";
					});
					return list;
				},
			},
			
			serializeData: function(){
				return {
					price: this.priceMinMax,
				}
			},

		});

					/*--BRANDSFILTER--*/
		Show.Brand = Marionette.ItemView.extend({
			template: _.template( "<button class='filterButton'><%= brand %><span class='x'> x</span></button>"),
			triggers: {
				"click": "brand:remove"
			},
			events: {
				"mouseover"   : "crossDarken",
				"mouseout"    : "crossLighten"
			},

			crossDarken: function(){
				this.$el.find('span').addClass('darken');
			},

			crossLighten: function(){
				this.$el.find('span').removeClass('darken');
			},

		});

		Show.BrandsFilter = Marionette.CompositeView.extend({
			template: BrandsFilterTemplate,
			itemView: Show.Brand,
			itemViewContainer: "#brands-list",
		});
		// End of refactored BrandFilter Code
	});

	return App.MarketplaceApp.Show; 
});