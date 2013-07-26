/*global describe, before, it, beforeEach */
'use strict';
var fs = require('fs');
var assert = require('assert');
var path = require('path');
var helpers = require('yeoman-generator').test;


describe('Ariatemplates generator template mechanism', function () {

    var folderName = 'temp';

    it('should generate the same appName in every file', function (done) {
        var expectedAppName = 'myapp';
        var expectedTemplateName = 'MyTemplate';
        var expectedTemplateScriptName = 'MyTemplateScript';
        var expectedControllerName = 'MyController';
        var expectedInterfaceName = 'IMyInterface';
        var expectedMacroName = 'MyMacro';
        var expectedCssTemplateName = 'MyTemplateStyle';
        
        // read Files
        var index_html = fs.readFileSync('index.html', 'utf8');
        var macro_tml = fs.readFileSync('myapp/lib/MyMacro.tml', 'utf8');
        var csstemplate_tplcss = fs.readFileSync('myapp/style/MyTemplateStyle.tpl.css', 'utf8');
        var template_tpl = fs.readFileSync('myapp/view/MyTemplate.tpl', 'utf8');
        var templatescript_js = fs.readFileSync('myapp/view/MyTemplateScript.js', 'utf8');
        var interface_js = fs.readFileSync('myapp/IMyInterface.js', 'utf8');
        var controller_js = fs.readFileSync('myapp/MyController.js', 'utf8');
        var bower_json = fs.readFileSync('bower.json', 'utf8');
        var package_json = fs.readFileSync('package.json', 'utf8');

        // Test index.html
        var regex = new RegExp('ariatemplates/src/aria/bootstrap.js');
        assert.ok(regex.test(index_html), 'index.html template using a wrong Aria Templates framework path');

        regex = new RegExp('ariatemplates/src/aria/css/atskin.js');
        assert.ok(regex.test(index_html), 'index.html template using a wrong Aria Templates skin path');

        regex = new RegExp('"' + expectedAppName + '": {"*"');
        assert.ok(regex.test(index_html), 'index.html template not updating the Aria Templates root map');
        
        regex = new RegExp('classpath:"' + expectedAppName + '.view.' + expectedTemplateName + '"');
        assert.ok(regex.test(index_html), 'index.html template not loading the Aria Templates template');            


        // Test bower.json
        regex = new RegExp('"name": "' + expectedAppName + '"');
        assert.ok(regex.test(bower_json), 'bower.json template using a wrong appName for name');

        regex = new RegExp('"appPath": "' + expectedAppName + '"');
        assert.ok(regex.test(bower_json), 'bower.json template using a wrong appName for appPath');


        // Test package.json
        regex = new RegExp('"name": "' + expectedAppName + '"');
        assert.ok(regex.test(package_json), 'package.json template using a wrong appName');


        // Test Template
        regex = new RegExp('"' + expectedAppName + '.view.' + expectedTemplateName + '"');
        assert.ok(regex.test(template_tpl), 'MyTemplate.tpl template using a wrong $classpath');

        regex = new RegExp('["' + expectedAppName + '.style.' + expectedCssTemplateName + '"]');
        assert.ok(regex.test(template_tpl), 'MyTemplate.tpl template using a wrong $css');


        // Test TemplateScript
        regex = new RegExp('"' + expectedAppName + '.view.' + expectedTemplateScriptName + '"');
        assert.ok(regex.test(templatescript_js), 'MyTemplateScript.js template using a wrong $classpath');


        // Test TemplateCss
        regex = new RegExp('"' + expectedAppName + '.style.' + expectedCssTemplateName + '"');
        assert.ok(regex.test(csstemplate_tplcss), 'MyTemplateStyle.tpl.css template using a wrong $classpath');


        // Test Controller
        regex = new RegExp('"' + expectedAppName + '.' + expectedControllerName + '"');
        assert.ok(regex.test(controller_js), 'MyController.js template using a wrong $classpath');

        regex = new RegExp('["' + expectedAppName + '.' + expectedInterfaceName + '"]');
        assert.ok(regex.test(controller_js), 'MyController.js template using a wrong $implements');

        regex = new RegExp('"' + expectedAppName + '.' + expectedInterfaceName + '"');
        assert.ok(regex.test(controller_js), 'MyController.js template using a wrong $publicInterfaceName');


        // Test Interface
        regex = new RegExp('"' + expectedAppName + '.' + expectedInterfaceName + '"');
        assert.ok(regex.test(interface_js), 'IMyInterface.js template using a wrong $classpath');


        // Test Macro
        regex = new RegExp('"' + expectedAppName + '.lib.' + expectedMacroName + '"');
        assert.ok(regex.test(macro_tml), 'MyMacro.js template using a wrong $classpath');

        done();
    });
});