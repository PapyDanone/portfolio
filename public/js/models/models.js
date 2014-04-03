window.Project = Backbone.Model.extend({

    urlRoot: "project",

    idAttribute: "slug",
    
    hasTech: function (tech) {
    	return _.indexOf(this.get('techs'), tech) != -1 ? true : false ;
    }
});

window.ProjectCollection = Backbone.Collection.extend({

    model: Project,

    url: "projects"
});