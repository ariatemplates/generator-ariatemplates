'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var fs = require('fs');
var path = require('path');

var ControllerGenerator = module.exports = function ControllerGenerator(args, options, config) {
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
        this.name = this.cfg.ctrlName;
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

util.inherits(ControllerGenerator, yeoman.generators.NamedBase);

ControllerGenerator.prototype.files = function files() {

    if (this.isInteractiveMode) {
        var p = path.resolve(this.cfg.appName);
        if (fs.existsSync(path.join(p, this.name + '.tpl'))) {
            console.log('   [' + 'WARN'.yellow + '] The controller ' + this.name + '.js is already there!');
        } else {
            this.controllerClass = this.cfg.appName + '.' + this.name;
        }

        if (this.cfg.iface) {
            this.controllerInterfaceClass = this.cfg.appName + '.' + this.cfg.ifaceName;
        }

        this.template('controller.js', this.cfg.appName + '/' + this.name + '.js');
    } else {
        _generateFiles(this);
    }
};

function _generateFiles(scope) {
    for (var i=0; i<scope.filesToGenerate.length; i++) {
        if (fs.existsSync('./' + scope.filesToGenerate[i] + '.js')) {
            console.log('   [' + 'WARN'.yellow + '] The controller ' + scope.filesToGenerate[i] + '.js is already there!');
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
            this.cfg.ctrl = true;
            this.cfg.ctrlName = this.filesToGenerate[i];
            this.cfg.iface = false;
            this.invoke("ariatemplates:skeleton", {
                args: ['skeleton', args.atcontext.aria.ext.filesgenerator.Generator, this.cfg]
            });
            try {
                this.controllerClass = 'update.with.the.right.classpath.' + this.cfg.ctrlName;
                this.controllerInterfaceClass = 'update.with.the.right.classpath.IMyInterface';
                this.template('controller.js', this.cfg.ctrlName + '.js');
            } catch (ex) {
                console.log('   [' + 'ERR'.red + '] The controller skeleton is not there. Please be sure to run the skeleton subgenerator first');
            }
        }
    }
};