module.exports = function(grunt){

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		compass: {
			compile: {
				options: {
					config: "public/config.rb",
					force: true,
				}
			}
		},
		watch: {
			css: {
				files: ['public/styles/**/*.scss'],
				tasks: ['compass']
			},
			options: {
				livereload: true,
			}
		}

	});

	grunt.registerTask('build', [
		'watch'
	]);

	grunt.registerTask('default', [
		'build'
	]);

}