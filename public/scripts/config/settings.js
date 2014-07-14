define(["marionette"], function(Marionette){

    Marionette.TemplateCache.prototype.loadTemplate = function(templateId, callback){
        var template = templateId;

        if (!template || template.length === 0){
            var msg = "Could not find template: '" + templateId + "'";
            var err = new Error(msg);
            err.name = "NoTemplateError";
            throw err;
        }

        return template;
    };
});