const sass = require('node-sass');

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    sass: {
      options: {
        implementation: sass,
        sourceMap: true,
      },
      dist: {
        files: {
          'src/css/assetmanager.dark.css': 'src/sass/assetmanager.dark.scss',
          'src/css/assetmanager.light.css': 'src/sass/assetmanager.light.scss',
        },
      },
    },
  });

  grunt.registerTask('default', ['sass']);
};
