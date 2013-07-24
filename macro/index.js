'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var fs = require('fs');

var MacroGenerator = module.exports = function MacroGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
    try {
        yeoman.generators.NamedBase.apply(this, arguments);
    } catch (ex) {
        console.log('   [' + 'ERR'.red + '] It seems you forgot to pass the file_name when you called the subgenerator.');
        process.exit(0);
    }

    if (args[0] === 'interactiveMode') {
        this.cfg = args[1];
        this.name = this.cfg.macroName;
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

util.inherits(MacroGenerator, yeoman.generators.NamedBase);

MacroGenerator.prototype.files = function files() {
    if (this.isInteractiveMode) {
        var p = path.resolve(this.cfg.appName);
        if (fs.existsSync(path.join(p, this.name + '.tml'))) {
            console.log('   [' + 'WARN'.yellow + '] The macro ' + this.name + '.tml is already there!');
        } else {
            this.macroClass = this.cfg.appName + '.lib.' + this.name;
            this.template('macro.js', this.cfg.appName + '/lib/' + this.name + '.tml');
        }
    } else {
        _generateFiles(this);
    }
};

function _generateFiles(scope) {
    for (var i=0; i<scope.filesToGenerate.length; i++) {
        if (fs.existsSync('./' + scope.filesToGenerate[i] + '.tml')) {
            console.log('   [' + 'WARN'.yellow + '] The macro ' + scope.filesToGenerate[i] + '.tml is already there!');
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
            this.cfg.macro = true;
            this.cfg.macroName = this.filesToGenerate[i];
            this.invoke("ariatemplates:skeleton", {
                args: ['skeleton', args.atcontext.aria.ext.filesgenerator.Generator, this.cfg]
            });
            try {
                this.macroClass = 'update.with.the.right.classpath.' + this.cfg.macroName;
                this.template('macro.js', this.cfg.macroName + '.tml');
            } catch (ex) {
                console.log('   [' + 'ERR'.red + '] The macro skeleton is not there. Please be sure to run the skeleton subgenerator first');
            }
        }
    }
};