'use strict';
var util = require('util');
var path = require('path');
var fs = require('fs');
var _ = require('underscore.string');
var yeoman = require('yeoman-generator');
var ariaGeneratorLoaded = false;
var ariaGenerator = {};
var wizard = false;

var AriatemplateGenerator = module.exports = function AriatemplateGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    // to show the help
    if (options.help) {
        console.log('Usage:\n');
        console.log('yo ariatemplates [options]\n');
        console.log('Options:\n');
        console.log('-h,   --help  # Print generator\'s options and usage\n');
        console.log('-v,   --version  # Print generator\'s version\n');
        console.log('-w,   --wizard  # Run the tool in interactive mode to let you choose the files to generate\n');
        process.exit(0);
    }

    if (options.w || options.wizard) {
        wizard = true;
    }
    
    this.on('end', function() {
        this.installDependencies({
            skipInstall: options['skip-install']
        });
    });

    this.answers = {};

    try {
        this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
    } catch (e) {
        console.log('   [' + 'ERR'.red + '] package.json is not a valid json'.bold);
    }
};

util.inherits(AriatemplateGenerator, yeoman.generators.Base);

AriatemplateGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);

    if (wizard) {
        var prompts = [{
            name: 'appName',
            message: 'What do you want to call your application?',
            'default': 'myapp'
        },
        {
            type: 'confirm',
            name: 'tpl',
            message: 'Do you want to create a template?',
            'default' : true
        },
        {
            name: 'tplName',
            message: 'What do you want to call your template?',
            'default': 'MyTemplate',
            when: function (props) {
                return props.tpl;
            }
        },
        {
            type: 'confirm',
            name: 'tplScript',
            message: 'Do you want to associate a template script?',
            'default': true,
            when: function (props) {
                return props.tpl;
            }
        },
        {
            type: 'confirm',
            name: 'tplCss',
            message: 'Do you want to associate a css template?',
            'default': true,
            when: function (props) {
                return props.tpl;
            }
        },        
        {
            type: 'confirm',
            name: 'ctrl',
            message: "Do you want to create a module controller?",
            'default': true
        },
        {
            name: 'ctrlName',
            message: 'What do you want to call your controller?',
            'default': 'MyController',
            when: function (props) {
                return props.ctrl;
            }
        },
        {
            type: 'confirm',
            name: 'iface',
            message: 'Do you want to create an interface for your controller?',
            'default': true,
            when: function (props) {
                return props.ctrl;
            }
        },
        {
            name: 'ifaceName',
            message: 'What do you want to call your interface?',
            'default': 'IMyInterface',
            when: function (props) {
                return props.iface;
            }
        },
        {
            type: 'confirm',
            name: 'macro',
            message: 'Do you want to create a macro library?',
            'default': true
        },
        {
            name: 'macroName',
            message: 'What do you want to call your macro?',
            'default': 'MyMacro',
            when: function (props) {
                return props.macro;
            }
        },
        {
            type: 'confirm',
            name: 'csstemplate',
            message: 'Do you want to create a css template?',
            'default': true
        },
        {
            name: 'cssName',
            message: 'What do you want to call your css template?',
            'default': 'MyOtherTemplateStyle',
            when: function (props) {
                return props.csstemplate;
            }
        },
        {
            type: 'confirm',
            name: 'bootstrap',
            message: 'Do you want to create the bootstrap file?',
            'default': true
        }]; 
    } else {
        var prompts = [{
            name: 'appName',
            message: 'What do you want to call your application?',
            'default': 'myapp'
        }];
    }
    

    this.prompt(prompts, function afterPrompt(props) {
        this.answers.appName = props.appName;
        this.answers.tpl = wizard ? props.tpl : true;
        this.answers.tplName = wizard ? props.tplName : 'MyTemplate';
        this.answers.tplScript = wizard ? props.tplScript : true;
        this.answers.tplCss = wizard ? props.tplCss : true;
        this.answers.ctrl = wizard ? props.ctrl : true;
        this.answers.ctrlName = wizard ? props.ctrlName : 'MyController';
        this.answers.iface = wizard ? props.iface : true;
        this.answers.ifaceName = wizard ? props.ifaceName : 'IMyInterface';
        this.answers.macro = wizard ? props.macro : true;
        this.answers.macroName = wizard ? props.macroName : 'MyMacro';
        this.answers.csstemplate = wizard ? props.csstemplate : false;
        this.answers.cssName = wizard ? props.cssName : 'MyOtherTemplateStyle';
        this.answers.bootstrap = wizard ? props.bootstrap : true;
        cb();
    }.bind(this));
};

AriatemplateGenerator.prototype.app = function app() {
    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.template('Gruntfile.js', 'Gruntfile.js');
};

AriatemplateGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
};

AriatemplateGenerator.prototype.runtime = function runtime() {
    this.template('_bowerrc', '.bowerrc');
    this.copy('gitignore', '.gitignore');
};

AriatemplateGenerator.prototype.createFolders = function createFolders() {
    var p = path.resolve(this.answers.appName);

    if (this.answers.tpl && !fs.existsSync(path.join(p, '/view'))) {
        this.mkdir(_.slugify(this.answers.appName) + '/view');
    }

    if ((this.answers.csstemplate || this.answers.tplCss) && !fs.existsSync(path.join(p, '/style'))) {
        this.mkdir(_.slugify(this.answers.appName) + '/style');
    }

    if (this.answers.macro && !fs.existsSync(path.join(p, '/lib'))) {
        this.mkdir(_.slugify(this.answers.appName) + '/lib');
    }
};

AriatemplateGenerator.prototype.loadAria = function () {
    var atnode = require("./lib/atnode");
    var atContext = atnode.loadAriaTemplates(_onATLoaded, this);
};

function _onATLoaded (args) {
    ariaGeneratorLoaded = true;

    this.invoke("ariatemplates:skeleton", {
        args: ['skeleton', args.atcontext.aria.ext.filesgenerator.Generator, this.answers]
    });
};

AriatemplateGenerator.prototype.createTemplate = function createTemplate() {
    if (ariaGeneratorLoaded && this.answers.tpl) {
        this.invoke('ariatemplates:template', {
            args: ['interactiveMode', this.answers]
        });
    }
};

AriatemplateGenerator.prototype.createController = function createController() {
    if (ariaGeneratorLoaded & this.answers.ctrl) {
        this.invoke('ariatemplates:controller', {
            args: ['interactiveMode', this.answers]
        });
    }
};

AriatemplateGenerator.prototype.createInterface = function createInterface() {
    if (ariaGeneratorLoaded && this.answers.iface) {
        this.invoke('ariatemplates:interface', {
            args: ['interactiveMode', this.answers]
        });
    }
};

AriatemplateGenerator.prototype.createCSSTemplate = function createCSSTemplate() {
    if (ariaGeneratorLoaded && this.answers.csstemplate) {
        this.invoke('ariatemplates:csstemplate', {
            args: ['interactiveMode', this.answers]
        });
    }
};

AriatemplateGenerator.prototype.createMacro = function createMacro() {
    if (ariaGeneratorLoaded && this.answers.macro) {
        this.invoke('ariatemplates:macro', {
            args: ['interactiveMode', this.answers]
        });
    }
};

AriatemplateGenerator.prototype.createBootstrap = function createBootstrap() {
    if (ariaGeneratorLoaded && this.answers.bootstrap) {
        this.invoke('ariatemplates:bootstrap', {
            args: ['interactiveMode', this.answers]
        });
    }
};