/*global module:false*/

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bower');
  grunt.loadNpmTasks('grunt-broccoli');
  
  var fs = require('fs');
  var path = require('path');

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    broccoli: {
      dist: {
        dest: 'dist',
        config: './Brocfile.js'
      }
    },
    clean: ['./.tmp/**'],
    copy: {
      dev: {
        files: [{
          expand: true,
          cwd: './dist',
          src: '**',
          dest: './.tmp/src'
        },
        {
          expand: true,
          cwd: 'demo',
          src: '**',
          dest: './.tmp'
        }]
      }
    },
    bower: {
      dev: {
        dest: './.tmp/bower_components',
        options: {
          keepExpandedHierarchy: false,
          expand: true,
          packageSpecific: {
            'bootstrap': {
              keepExpandedHierarchy: true,
              files: [
                'dist/css/**',
                'dist/fonts/**'
              ]
            },
            'font-awesome': {
              keepExpandedHierarchy: true,
              files: [
                'css/**',
                'fonts/**'
              ]
            }
          }
        }
      }
    },
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        // livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp/')
            ];
          }
        }
      }
    },
    watch: {
      src: {
        files: ['src/*'],
        tasks: 'broccoli:dist:build'
      },
      dist: {
        files: ['dist/*'],
        tasks: ['copy:dev'],
        options: {
          livereload: true
        }
      },
      livereload: {
        options: {livereload: true},
        files: ['./tmp/**/*']
      }
    }
  });

  // Default task.
  // grunt.registerTask('default', 'build:debug');



  grunt.registerTask('setup', ['clean', 'copy:dev', 'bower:dev']);
  grunt.registerTask('default', ['setup', 'connect:livereload', 'watch']);

};