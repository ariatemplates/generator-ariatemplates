/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('ariatemplates generator', function () {

  var folderName = 'temp';

  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, folderName), function (err) {
      if (err) {
        return done(err);
      }

      var deps = [
        '../../app',
        '../../bootstrap',
        '../../controller',
        '../../csstemplate',
        '../../interface',
        '../../macro',
        '../../skeleton',
        '../../template',
        '../../templatescript'
      ];

      this.ariatemplates = helpers.createGenerator('ariatemplates:app', deps);
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

    helpers.mockPrompt(this.ariatemplates, {
      'appName': 'myapp'
    });
    this.ariatemplates.options['skip-install'] = true;
    this.ariatemplates.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });

  /*it('creates expected content', function (done) {
    var expectedAppName = 'myapp';
    var expectedTemplateName = 'MyTemplate';
    var expectedTemplateScriptName = 'MyTemplateScript';
    var expectedControllerName = 'MyController';
    var expectedInterfaceName = 'IMyInterface';
    var expectedMacroName = 'MyMacro';
    var expectedCssTemplateName = 'MyTemplateStyle';
  });*/
});
