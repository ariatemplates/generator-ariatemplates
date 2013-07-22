'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var fs = require('fs');
var path = require('path');

var BootstrapGenerator = module.exports = function BootstrapGenerator(args, options, config) {
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
        this.name = 'index';
        this.isInteractiveMode = true;
    } else if (args.length <= 1) {
        this.name = args[0];
        this.isInteractiveMode = false;
    } else {
        if (args.length > 1) {
           console.log('   [' + 'ERR'.red + '] It seems you are calling the bootstrap generator with too many arguments.');
           process.exit(0); 
        }
    }
};

util.inherits(BootstrapGenerator, yeoman.generators.NamedBase);

BootstrapGenerator.prototype.files = function files() {
    if (this.isInteractiveMode) {
        var p = path.resolve(this.cfg.appName);
        if (fs.existsSync(path.join(p, this.name + '.html'))) {
            console.log('   [' + 'WARN'.yellow + '] The index.html is already there!');
        } else {
            if (this.cfg.tpl) {
                this.templateClass = this.cfg.appName + '.view.' + this.cfg.tplName;
            }
            if (this.cfg.ctrl) {
                this.controllerClass = this.cfg.appName + '.' + this.cfg.ctrlName;
            }

            this.template('bootstrap.js', this.cfg.appName + '/' + this.name + '.html');
        }
    } else {
        if (fs.existsSync('./' + this.name + '.html')) {
            console.log('   [' + 'WARN'.yellow + '] The index.html is already there!');
        } else {
            _loadFramework(this);
            this.templateClass = 'update.with.the.right.classpath.MyTemplate';
            this.controllerClass = 'update.with.the.right.classpath.MyController';
            this.template('bootstrap.js', this.name + '.html');
        }
    }
};

function _loadFramework(scope) {
    var atnode = require("../app/lib/atnode");
    var atContext = atnode.loadAriaTemplates(_onATLoaded, scope);
};

function _onATLoaded (args) {
    this.cfg = {};
    this.cfg.bootstrap = true;
    this.invoke("ariatemplates:skeleton", {
        args: ['skeleton', args.atcontext.aria.ext.filesgenerator.Generator, this.cfg]
    });
};