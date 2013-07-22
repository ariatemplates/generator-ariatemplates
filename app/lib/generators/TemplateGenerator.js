// module to generate a template
var path= require('path');

var generateTemplate = function generateTemplate (ariaGenerator, cfg) {
    var generated = {};
    if (cfg.hasOwnProperty('tplName') && cfg.hasOwnProperty('tplScript') && cfg.hasOwnProperty('tplCss')) {
        var content = createTemplateContent();
        var files = ariaGenerator.generateHtmlTemplate('<%= templateClass%>', cfg.tplScript, cfg.tplCss, content);
        for (var i=0; i<files.length; i++) {
            if (files[i].type == 'htmlTemplate') {
                files[i] = _fixCssClasspath(files[i]);
                generated.template = files[i];
            } else if (files[i].type == 'templateScript') {
                generated.templateScript = files[i];
            } else {
                files[i] = _fixCssClasspath(files[i]);
                generated.templateCss = files[i];
            }
        }
    }
    return generated;
};

function createTemplateContent () {
    var content = '{macro main()}<div style="padding:30px; width:500px; height:500px;"><img src="http://ariatemplates.com/images/logo-page.png" alt="Aria Templates" width="242" height="72"><h1 style="color:#666; font-size:20px; font-weight:bold; font-family:Tahoma; border:0px; padding-bottom:15px; margin:0px;">Hello World!</h1><p style="color:#5092bd; font-size:14px; font-family:Tahoma; margin:0;">This is your template</p></div>{/macro}';
    return content;
};

function _fixCssClasspath (cssTemplate) {
    cssTemplate.content = cssTemplate.content.replace('<%= templateClass%>Style', '<%= cssTemplateClass%>Style');
    return cssTemplate;
};

exports.generateTemplate = generateTemplate;