'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var fs = require('fs');
var templateGenerator = require('../app/lib/generators/TemplateGenerator');
var templateScriptGenerator = require('../app/lib/generators/TemplateScriptGenerator');
var bootstrapGenerator = require('../app/lib/generators/BootstrapGenerator');
var controllerGenerator = require('../app/lib/generators/ControllerGenerator');
var interfaceGenerator = require('../app/lib/generators/InterfaceGenerator');
var cssGenerator = require('../app/lib/generators/CSSTemplateGenerator');
var macroGenerator = require('../app/lib/generators/MacroGenerator');

var SkeletonGenerator = module.exports = function SkeletonGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);
  this.ariaGenerator = args[1];
  this.cfg = args[2];
  this.ariaVersion = require('ariatemplates/package.json').version;
};

util.inherits(SkeletonGenerator, yeoman.generators.NamedBase);

SkeletonGenerator.prototype.files = function files() {
    
    if (this.cfg.tpl) {
        var generated = templateGenerator.generateTemplate(this.ariaGenerator, this.cfg);
        if (generated.template) {
            var tplPath = path.join(__dirname, '../template/templates/template.tpl');
            if (fs.existsSync(tplPath)) {
                fs.unlinkSync(tplPath);
            }
            
            this.write(tplPath, generated.template.content);
            
            if (generated.templateScript) {
                var tplScriptPath = path.join(__dirname, '../template/templates/templateScript.js');
                if (fs.existsSync(tplScriptPath)) {
                    fs.unlinkSync(tplScriptPath);
                }
                this.write(tplScriptPath, generated.templateScript.content);
            }

            if (generated.templateCss) {
                var tplCssPath = path.join(__dirname, '../template/templates/templateCss.tpl.css')
                if (fs.existsSync(tplCssPath)) {
                    fs.unlinkSync(tplCssPath);
                }
                this.write(tplCssPath, generated.templateCss.content);   
            }
        } else {
            console.log('   [' + 'ERR'.red + '] Something bad happened during creation of your template. I\'m sorry');
        }
    }

    if (this.cfg.templateScript) {
        var generated = templateScriptGenerator.generateTemplateScript(this.ariaGenerator, this.cfg);
        if (generated.templateScript) {
            var tplScriptPath = path.join(__dirname, '../templatescript/templates/templateScript.js');
            if (fs.existsSync(tplScriptPath)) {
                fs.unlinkSync(tplScriptPath);
            }
            
            this.write(tplScriptPath, generated.templateScript.content);
        } else {
            console.log('   [' + 'ERR'.red + '] Something bad happened during creation of your template. I\'m sorry');
        }
    }

    if (this.cfg.ctrl) {
        var controllerContent = controllerGenerator.generateController(this.ariaGenerator, this.cfg);
        if (controllerContent) {
            var ctrlPath = path.join(__dirname, '../controller/templates/controller.js');
            if (fs.existsSync(ctrlPath)) {
                fs.unlinkSync(ctrlPath);
            }
            this.write(ctrlPath, controllerContent.controller.content);
        } else {
            console.log('   [' + 'ERR'.red + '] Something bad happened during creation of your controller. I\'m sorry');
        }
    }

    if (this.cfg.iface) {
        var interfaceContent = interfaceGenerator.generateInterface(this.ariaGenerator);
        if (interfaceContent) {
            var ifacePath = path.join(__dirname, '../interface/templates/interface.js');
            if (fs.existsSync(ifacePath)) {
                fs.unlinkSync(ifacePath);
            }
            this.write(ifacePath, interfaceContent.iface.content);
        } else {
            console.log('   [' + 'ERR'.red + '] Something bad happened during creation of your interface. I\'m sorry');
        }
    }

    if (this.cfg.csstemplate) {
        var cssContent = cssGenerator.generateCSSTemplate(this.ariaGenerator);
        if (cssContent) {
            var cssPath = path.join(__dirname, '../csstemplate/templates/csstemplate.tpl.css');
            if (fs.existsSync(cssPath)) {
                fs.unlinkSync(cssPath);
            }
            this.write(cssPath, cssContent.csstemplate.content);
        } else {
            console.log('   [' + 'ERR'.red + '] Something bad happened during creation of your css template. I\'m sorry');
        }
    }

    if (this.cfg.macro) {
        var macroContent = macroGenerator.generateMacro(this.ariaGenerator);
        if (macroContent) {
            var macroPath = path.join(__dirname, '../macro/templates/macro.tml');
            if (fs.existsSync(macroPath)) {
                fs.unlinkSync(macroPath);
            }
            this.write(macroPath, macroContent.macro.content);
        } else {
            console.log('   [' + 'ERR'.red + '] Something bad happened during creation of your macro. I\'m sorry');
        }
    }

    if (this.cfg.bootstrap) {
        var bootstrapContent = bootstrapGenerator.generateBootstrap(this.ariaGenerator, this.ariaVersion, this.cfg);
        if (bootstrapContent) {
            var bootstrapPath = path.join(__dirname, '../bootstrap/templates/bootstrap.js');
            if (fs.existsSync(bootstrapPath)) {
                fs.unlinkSync(bootstrapPath);
            }
            bootstrapContent.bootstrap.content = bootstrapContent.bootstrap.content.replace('<script type="text/javascript">', '<script type="text/javascript">\r\n                aria.core.DownloadMgr.updateRootMap({\r\n                    "<%= appClass%>": {"*" : Aria.rootFolderPath + "../../"}\r\n                });\r\n');
            this.write(bootstrapPath, bootstrapContent.bootstrap.content);
        } else {
            console.log('   [' + 'ERR'.red + '] Something bad happened during creation of your bootstrap file. I\'m sorry.');
        }
    }
};