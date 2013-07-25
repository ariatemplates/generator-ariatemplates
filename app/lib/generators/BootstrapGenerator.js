// module to generate the aria templates bootstrap file
var path= require('path');

var generateBootstrap = function generateBootstrap (ariaGenerator, ariaVersion, cfg) {
    var generated = {};
    var cfgBootstrap = {};

    if (cfg.tpl) {
        if (cfg.ctrl) {
            cfgBootstrap = {
                "$classpath" : '<%= templateClass%>',
                "$fwkpath" : "/ariatemplates/src/aria/bootstrap.js",
                "$fwkskin" : "/ariatemplates/src/aria/css/atskin.js",
                "$moduleCtrl" : '<%= controllerClass %>'
            };
        } else {
            cfgBootstrap = {
                "$classpath" : '<%= templateClass%>',
                "$fwkpath" : "/ariatemplates/src/aria/bootstrap.js",
                "$fwkskin" : "/ariatemplates/src/aria/css/atskin.js"
            };
        }
    } else {
        if (cfg.ctrl) {
            cfgBootstrap = {
                "$fwkpath" : "/ariatemplates/src/aria/bootstrap.js",
                "$fwkskin" : "/ariatemplates/src/aria/css/atskin.js",
                "$moduleCtrl" : '<%= controllerClass %>'
            };
        } else {
            cfgBootstrap = {
                "$fwkpath" : "/ariatemplates/src/aria/bootstrap.js",
                "$fwkskin" : "/ariatemplates/src/aria/css/atskin.js"
            };
        }
    }
    
    var bootstrap = ariaGenerator.generateFile("bootstrap", cfgBootstrap);
    generated.bootstrap = bootstrap;
    return generated;
};

exports.generateBootstrap = generateBootstrap;