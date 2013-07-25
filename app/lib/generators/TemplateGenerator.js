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
    var content =
    '    {macro main()}\r\n' +
    '        <div style="height:100%; width:100%; position:absolute; background-color:#f8f8f8;">\r\n' +
    '            <div style="position:absolute; left:50%; height:320px; width:480px; margin-left:-240px; margin-top:80px; border-radius:15px; border:2px solid #fff;">\r\n' +
    '                <div style="margin-left:100px; margin-top:5px;">\r\n' +
    '                    <a href="http://ariatemplates.com" target="_blank"><img src="http://ariatemplates.com/images/logo-page.png" alt="Aria Templates" width="242" height="72"></a>\r\n' +
    '                    <iframe allowtransparency="true" frameborder="0" scrolling="no" src="//platform.twitter.com/widgets/follow_button.html?screen_name=ariatemplates&show_screen_name=false&show_count=false" style="width:60px; height:20px; margin-bottom:12px; margin-left:5px;"></iframe>\r\n' +
    '                    <div style="padding-left:80px; padding-top:45px;">\r\n' +
    '                        <h1 style="color:#666; font-size:20px; font-weight:bold; font-family:Tahoma; border:0px; padding-bottom:15px; margin:0px;">Hello World!</h1>\r\n' +
    '                        <p style="color:#272c2f; font-size:14px; font-family:Tahoma; margin:0;">This is your template</p>\r\n' +
    '                    </div>\r\n' +
    '                </div>\r\n' +
    '                <div style="padding-top:75px; padding-left:10px; padding-right:10px;">\r\n' +
    '                    <span style="color:#666; font-size:14px; font-family:Tahoma; margin:0;">Everything is set up! You can now start working on your awesome project.</span>\r\n' +
    '                    <div style="padding-top:8px;">\r\n' +
    '                        <iframe src="http://ghbtns.com/github-btn.html?user=ariatemplates&repo=ariatemplates&type=fork&count=true&size=large" allowtransparency="true" frameborder="0" scrolling="0" width="220" height="30"></iframe>\r\n' +
    '                        <iframe src="http://ghbtns.com/github-btn.html?user=ariatemplates&repo=ariatemplates&type=watch&count=true&size=large" allowtransparency="true" frameborder="0" scrolling="0" width="121" height="30" style="float:right;"></iframe>\r\n' +
    '                    </div>\r\n' +
    '                </div>\r\n' +
    '            </div>\r\n' +
    '        </div>\r\n' +
    '        {/macro}';
    return content;
};

function _fixCssClasspath (cssTemplate) {
    cssTemplate.content = cssTemplate.content.replace('<%= templateClass%>Style', '<%= cssTemplateClass%>Style');
    return cssTemplate;
};

exports.generateTemplate = generateTemplate;