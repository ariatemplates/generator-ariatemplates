
/**
 * TODO create a description
 * @class <%= controllerClass %>
 * @extends aria.templates.ModuleCtrl
 */
Aria.classDefinition({
    $classpath : "<%= controllerClass %>",
    $extends : "aria.templates.ModuleCtrl",
    $implements : ["<%= controllerInterfaceClass %>"],
    $constructor : function () {                    
        this.$ModuleCtrl.constructor.call(this);
    },
    $destructor : function () {
        this.$ModuleCtrl.$destructor.call(this);
    },
    $prototype : {
        $publicInterfaceName : "<%= controllerInterfaceClass %>"        
    }
});