// module used to load Aria Templates framework
var path = require('path');

function createContext (ariaBootstrapFileName, readLogicalPathSync) {
    var vm = require('vm');
    var timeouts = [];
    var timeoutId = 0;

    var atContext = vm.createContext({
        console : console,
        setTimeout : function (fn, delay) {
            timeoutId++;
            var id = "" + timeoutId;
            timeouts.push({
                id : id,
                fn : fn,
                delay : delay
            });
            return id;
        },
        clearTimeout : function (id) {
            for (var i = 0, l = timeouts.length; i < l; i++) {
                var item = timeouts[i];
                if (item.id === id) {
                    timeouts.splice(i, 1);
                    return;
                }
            }
        },
        setInterval : function () {
            console.log('setInterval not implemented.');
        },
        clearInterval : function () {
            // not implemented
        },
        execTimeouts : function () {
            var l = timeouts.length;
            while (l > 0) {
                var minIndex = 0;
                for (var i = 1; i < l; i++) {
                    if (timeouts[i].delay < timeouts[minIndex].delay) {
                        minIndex = i;
                    }
                }
                var minItem = timeouts[minIndex];
                timeouts.splice(minIndex, 1);
                minItem.fn.call(atContext);
                // The function called at the previous line can add or remove items from timeouts, so it's necessary to
                // check again the length:
                l = timeouts.length;
            }
        },
        load : function (filePath) {
            try {
                var fileContent = readLogicalPathSync(filePath);                
                vm.runInContext(fileContent, atContext, filePath);
            } catch (err) {
                console.log('   [' + 'ERR'.red + '] Error while trying to execute ' + filePath, err);
            }
        },
        Aria : {
            rootFolderPath : path.join(__dirname, "../../node_modules/ariatemplates/src/")
        }
    });
    
    atContext.load(ariaBootstrapFileName);

    atContext.Aria.classDefinition({
        $classpath : "aria.node.Transport",
        $implements : ["aria.core.transport.ITransports"],
        $singleton : true,
        $prototype : {
            isReady : true,
            init : atContext.Aria.empty,
            request : function (request, callback) {
                atContext.setTimeout(function () {
                    var data;
                    try {
                        data = readLogicalPathSync(request.url);
                    } catch (err) {
                        callback.fn.call(callback.scope, err, callback.args);
                        return;
                    }
                    callback.fn.call(callback.scope, false, callback.args, {
                        status : 200,
                        responseText : data
                    });
                }, 0);
            }
        }
    });

    atContext.aria.core.IO.updateTransports({
        "sameDomain" : "aria.node.Transport"
    });

    return atContext;
};

exports.loadAriaTemplates = function (callback, scope) {
    var ariaBootstrapFileName = path.join(__dirname, "../../node_modules/ariatemplates/src/aria/bootstrap.js");

    var atContext = createContext(ariaBootstrapFileName, function (logicalPath) {
        var path = logicalPath, fs = require('fs')
        if (path == null) {
            throw new Error("Cannot find " + logicalPath);
        }
        return fs.readFileSync(path, 'utf-8');
    });

    // Loading the Generator class to generate skeleton files (aria.templates.CfgBeans is loaded for backward compatibility, if you use AT 1.4.5 or higher you don't need it.)
    atContext.Aria.load({
        classes : ["aria.ext.filesgenerator.Generator", "aria.templates.CfgBeans"],
        oncomplete : {
            fn : callback,
            args : {
                atcontext : atContext
            },
            scope : scope
        }
    });
    atContext.execTimeouts();
};