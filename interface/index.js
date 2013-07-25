'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var fs = require('fs');

var InterfaceGenerator = module.exports = function InterfaceGenerator(args, options, config) {

    try {
        yeoman.generators.NamedBase.apply(this, arguments);
    } catch (ex) {
        console.log('   [' + 'ERR'.red + '] It seems you forgot to pass the file_name when you called the subgenerator.');
        process.exit(0);
    }

    if (args[0] === 'interactiveMode') {
        this.cfg = args[1];
        this.name = this.cfg.ifaceName;
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

util.inherits(InterfaceGenerator, yeoman.generators.NamedBase);

InterfaceGenerator.prototype.files = function files() {
    if (this.isInteractiveMode) {
        var p = path.resolve(this.cfg.appName);
        if (fs.existsSync(path.join(p, this.name + '.js'))) {
            console.log('   [' + 'WARN'.yellow + '] The interface ' + this.name + '.js is already there!');
        } else {
            this.interfaceClass = this.cfg.appName + '.' + this.name;
            this.template('interface.js', this.cfg.appName + '/' + this.name + '.js');
        }
    } else {
        _generateFiles(this);
    }
};

function _generateFiles(scope) {
    for (var i=0; i<scope.filesToGenerate.length; i++) {
        if (fs.existsSync('./' + scope.filesToGenerate[i] + '.js')) {
            console.log('   [' + 'WARN'.yellow + '] The interface ' + scope.filesToGenerate[i] + '.js is already there!');
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
            this.cfg.iface = true;
            this.cfg.ifaceName = this.filesToGenerate[i];
            this.invoke("ariatemplates:skeleton", {
                args: ['skeleton', args.atcontext.aria.ext.filesgenerator.Generator, this.cfg]
            });
            try {
                this.interfaceClass = 'update.with.the.right.classpath.' + this.cfg.ifaceName;
                this.template('interface.js', this.cfg.ifaceName + '.js');
            } catch (ex) {
                console.log('   [' + 'ERR'.red + '] The controller skeleton is not there. Please be sure to run the skeleton subgenerator first');
            }
        }
    }
};