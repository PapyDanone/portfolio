var ProjectsView = Backbone.View.extend({
	
	tagName: "ul",
	
	className: "projects",

    initialize: function (options) {
    	_.bindAll(this, 'addProjectView');
        this.render();
    },
    
    addProjectView: function(project, scroll) {
    	
    	var view = new ProjectView({model: project, vent: this.vent});
    	
    	$(this.el).append(view.el);
    	
    	if (scroll == true) {
    		this.scroll();
    	}
    },

    render: function () {
    	console.debug('rendering projects'); 
    	var self= this;
    	
    	_.each(this.collection.models, function (project) {
    		self.addProjectView(project, false);
        });

        return this;
    }
});

var ProjectView = Backbone.View.extend({

    tagName: "li",
    
    events: {
    },

    initialize: function (options) {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});