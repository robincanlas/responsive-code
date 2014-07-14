define([
	"apps/marketplace/list/list_view"
], function(View){
	describe("Marketplace", function(){

		/* Layout Test */
		describe("Layout", function(){

			var v;

			beforeEach(function(){
				v = new View.Layout();
				
			});

			it("should have a template", function(){
				expect(v.template).to.be.a('string');
			});

			it("should have a item region", function(){
				expect( v.regions.itemRegion ).to.equal("#item-region");
			});

			it("should have a sidebar region", function(){
				expect( v.regions.sidebarRegion ).to.equal("#sidebar-region");
			});
		});

		/* SidebarRegion Test */
		describe("Sidebar", function(){

			var sbl;

			beforeEach(function(){
				sbl = new View.SidebarLayout();
			});

			it("should have a template", function(){
				expect(sbl.template).to.be.a('string');
			});

			it("should have a tags region", function(){
				expect( sbl.regions.tagsFilterRegion ).to.equal("#tags-filter");
			});

			it("should have a brands region", function(){
				expect( sbl.regions.brandsFilterRegion ).to.equal("#brands-filter");
			});

			it("should have a price region", function(){
				expect( sbl.regions.priceFilterRegion ).to.equal("#price-filter");
			});
		});

		/* Sidebar TagsFilter Test */
		describe('Sidebar Tags', function(){
			
			var sbt;

			beforeEach(function(){
				sbt = new View.Tags({tags: ["foundation", "brush", "accessory", "lipstick"]});

			});

			it("should have a initialize function", function(){
				expect( sbt.initialize ).to.be.a( 'function' );
			});

			it("should have a Template", function(){
				expect( sbt.template ).to.be.a( 'string' );
			});

			it("should have a templateHelpers", function(){
				expect( sbt.templateHelpers.tagNames ).to.be.a("function");
			});

			it("should have a serializeData function", function(){
				expect( sbt.serializeData ).to.be.a( 'function' );
			});

			it("should have an removeTags events", function(){
				expect( sbt.events ).to.be.a( 'object' ).removeTags;
			});

		});

		/* Sidebar PriceFilter Test */
		describe('Sidebar Price', function(){
			var sbp;
		
			beforeEach(function(){
				sbp = new View.PriceFilter({price: [1, 120]});
			});

			it("should have a initialize function", function(){
				expect( sbp.initialize ).to.be.a( 'function' );
			});

			it("should have a Template", function(){
				expect( sbp.template ).to.be.a( 'string' );
			});

			it("should have a templateHelpers", function(){
				expect( sbp.templateHelpers.priceMinMax ).to.be.a("function");
			});

			it("should have a serializeData function", function(){
				expect( sbp.serializeData ).to.be.a( 'function' );
			});
		});

		/* Sidebar BrandsFilter Test */
		describe('Sidebar Brands', function(){
			var sbb;
		
			beforeEach(function(){
				sbb = new View.BrandsFilter();
				sbbiv = new View.Brand();
			});

			it("should have a Template", function(){
				expect( sbb.template ).to.be.a( 'string' );
			});

			it("should have an ItemView", function(){
				expect( sbb.itemView ).to.equal( View.Brand );
			});
			
			it("should have an itemViewContainer", function(){
				expect( sbb.itemViewContainer ).eql('#brands-list');
			});
			
			it("should have a Template", function(){
				expect( sbbiv.template ).to.be.a( 'function' );
			});

			it("should have a triggers", function(){
				expect( sbbiv.triggers ).eql({click:'brand:remove'});
			});
		});

		/* Product CollectionView Test */
		describe("Product Collection View", function(){

			var cvp;
			this.collection;

			beforeEach(function(){
				cvp = new View.Products();

			});

			it("should have an ItemView", function(){
				expect( cvp.itemView ).to.equal( View.Item );
			});


		});

		/* Product ModelView Test */
		describe("Product Itemview", function(){

			var ivp;

			beforeEach(function(){
				ivp = new View.Item;
			});

			it("should have a Template", function(){
				expect( ivp.template ).to.be.a( 'string' );
			});

			it("should have a templateHelpers", function(){
				expect( ivp.templateHelpers.userTooltip ).to.be.a("function");
			});

			it("should have a triggers", function(){
				expect( ivp.triggers ).to.be.a("object");
			});

			it("should have an events", function(){
				expect( ivp.events ).to.be.a( 'object' ).itemShadow;
				expect( ivp.events ).to.be.a( 'object' ).shadowDelete;
			});


		});


	});

});

