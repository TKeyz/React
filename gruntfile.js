'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        files: {
          'theme/js/script.min.js': ['theme/js/jquery/*.js', '!theme/js/jquery/*.min.js']
        }
      }
    },

    //jshint: {
    //  all: ['theme/js/jquery/jquery-functions.js', '!theme/js/min.js']
    //},

    uglify: {
      options: {
        mangle: false
      },
      dist: {
        files: {
          'theme/js/script.min.js': ['theme/js/script.min.js']
        }
      }
    },

    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'theme/styles/style.css': ['src/css/global.css', 'src/css/site.css'],
          'theme/styles/print.css': ['src/css/print.css']
        }
      }
    },

    watch: {
      js: {
        files: ['theme/js/*.js', '!theme/js/*.min.js'],
        tasks: ['jshint', 'uglify'],
        options: {
          spawn: false,
        }
      },
      css: {
        files: ['theme/styles/*.css', '!theme/styles/*.min.css'],
        tasks: ['cssmin'],
        options: {
          spawn: false,
        }
      }
    },

  });


  //  grunt.loadNpmTasks('grunt-contrib-concat');
  //  grunt.loadNpmTasks("grunt-contrib-uglify");
  //  grunt.loadNpmTasks('grunt-contrib-jshint');
  //  grunt.loadNpmTasks('grunt-contrib-watch');
  //  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);//watch', 
};