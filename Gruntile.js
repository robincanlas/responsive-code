module.exports = function(grunt){

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		compass: {
			options: {
				config: "config.rb",
			},
		},
		watch: {
			css: {
				files: ['public/styles/**/*.scss'],
				tasks: ['compass']
			},
			options: {
				livereload: true,
			}
		},
		concurrent: {
			server: [
			],
		},

	});

	grunt.registerTask('server', [
		'watch'
	]);

	grunt.registerTask('test', [
	]);

	grunt.registerTask('build', [
	]);

	grunt.registerTask('default', [
		'build'
	]);

}