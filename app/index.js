'use strict';

var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var path = require('path');
var shelljs = require('shelljs');

var Generator = yeoman.generators.Base.extend({

  initializing: function() {
    this.pkg = require('../package.json');

    this.cssPre = 'sass';
    this.autoPre = true;
    this.markdown = 'redcarpet';

    this.log(yosay('Welcome to The SimpleStatic-Generator'));
  },

  prompting: {
    directories: function() {
      var done = this.async();

      var slashFilter = function (input) {
        return input.replace(/^\/*|\/*$/g, '');
      };

      var prompts = [{
        name: 'cssDir',
        message: 'CSS directory',
        default: 'css',
        filter: slashFilter
      }, {
        name: 'jsDir',
        message: 'JavaScript directory',
        default: 'js',
        filter: slashFilter
      }, {
        name: 'imgDir',
        message: 'Image directory',
        default: 'img',
        filter: slashFilter
      }, {
        name: 'fontDir',
        message: 'Font directory',
        default: 'fonts',
        filter: slashFilter
      }, {
        name: 'cssPreDir',
        message: 'CSS preprocessor directory',
        default: '_scss',
        filter: slashFilter
      }];

      this.prompt(prompts, function(props) {
        this.cssDir = props.cssDir;
        this.jsDir = props.jsDir;
        this.imgDir = props.imgDir;
        this.fontDir = props.fontDir;
        this.cssPreDir = props.cssPreDir;

        done();
      }.bind(this));
    },

    features: function() {
      var done = this.async();

      var prompts = [{
        name: 'includeReset',
        type: 'confirm',
        message: 'Include reset.css?',
        default: true
      }, {
        name: 'includeFontAwesome',
        type: 'confirm',
        message: 'Include FontAwesome?',
        default: true
      }, {
        name: 'includeNeat',
        type: 'confirm',
        message: 'Include Bourbon-Neat?',
        default: true
      }];

      this.prompt(prompts, function(props) {
        this.includeReset = props.includeReset;
        this.includeFontAwesome = props.includeFontAwesome;
        this.includeNeat = props.includeNeat;

        done();
      }.bind(this));
    }
  },

  configuring: function() {
  },

  writing: {
    createDirectories: function() {
      this.dest.mkdir('app/_layouts');
      this.dest.mkdir('app/_posts');
      this.dest.mkdir('app/_includes');
      this.dest.mkdir('app/_plugins');
      this.dest.mkdir(path.join('app', this.cssDir));
      this.dest.mkdir(path.join('app', this.jsDir));
      this.dest.mkdir(path.join('app', this.imgDir));
      this.dest.mkdir(path.join('app', this.fontDir));
      this.dest.mkdir(path.join('app', this.cssPreDir, '_general'));
      this.dest.mkdir(path.join('app', this.cssPreDir, '_utils'));
      this.dest.mkdir(path.join('app', this.cssPreDir, '_sections'));
    },

    projectFiles: function() {
      this.src.copy('.bowerrc', '.bowerrc');
      this.src.copy('.csslintrc', '.csslintrc');
      this.src.copy('.editorconfig', '.editorconfig');
      this.src.copy('.gitattributes', '.gitattributes');
      this.src.copy('.gitignore', '.gitignore');
      this.src.copy('.jshintrc', '.jshintrc');
      this.src.copy('Gemfile', 'Gemfile');

      this.template('_config.yml', '_config.yml');
      this.template('package.json', 'package.json');
      this.template('bower.json', 'bower.json');
      this.template('Gruntfile.js', 'Gruntfile.js');
    },

    pageFiles: function() {
      this.dest.write(path.join('app', this.jsDir, 'main.js'), '');
      this.dest.write(path.join('app', this.cssPreDir, '_general/_general.scss'), '');
      this.dest.write(path.join('app', this.cssPreDir, '_utils/_utils.scss'), '');
      this.dest.write(path.join('app', this.cssPreDir, '_sections/_sections.scss'), '');

      this.template('app/index.html', 'app/index.html');
      this.template('app/_layouts/default.html', 'app/_layouts/default.html');

      this.template('app/_scss/_variables.scss', 'app/_scss/_variables.scss');
      this.template('app/_scss/_fonts.scss', 'app/_scss/_fonts.scss');
      this.template('app/_scss/main.scss', 'app/_scss/main.scss');
    }
  },

  install: function() {
    this.installDependencies();
  },

  end: function() {
  }

});

module.exports = Generator;
