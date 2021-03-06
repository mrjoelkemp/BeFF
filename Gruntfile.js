/* jshint node: true */
module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        ignores: [
          'Gruntfile.js'
        ]
      },
      test: [
        '*.js',
        'Component/**/*.js',
        'Controller/**/*.js',
        'View/**/*.js',
        'trait/**/*.js',
        'util/**/*.js',
        'ux/**/*.js'
      ]
    },
    karma: {
      options: {
        configFile: 'test/lib/karma.conf.js',
        singleRun: true
      },
      persistent: {
        browsers: ['Firefox'],
        singleRun: false
      },
      single: {
        browsers: ['PhantomJS']
      },
      multi: {
        reporters: ['dots'],
        browsers: ['PhantomJS']
      }
    },

    // Generates HTML JSDoc Documentation
    jsdoc: {
      dist: {
        src: ['**/*.js', '!Gruntfile.js', '!node_modules/**/*.js', '!bower_components/**/*.js', '!test/**/*.js'],
        options: {
          destination: 'docs/html',
          template : 'node_modules/grunt-jsdoc/node_modules/ink-docstrap/template',
          configure : './docs/jsdoc.conf.json'
        }
      }
    },

    'gh-pages': {
      options: {
        base: 'docs/html',
        message: 'Docs'
      },
      src: '**/*'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask('test', ['jshint', 'karma:persistent']);
  grunt.registerTask('docs', ['jsdoc', 'gh-pages']);
  grunt.registerTask('travis', ['jshint', 'karma:multi']);
  grunt.registerTask('default', ['test']);
};
