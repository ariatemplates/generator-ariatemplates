// module to generate csstemplate
var path= require('path');

var generateCSSTemplate = function generateCSSTemplate (ariaGenerator) {
    var generated = {};
    var cfg = {
		"$classpath" : '<%= csstemplateClass %>'
    };
       
    var csstemplate = ariaGenerator.generateFile("csstemplate", cfg);
    generated.csstemplate = csstemplate;
    return generated;
};

exports.generateCSSTemplate = generateCSSTemplate;