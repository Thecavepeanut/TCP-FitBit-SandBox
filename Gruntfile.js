module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  var COPY_RIGHT_BANNER =
    '/**************************************************************\n' +
    ' *           Copyright (c) 2015 Symbiotic Applications.       *\n' +
    ' *                     License: MIT                           *\n' +
    ' **************************************************************/\n';
  grunt.initConfig({
    browserify: {
      dev: {
        src: 'fe/index.js',
        dest: 'public/js/index.js',
        options: {
          browserifyOptions: {
            paths: ['node_modules', 'fe/ts'],
            debug: true
          },
          preBundleCB: function (bundle) {
            bundle.plugin('tsify', {});
          }
        }
      }
    },
    copy: {
      dev: {
        expand: true,
        cwd: 'node_modules/materialize-css',
        src: ['font/*.*'],
        dest: 'public/font/'
      }
    },
    less: {
      dev: {
        files: [{
          expand: true,
          cwd: 'fe',
          src: ['main.less'],
          dest: 'public/css/',
          ext: '.css'
        }]
      }
    },
    watch: {
      dev: {
        options: {
          livereload: true
        },
        files: [
          'fe/**/*.less',
          'fe/*.ts',
          'fe/**/*.ts'
        ],
        tasks: ['less:dev', 'ts:dev', 'browserify:dev']
      }
    },
    ts: {
      dev: {
        src: ['fe/index.ts'],
        options: {
          module: 'commonjs'
        }
      }
    },
    execute:{

    }
    });
  grunt.registerTask('default', [
    'less:dev',
    'ts:dev',
    'browserify:dev',
    'copy:dev',
    'watch:dev'
  ]);
};