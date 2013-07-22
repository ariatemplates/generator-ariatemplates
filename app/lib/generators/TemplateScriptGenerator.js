// module to generate a template
var path= require('path');

var generateTemplateScript = function generateTemplateScript (ariaGenerator, cfg) {
    var generated = {};

    var cfgTemplateScript = {
        "$classpath" : '<%= templateScriptClass%>'
    };
    
    var templateScript = ariaGenerator.generateFile("templatescript", cfgTemplateScript);
    generated.templateScript = templateScript;
    return generated;
};

exports.generateTemplateScript = generateTemplateScript;