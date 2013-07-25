'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var fs = require('fs');
var path = require('path');

var TemplatescriptGenerator = module.exports = function TemplatescriptGenerator(args, options, config) {

    try {
        yeoman.generators.NamedBase.apply(this, arguments);
    } catch (ex) {
        console.log('   [' + 'ERR'.red + '] It seems you forgot to pass the file_name when you called the subgenerator.');
        process.exit(0);
    }
    
    if (args.length > 0) {
        this.filesToGenerate = [];
        for (var i=0; i<args.length; i++) {
            this.filesToGenerate.push(args[i]);
        }
    }
};

util.inherits(TemplatescriptGenerator, yeoman.generators.NamedBase);

TemplatescriptGenerator.prototype.files = function files() {
    _generateFiles(this);
};

function _generateFiles(scope) {
    for (var i=0; i<scope.filesToGenerate.length; i++) {
        if (fs.existsSync('./' + scope.filesToGenerate[i] + '.js')) {
            console.log('   [' + 'WARN'.yellow + '] The template script ' + scope.filesToGenerate[i] + '.js is already there!');
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
            this.cfg.templateScript = true;
            this.cfg.templateScriptName = this.filesToGenerate[i];            
            this.invoke("ariatemplates:skeleton", {
                args: ['skeleton', args.atcontext.aria.ext.filesgenerator.Generator, this.cfg]
            });
            try {
                this.templateScriptClass = 'update.with.the.right.classpath.' + this.cfg.templateScriptName;
                this.template('templateScript.js', this.cfg.templateScriptName + '.js');
            } catch (e) {
                console.log('   [' + 'ERR'.red + '] The template script skeleton is not there. Please be sure to run the skeleton subgenerator first');
            }
        }
    }
};