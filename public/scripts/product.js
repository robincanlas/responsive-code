define(["app"], function(App){

	App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){

		Entities.Filter = Backbone.Model.extend();

		Entities.FilterCollection = Backbone.Collection.extend({
			model: Entities.Filter,
		});

		Entities.Product = Backbone.Model.extend({
			defaults: {
				initialMatched: false,
				selectedItem: false,
				hasCheck: false,
				setReady: false,
				forSwap: false
			}
		});

		Entities.ProductCollection = Backbone.Collection.extend({
			model: Entities.Product,

			/*
			Returns an array of unique values for a given key (tags or brand), 
			*/
			getUniqueValues: function(key){
				var tempArray = [];
				var val = _.chain(this.pluck(key)).uniq().value();

				for ( var i = 0; i < val.length; i++ ) {
					var tempObject = {};
					tempObject[key] = val[i];
					tempArray.push(tempObject);
				}

				return tempArray
			},

			getValues: function(key){
				var temp = [];

				this.each(function(model){
					temp.push(model.get(key));
				});

				return _.chain(temp).flatten().uniq().value();
			},

		});

		var API = {
			getMarketplaceProducts: function(options){
				var products = new Entities.ProductCollection([
					{ id:1036079, brand:"MAC", name:"Eye Shadow", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B0052G5U3Y", user:"Jamie", tags: ["foundation"], price: 70},
					{ id:1217094, brand:"MAC", name:"120 Color Hello Kitty Eyeshadow Palette", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B0086ZP0LK", user:"Jamie", tags: ["brush",], price: 30},
					{ id:1297821, brand:"MAC", name:"Studio Fix Powder Plus Foundation", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B0017QK4DE", user:"Raven", tags: ["brush", "accessory"], price: 100},
					{ id:1491803, brand:"MAC", name:"Studio Careblend/Pressed Powder", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B00507JR70", user:"Raven", tags: ["brush", "accessory"], price: 40},
					{ id:1521236, brand:"MAC", name:"VIVA GLAM Lipstick", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B000ETZS6S", user:"Raven", tags: ["brush", "accessory"], price: 100},
					{ id:1523046, brand:"MAC", name:"Large Powder Brush", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B003F6HU2M", user:"Raven", tags: ["brush", "accessory"], price: 5},
					{ id:1549447, brand:"Sephora", name:"VIVA GLAM Nicki Lipstick", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B0079RQ0EM", user:"Jamie", tags: ["accessory", "lipstick"], price: 11},
					{ id:1736005, brand:"MAC", name:"Mineralize Blush", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B00414SS46", user:"Rogue", tags: ["brush", "accessory"], price: 120},
					{ id:1742755, brand:"MAC", name:"VIVA GLAM Gaga Lipglass", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B004B7O4QY", user:"Annie", tags: ["brush", "accessory"], price: 20},
					{ id:1748936, brand:"MAC", name:"Tinted Lipglass", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B001PDQ3VQ", user:"Jamie", tags: ["brush", "accessory"], price: 01},
					{ id:1800617, brand:"MAC", name:"Brush Cleanser", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B0017QK46G", user:"Rogue", tags: ["brush", "accessory"], price: 110},
					{ id:1807357, brand:"MAC", name:"Studio Fix Fluid SPF 15", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B0017QPI8K", user:"Jamie", tags: ["brush"], price: 03},
					{ id:1927415, brand:"MAC", name:"Pro Sculpting Cream", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B009QD9ZFS", user:"Annie", tags: ["brush", "accessory"], price: 40},
					{ id:1947788, brand:"MAC", name:"Eye Shadow", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B0002DNXXQ", user:"Annie", tags: ["brush", "accessory"], price: 100},
					{ id:2089704, brand:"MAC", name:"Lipstick", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B0082IWXP2", user:"Rogue", tags: ["brush"], price: 50},
					{ id:2146086, brand:"MAC", name:"Studio Finish SPF 35 Concealer", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B0002DO4OS", user:"Rogue", tags: ["brush", "accessory"], price: 100},
					{ id:2170188, brand:"MAC", name:"Tapered Blending Brush", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B004BFCE3Q", user:"Jamie", tags: ["brush", "accessory"], price: 90},
					{ id:2317369, brand:"MAC", name:"Studio Fix Powder Plus Foundation", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B0002DO1RS", user:"Annie", tags: ["brush", "accessory"], price: 60},
					{ id:2411447, brand:"MAC", name:"Duo-Sided Sharpener", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B008GNPDR8", user:"Jamie", tags: ["accessory"], price: 80},
					{ id:2469240, brand:"MAC", name:"Powder Blush", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B00438C9OU", user:"Katarina", tags: ["brush", "accessory"], price: 10},
				]);
					
				// var defer = $.Deferred();
				// setTimeout(function(){
				// 	products.fetch({
				// 		success: function(data){
				// 			defer.resolve(data);
				// 			// console.log(defer.resolve(data));
				// 			console.log(data);
				// 		}
				// 	});					

				// });
				// var promise = defer.promise();
				// $.when(promise).done(function(products){
				// 	if(product.length === 0) {
				// 		var models = initializeProducts();
				// 		products.reset(models);
				// 	}
				// });
				// console.log(promise);
				// return promise;
				return products
			},

			// var initializeProducts = function(){
			// 	var products = new Entities.ProductCollection([
			// 		{ id:1036079, brand:"MAC", name:"Eye Shadow", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B0052G5U3Y", user:"Jamie", tags: ["foundation"], price: 70},
			// 		{ id:1217094, brand:"MAC", name:"120 Color Hello Kitty Eyeshadow Palette", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B0086ZP0LK", user:"Jamie", tags: ["brush",], price: 30},
			// 		{ id:1297821, brand:"MAC", name:"Studio Fix Powder Plus Foundation", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B0017QK4DE", user:"Raven", tags: ["brush", "accessory"], price: 100},
			// 		{ id:1491803, brand:"MAC", name:"Studio Careblend/Pressed Powder", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B00507JR70", user:"Raven", tags: ["brush", "accessory"], price: 40},
			// 		{ id:1521236, brand:"MAC", name:"VIVA GLAM Lipstick", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B000ETZS6S", user:"Raven", tags: ["brush", "accessory"], price: 100},
			// 		{ id:1523046, brand:"MAC", name:"Large Powder Brush", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B003F6HU2M", user:"Raven", tags: ["brush", "accessory"], price: 5},
			// 		{ id:1549447, brand:"Sephora", name:"VIVA GLAM Nicki Lipstick", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B0079RQ0EM", user:"Jamie", tags: ["accessory", "lipstick"], price: 11},
			// 		{ id:1736005, brand:"MAC", name:"Mineralize Blush", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B00414SS46", user:"Rogue", tags: ["brush", "accessory"], price: 120},
			// 		{ id:1742755, brand:"MAC", name:"VIVA GLAM Gaga Lipglass", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B004B7O4QY", user:"Annie", tags: ["brush", "accessory"], price: 20},
			// 		{ id:1748936, brand:"MAC", name:"Tinted Lipglass", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B001PDQ3VQ", user:"Jamie", tags: ["brush", "accessory"], price: 01},
			// 		{ id:1800617, brand:"MAC", name:"Brush Cleanser", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B0017QK46G", user:"Rogue", tags: ["brush", "accessory"], price: 110},
			// 		{ id:1807357, brand:"MAC", name:"Studio Fix Fluid SPF 15", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B0017QPI8K", user:"Jamie", tags: ["brush"], price: 03},
			// 		{ id:1927415, brand:"MAC", name:"Pro Sculpting Cream", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B009QD9ZFS", user:"Annie", tags: ["brush", "accessory"], price: 40},
			// 		{ id:1947788, brand:"MAC", name:"Eye Shadow", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B0002DNXXQ", user:"Annie", tags: ["brush", "accessory"], price: 100},
			// 		{ id:2089704, brand:"MAC", name:"Lipstick", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B0082IWXP2", user:"Rogue", tags: ["brush"], price: 50},
			// 		{ id:2146086, brand:"MAC", name:"Studio Finish SPF 35 Concealer", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B0002DO4OS", user:"Rogue", tags: ["brush", "accessory"], price: 100},
			// 		{ id:2170188, brand:"MAC", name:"Tapered Blending Brush", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B004BFCE3Q", user:"Jamie", tags: ["brush", "accessory"], price: 90},
			// 		{ id:2317369, brand:"MAC", name:"Studio Fix Powder Plus Foundation", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B0002DO1RS", user:"Annie", tags: ["brush", "accessory"], price: 60},
			// 		{ id:2411447, brand:"MAC", name:"Duo-Sided Sharpener", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B008GNPDR8", user:"Jamie", tags: ["accessory"], price: 80},
			// 		{ id:2469240, brand:"MAC", name:"Powder Blush", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B00438C9OU", user:"Katarina", tags: ["brush", "accessory"], price: 10},
			// 	]);
				
			// 	products.each(function(product){
			// 		product.set();
			// 	});
			// 	console.log(products);
			// 	return products.models;
			// },


			getProductsFilter: function(options){
				var filter = new Entities.FilterCollection(options.data);

				return filter;
				console.log(filter);
			},

			getUserSwapList: function(){
				var  swap = new Entities.ProductCollection([
					{ id:1217094, brand:"MAC", name:"120 Color Hello Kitty Eyeshadow Palette", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B0086ZP0LK", user:"Chloe", tags: ["brush",], price: 30},
					{ id:1297821, brand:"MAC", name:"Studio Fix Powder Plus Foundation", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B0017QK4DE", user:"Chloe", tags: ["brush", "accessory"], price: 100},
					{ id:1491803, brand:"MAC", name:"Studio Careblend/Pressed Powder", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B00507JR70", user:"Chloe", tags: ["brush", "accessory"], price: 40},
					{ id:1521236, brand:"MAC", name:"VIVA GLAM Lipstick", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B000ETZS6S", user:"Chloe", tags: ["brush", "accessory"], price: 100},
					{ id:1523046, brand:"MAC", name:"Large Powder Brush", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B003F6HU2M", user:"Chloe", tags: ["brush", "accessory"], price: 5},
					{ id:1549447, brand:"Sephora", name:"VIVA GLAM Nicki Lipstick", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B0079RQ0EM", user:"Chloe", tags: ["accessory"], price: 11},
					{ id:1736005, brand:"MAC", name:"Mineralize Blush", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B00414SS46", user:"Chloe", tags: ["brush", "accessory"], price: 120},
					{ id:1742755, brand:"MAC", name:"VIVA GLAM Gaga Lipglass", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B004B7O4QY", user:"Chloe", tags: ["brush", "accessory"], price: 10},
					{ id:1742755, brand:"MAC", name:"VIVA GLAM Gaga Lipglass", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B004B7O4QY", user:"Chloe", tags: ["brush", "accessory"], price: 40},
					{ id:1742755, brand:"MAC", name:"VIVA GLAM Gaga Lipglass", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B004B7O4QY", user:"Chloe", tags: ["brush", "accessory"], price: 60},
					]);

				return swap;
			},

			getUserWishList: function(){
				var wish = new Entities.ProductCollection([
					{ id:1521236, brand:"MAC", name:"VIVA GLAM Lipstick", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B000ETZS6S", user:"Jamie", tags: ["brush", "accessory"], price: 100},
					{ id:1523046, brand:"MAC", name:"Large Powder Brush", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B003F6HU2M", user:"Katarina", tags: ["brush", "accessory"], price: 5},
					{ id:1549447, brand:"Sephora", name:"VIVA GLAM Nicki Lipstick", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B0079RQ0EM", user:"Raven", tags: ["accessory"], price: 11},
					{ id:1736005, brand:"MAC", name:"Mineralize Blush", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B00414SS46", user:"Annie", tags: ["brush", "accessory"], price: 120},
					{ id:1742755, brand:"MAC", name:"VIVA GLAM Gaga Lipglass", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B004B7O4QY", user:"Jamie", tags: ["brush", "accessory"], price: 20},
					{ id:1748936, brand:"MAC", name:"Tinted Lipglass", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B001PDQ3VQ", user:"Jamie", tags: ["brush", "accessory"], price: 01},
					{ id:1800617, brand:"MAC", name:"Brush Cleanser", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B0017QK46G", user:"Rouge", tags: ["brush", "accessory"], price: 110},
					{ id:1807357, brand:"MAC", name:"Studio Fix Fluid SPF 15", image:"http://d11lxttoebl3uu.cloudfront.net/upload/upload/product/275B0017QPI8K", user:"Chloe", tags: ["brush"], price: 03},
					]);

				return wish;
			}
		};

		App.reqres.setHandler("product:entity", function(){
		});

		App.reqres.setHandler("product:entities", function(){
		});

		/*
		Requested from Marketplace App
		Returns a collection of products containing id, brand, name, user, and tags
		*/
		App.reqres.setHandler("product:entities:marketplace", function(options){
			return API.getMarketplaceProducts(options);
		});

		App.reqres.setHandler("product:entities:filter", function(options){
			return API.getProductsFilter(options);
		});

		App.reqres.setHandler("product:entities:swaplist", function(){
			return API.getUserSwapList();
		});

		App.reqres.setHandler("product:entities:wishlist", function(){
			return API.getUserWishList();
		});

		/**
		 * Swap/sell
		 * Send a request
		 */
	});

	return;
});