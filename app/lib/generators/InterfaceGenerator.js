// module to generate controller interface
var path= require('path');

var generateInterface = function generateInterface (ariaGenerator) {
    var generated = {};
    var cfg = {
        "$classpath" : '<%= interfaceClass %>',
		"$extends" : "aria.templates.IModuleCtrl",
		"$description" : "TODO create a description"
    };
    
    var iface = ariaGenerator.generateFile("interface", cfg);
    generated.iface = iface;
    return generated;
};

exports.generateInterface = generateInterface;