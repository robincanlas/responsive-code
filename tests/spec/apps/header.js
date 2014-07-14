define([
	"apps/header/show/show_view"
], function(View){

	describe("Header", function(){

		var view, fixture;

		before(function(){
			fixture = $("#test");
		});

		beforeEach(function(){
			view = new View.Layout({
				el: "#test"
			});
			view.render();
		});

		/**
		 * Checks to see if template used is empty
		 */
		it("should have a template", function(){
			expect(view.template).to.not.be.empty;
		});

		/**
		 * Checks to see if region exists
		 */
		it("should have 1 and only 1 notifications id", function(){
			expect(fixture.find("#notifications").length).to.equal(1);
		});

		/**
		 * Checks to see if region id is correct
		 */
		it("should have notificationsRegion set at #notifications", function(){
			expect(view.regions.notificationsRegion).to.equal("#notifications");
		});

		afterEach(function(){
			fixture.empty();
		})

		after(function(){
		});

	});

});