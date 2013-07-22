// module to generate the aria templates bootstrap file
var path= require('path');

var generateBootstrap = function generateBootstrap (ariaGenerator, ariaVersion, cfg) {
    var generated = {};
    var cfgBootstrap = {};
    
    if (cfg.tpl) {
        if (cfg.ctrl) {
            cfgBootstrap = {
                "$classpath" : '<%= templateClass%>',
                "$fwkpath" : "/aria/ariatemplates-" + ariaVersion + ".js",
                "$fwkskin" : "/aria/css/atskin-" + ariaVersion + ".js",
                "$moduleCtrl" : '<%= controllerClass %>'
            };
        } else {
            cfgBootstrap = {
                "$classpath" : '<%= templateClass%>',
                "$fwkpath" : "/aria/ariatemplates-" + ariaVersion + ".js",
                "$fwkskin" : "/aria/css/atskin-" + ariaVersion + ".js"
            };
        }
    } else {
        if (cfg.ctrl) {
            cfgBootstrap = {
                "$fwkpath" : "/aria/ariatemplates-" + ariaVersion + ".js",
                "$fwkskin" : "/aria/css/atskin-" + ariaVersion + ".js",
                "$moduleCtrl" : '<%= controllerClass %>'
            };
        } else {
            cfgBootstrap = {
                "$fwkpath" : "/aria/ariatemplates-" + ariaVersion + ".js",
                "$fwkskin" : "/aria/css/atskin-" + ariaVersion + ".js"
            };
        }
    }
    
    var bootstrap = ariaGenerator.generateFile("bootstrap", cfgBootstrap);
    generated.bootstrap = bootstrap;
    return generated;
};

exports.generateBootstrap = generateBootstrap;