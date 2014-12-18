'use strict';

module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    yeoman: {
      app: 'app',
      dist: 'dist'
    },

    watch: {
      sass: {
        files: ['<%%= yeoman.app %>/<%= cssPreDir %>/**/*.{sass,scss}'],
        tasks: ['sass:server', 'autoprefixer:dist']
      },
      autoprefixer: {
        files: ['<%%= yeoman.app %>/<%= cssDir %>/**/*.css'],
        tasks: ['copy:stageCss', 'autoprefixer:dist']
      },
      jekyll: {
        files: [
          '<%%= yeoman.app %>/**/*.{html,yml,md.mkd,markdown}',
          '!<%%= yeoman.app %>/_bower_components/**/*'
        ],
        tasks: ['jekyll:server']
      }
    },

    browserSync: {
      server: {
        bsFiles: {
          src: [
            '.jekyll/**/*.html',
            '.tmp/<%= cssDir %>/**/*.css',
            '{.tmp,<%%= yeoman.app %>}/<%= jsDir %>/**/*.js',
            '{<%%= yeoman.app %>}/_bower_components/**/*.js',
            '<%%= yeoman.app %>/<%= imgDir %>/**/*.{gif,jpg,jpeg,png,svg,webp}'
          ]
        },
        options: {
          server: {
            baseDir: [
              '.jekyll',
              '.tmp',
              '<%%= yeoman.app %>'
            ]
          },
          watchTask: true
        }
      },
      dist: {
        options: {
          server: {
            baseDir: '<%%= yeoman.dist %>'
          }
        }
      },
      test: {
        bsFiles: {
          src: [
            '.jekyll/**/*.html',
            '.tmp/<%= cssDir %>/**/*.css',
            '{.tmp,<%%= yeoman.app %>}/<%= jsDir %>/**/*.js',
            '{<%%= yeoman.app %>}/_bower_components/**/*.js',
            '<%%= yeoman.app %>/<%= imgDir %>/**/*.{gif,jpg,jpeg,png,svg,webp}'
          ]
        },
        options: {
          server: {
            baseDir: [
              '.jekyll',
              '.tmp',
              '<%%= yeoman.app %>'
            ]
          },
          watchTask: true
        }
      }
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%%= yeoman.dist %>'
            //'!<%%= yeoman.dist %>/some/path/to/exclude.txt'
          ]
        }]
      },
      server: [
        '.tmp',
        '.jekyll'
      ]
    },

    concurrent: {
      server: [
        'sass:server',
        'copy:stageCss',
        'jekyll:server'
      ],
      dist: [
        'sass:dist',
        'copy:dist'
      ]
    },

    jekyll: {
      options: {
        bundleExec: true,
        config: '_config.yml',
        src: '<%%= yeoman.app %>'
      },
      dist: {
        options: {
          dest: '<%%= yeoman.dist %>'
        }
      },
      server: {
        options: {
          config: '_config.yml',
          dest: '.jekyll'
        }
      },
      check: {
        options: {
          doctor: true
        }
      }
    },

    sass: {
      options: {
        bundleExec: true,
        debugInfo: false,
        lineNumbers: false,
        loadPath: '<%%= yeoman.app %>/_bower_components'
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/<%= cssPreDir %>',
          src: '**/*.{sass,scss}',
          dest: '.tmp/<%= cssDir %>',
          ext: '.css'
        }]
      },
      server: {
        options: {
          debugInfo: true,
          lineNumbers: true
        },
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/<%= cssPreDir %>',
          src: '**/*.{sass,scss}',
          dest: '.tmp/<%= cssDir %>',
          ext: '.css'
        }]
      }
    },

    useminPrepare: {
      options: {
        dest: '<%%= yeoman.dist %>'
      },
      html: '<%%= yeoman.dist %>/index.html'
    },

    usemin: {
      options: {
        assetsDirs: '<%%= yeoman.dist %>',
      },
      html: ['<%%= yeoman.dist %>/**/*.html'],
      css: ['<%%= yeoman.dist %>/<%= cssDir %>/**/*.css']
    },

    concat: {},

    uglify: {},

    cssmin: {
      dist: {
        options: {
          check: 'gzip'
        }
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true
        },
        files: [{
          expand: true,
          cwd: '<%%= yeoman.dist %>',
          src: '**/*.html',
          dest: '<%%= yeoman.dist %>'
        }]
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.app %>',
          src: [
            '<%= imgDir %>/**/*',
            '<%= fontDir %>/**/*'
          ],
          dest: '<%%= yeoman.dist %>'
        }]
      },
      stageCss: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.app %>/<%= cssDir %>',
          src: '**/*.css',
          dest: '.tmp/<%= cssDir %>'
        }]
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 versions']
      },
      dist: {
        expand: true,
        cwd: '.tmp',
        src: '**/{<%= cssDir %>,concat}/*.css',
        dest: '.tmp'
      }
    },

    filerev: {
      options: {
        length: 4
      },
      dist: {
        files: [{
          src: [
            '<%%= yeoman.dist %>/<%= jsDir %>/**/*.js',
            '<%%= yeoman.dist %>/<%= cssDir %>/**/*.css',
            '<%%= yeoman.dist %>/<%= imgDir %>/**/*.{gif,jpg,jpeg,png,svg,webp}',
            '<%%= yeoman.dist %>/<%= fontDir %>/**/*.{eot*,otf,svg,ttf,woff}'
          ]
        }]
      }
    },

    imagemin: {
      dist: {
        options: {
          progressive: true
        },
        files: [{
          expand: true,
          cwd: '<%%= yeoman.dist %>',
          src: '**/*.{jpg,jpeg,png}',
          dest: '<%%= yeoman.dist %>'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.dist %>',
          src: '**/*.svg',
          dest: '<%%= yeoman.dist %>'
        }]
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%%= yeoman.app %>/<%= jsDir %>/**/*.js'
      ]
    },

    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      check: {
        src: [
          '<%%= yeoman.app %>/<%= cssDir %>/**/*.css'
        ]
      }
    }

  });


  grunt.registerTask('default', [
    'clean:server',
    'concurrent:server',
    'autoprefixer:dist',
    'browserSync:server',
    'watch'
  ]);

  grunt.registerTask('check', [
    'clean:server',
    'jekyll:check',
    'sass:server',
    'jshint:all',
    'csslint:check'
  ]);

  grunt.registerTask('build', [
    'clean',
    'jekyll:dist',
    'concurrent:dist',
    'useminPrepare',
    'concat',
    'autoprefixer:dist',
    'cssmin',
    'uglify',
    'imagemin',
    'svgmin',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

};
