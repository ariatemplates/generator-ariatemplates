// module to generate macro
var path= require('path');

var generateMacro = function generateMacro (ariaGenerator) {
    var generated = {};
    
    var cfg = {
        "$classpath" : '<%= macroClass %>'
    };
    
    var macro = ariaGenerator.generateFile("macrolibrary", cfg);
    generated.macro = macro;
    return generated;
};

exports.generateMacro = generateMacro;