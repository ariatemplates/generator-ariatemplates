// module to generate controller
var path= require('path');

var generateController = function generateController (ariaGenerator, cfg) {
    var generated = {};

    if (cfg.ctrlName && cfg.iface && cfg.ifaceName) {
        var ctrlCfg = {
            "$classpath" : '<%= controllerClass %>',
            "$publicInterface" : '<%= controllerInterfaceClass %>',
            "$extends" : "aria.templates.ModuleCtrl",
            "$description" : "TODO create a description"
        };
    } else if (!cfg.iface) {
        var ctrlCfg = {
            "$classpath" : '<%= controllerClass %>',
            "$extends" : "aria.templates.ModuleCtrl",
            "$description" : "TODO create a description"
        };
    }

    var controller = ariaGenerator.generateFile("modulecontroller", ctrlCfg);
    generated.controller = controller;
    return generated;
};

exports.generateController = generateController;