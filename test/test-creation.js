/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var fs      = require('fs');
var helpers = require('yeoman-generator').test;


describe('ariatemplates generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('ariatemplates:app', [
        '../../app',
        '../../bootstrap',
        '../../controller',
        '../../csstemplate',
        '../../interface',
        '../../macro',
        '../../skeleton',
        '../../template',
        '../../templatescript'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      'myapp/lib/MyMacro.tml',
      'myapp/style/MyTemplateStyle.tpl.css',
      'myapp/view/MyTemplate.tpl',
      'myapp/view/MyTemplateScript.js',
      'myapp/IMyInterface.js',
      'myapp/MyController.js',
      '.bowerrc',
      '.editorconfig',
      '.gitignore',
      '.jshintrc',
      'bower.json',
      'Gruntfile.js',
      'index.html',
      'package.json'
    ];

    helpers.mockPrompt(this.app, {
      'appName': 'myapp'
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});
