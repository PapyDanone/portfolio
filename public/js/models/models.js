window.Project = Backbone.Model.extend({

    urlRoot: "project",

    idAttribute: "slug"
});

window.ProjectCollection = Backbone.Collection.extend({

    model: Project,

    url: "projects"
});