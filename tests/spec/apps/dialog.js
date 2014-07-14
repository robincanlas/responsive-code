define([
	"apps/dialog/show/show_view",
	"apps/dialog/buy/buy_view",
	"apps/dialog/swap/swap_view"
], function(ShowView, BuyView, SwapView) {

	/* DIALOG LAYOUT */
	describe("Dialog Show View", function(){

		var d, c, m, l, el;

		beforeEach(function(){
			el = $("#test-dialog").empty();
			l = new ShowView.Layout();
			d = new ShowView.Dialog();
			c = new ShowView.CloseItemView();
			m = new ShowView.ModalItemView();
		});

		it("Layout should have a LayoutTemplate", function(){
			expect(l.template).to.be.a('string');
		});

		it("Layout should have a dialog region", function(){
			expect( l.regions.dialogRegion ).to.equal("#dialog-region");
		});

		it("Layout should have an event and function for closing the dialog", function(){
			expect(l.events).to.be.a('object').closeDialog;
			expect(l.closeDialog).to.be.a('function');
		});

		it("Dialog should have a DialogTemplate", function(){
			expect(d.template).to.be.a('string');
		});

		it("Dialog should have a closeRegion and modalRegion", function(){
			expect( d.regions.closeRegion ).to.equal("#close-region");
			expect( d.regions.modalRegion ).to.equal("#modal-region");
		});

		it("Close Itemview should have a CloseTemplate", function(){
			expect(c.template).to.be.a('string');
		});

		it("Close Itemview should have a Close Dialog Event", function(){
			expect(c.events).to.be.a('object').closeDialog;
			expect(c.closeDialog).to.be.a('function');
		});		

		it("Modal Itemview should have a ModalTemplate", function(){
			expect(m.template).to.be.a('string');
		});

		it("Modal Itemview should have an Events", function(){
			expect(m.events).to.be.a('object');
			console.log(m.events);
		});		

		it("Modal Itemview should have a TemplateHelpers", function(){
			expect(m.templateHelpers).to.be.a('object');
		});

		it("Modal Itemview should have an Open Buy modal and Swap Modal function", function(){
			expect(m.openBuyModal).to.be.a('function');
			expect(m.openSwapModal).to.be.a('function');
		});					

	});

	/* DIALOG BUY */
	describe("Dialog Buy View", function(){

		var el, b;

		beforeEach(function(){
			el = $("#test-dialog").empty();
			b = new BuyView.ItemViewBuy();
		});
		
		it("ItemviewBuy should have a BuyTemplate", function(){
			expect(b.template).to.be.a('string');
		});

		it("ItemViewBuy should have an Event", function(){
			expect(b.events).to.be.a('object');
		});		

		it("ItemviewBuy should have a Trigger", function(){
			expect(b.triggers).to.be.a('object');
			expect(b.previousModal).to.be.a('function');
		});			

	});

	/* DIALOG SWAP */
	describe("Dialog Swap View", function(){
		
		var el, l, h, m, c;

		beforeEach(function(){
			el = $("#test-dialog").empty();
			l = new SwapView.Layout();
			h = new SwapView.Header();
			m = new SwapView.ModelReceive();
			c = new SwapView.Collections();
			s = new SwapView.Seller();
			cs = new SwapView.CollectionSeller();
			t = new SwapView.Trader();
			ct = new SwapView.CollectionTrader();
		});

		it("should have a SwapTemplate", function(){
			expect(l.template).to.be.a('string');
		});

		it("Swap Layout should have a swapHeader Region, swapModelReceive Region and swapCollections Region", function(){
			expect( l.regions.swapHeader ).to.equal("#swap-header");
			expect( l.regions.swapModelReceive ).to.equal("#swap-modelReceive");
			expect( l.regions.swapCollections ).to.equal("#swap-collections");
		});

		it("Swap Header should have a SwapHeaderTemplate", function(){
			expect(h.template).to.be.a('string');
		});

		it("Swap Header should have a modelEvents", function(){
			expect(h.modelEvents).to.be.a('object');
		});

		it("Swap Header should have a TemplateHelpers", function(){
			expect(h.templateHelpers).to.be.a('object');
		});

		it("Swap Header should have a Previous Modal Trigger", function(){
			expect(h.triggers).to.be.a('object');
		});						

		it("ModelReceive should have a SwapModelReceiveTemplate", function(){
			expect(m.template).to.be.a('string');
		});

		it("Collections should have a SwapCollectionViewTemplate", function(){
			expect(c.template).to.be.a('string');
		});

		it("Collections should have an class name main-container", function(){
			expect(c.className).to.equal('main-container');
		});		

		it("Collections should have a sellerRegion and traderRegion", function(){
			expect( c.regions.sellerRegion ).to.equal("#swap-SellerRegion");
			expect( c.regions.traderRegion ).to.equal("#swap-TraderRegion");
		});

		it("Seller should have a SellerTemplate", function(){
			expect(s.template).to.be.a('string');
		});

		it("Seller Template should have a className images and a tagName li", function(){
			expect(s.className).to.equal('images');
			expect(s.tagName).to.equal('li');
		});		

		it("Seller should have a modelEvents", function(){
			expect(s.modelEvents).to.be.a('object');
		});

		it("Seller should have an onDomRefresh", function(){
			expect(s.onDomRefresh).to.be.a('function');
		});

		it("Seller should have a Event", function(){
			expect(s.events).to.be.a('object');
			expect(s.select).to.be.a('function');
		});

		it("Collection Seller should have an itemView Swap.Seller", function(){
			expect(cs.itemView).to.equal(SwapView.Seller);
		});						

		it("Collection Seller should have a className seller-main and a tagName ul", function(){
			expect(cs.className).to.equal('seller-main');
			expect(cs.tagName).to.equal('ul');
		});		

		it("Trader should have a TraderTemplate", function(){
			expect(t.template).to.be.a('string');
		});

		it("Trader should have an events, modelEvents and templateHelpers", function(){
			expect(t.events).to.be.a('object');
			expect(t.modelEvents).to.be.a('object');
			expect(t.templateHelpers).to.be.a('object');
		});

		it("Trader should have an onDomRefresh", function(){
			expect(t.onDomRefresh).to.be.a('function');
		});	

		it("CollectionTrader should have an Itemview Swap.trader", function(){
			expect(ct.itemView).to.equal(SwapView.Trader);
		});

		it("CollectionTrader should have a className trader-main and tagName ul", function(){
			expect(ct.className).to.equal('trader-main');
			expect(ct.tagName).to.equal('ul');
		});		
	});
});