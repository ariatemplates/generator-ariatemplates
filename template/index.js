'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var fs = require('fs');
var path = require('path');

var TemplateGenerator = module.exports = function TemplateGenerator(args, options, config) {

    try {
        yeoman.generators.NamedBase.apply(this, arguments);
    } catch (ex) {
        console.log('   [' + 'ERR'.red + '] It seems you forgot to pass the file_name when you called the subgenerator.');
        process.exit(0);
    }
    
    if (args[0] === 'interactiveMode') {
        this.cfg = args[1];
        this.name = this.cfg.tplName;
        this.isInteractiveMode = true;
    } else {
        if (args.length > 0) {
            this.filesToGenerate = [];
            for (var i=0; i<args.length; i++) {
                this.filesToGenerate.push(args[i]);
            }
        }
    }
};

util.inherits(TemplateGenerator, yeoman.generators.NamedBase);

TemplateGenerator.prototype.files = function files() {
    
    if (this.isInteractiveMode) {
        var p = path.resolve(this.cfg.appName);
        if (fs.existsSync(path.join(p, '/view/' + this.name + '.tpl'))) {
            console.log('   [' + 'WARN'.yellow + '] The template ' + this.name + '.tpl is already there!');
        } else {
            this.templateClass = this.cfg.appName + '.view.' + this.name;
            if (this.cfg.tplCss) {
                this.cssTemplateClass = this.cfg.appName + '.style.' + this.name;
            }
            this.template('template.tpl', this.cfg.appName + '/view/' + this.name + '.tpl');
        }

        if (this.cfg.tplScript) {
            if (fs.existsSync(path.join(p, '/view/' + this.name + 'Script.js'))) {
                console.log('   [' + 'WARN'.yellow + '] The template script ' + this.name + 'Script.js is already there!');
            } else {
                this.templateScriptClass = this.cfg.appName + '.view.' + this.name + 'Script';
                this.template('templateScript.js', this.cfg.appName + '/view/' + this.name + 'Script.js');
            }
        }

        if (this.cfg.tplCss) {
            if (fs.existsSync(path.join(p, '/style/' + this.name + 'Style.tpl.css'))) {
                console.log('   [' + 'WARN'.yellow + '] The css template ' + this.name + 'Style.tpl.css is already there!');
            } else {
                this.template('templateCss.tpl.css', this.cfg.appName + '/style/' + this.name + 'Style.tpl.css');
            }
        }
    } else {
        _generateFiles(this);
    }
};

function _generateFiles(scope) {
    for (var i=0; i<scope.filesToGenerate.length; i++) {
        if (fs.existsSync('./' + scope.filesToGenerate[i] + '.tpl')) {
            console.log('   [' + 'WARN'.yellow + '] The template ' + scope.filesToGenerate[i] + '.tpl is already there!');
            delete scope.filesToGenerate[i];
        }
    }
    // load Aria Templates
    var atnode = require("../app/lib/atnode");
    var atContext = atnode.loadAriaTemplates(_onATLoaded, scope);
};

function _onATLoaded (args) {
    for (var i=0; i<this.filesToGenerate.length; i++) {
        if (this.filesToGenerate[i] !== undefined) {
            this.cfg = {};
            this.cfg.tpl = true;
            this.cfg.tplName = this.filesToGenerate[i];
            this.cfg.tplScript = false;
            this.cfg.tplCss = false;
            this.invoke("ariatemplates:skeleton", {
                args: ['skeleton', args.atcontext.aria.ext.filesgenerator.Generator, this.cfg]
            });
            try {
                this.templateClass = 'update.with.the.right.classpath.' + this.cfg.tplName;
                this.template('template.tpl', this.cfg.tplName + '.tpl');
            } catch (e) {
                console.log('   [' + 'ERR'.red + '] The template skeleton is not there. Please be sure to run the skeleton subgenerator first');
            }
        }
    }
};