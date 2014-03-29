window.Project = Backbone.Model.extend({

    urlRoot: "projects",

    idAttribute: "_id"
});

window.ProjectCollection = Backbone.Collection.extend({

    model: Project,

    url: "projects"
});