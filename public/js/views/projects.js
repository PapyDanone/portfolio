var ProjectsView = Backbone.View.extend({
	
	tagName: "div",
	
	className: "row",

    initialize: function (options) {
    	_.bindAll(this, 'addProjectView');
        this.render();
    },
    
    addProjectView: function(project, scroll) {
    	
    	var view = new ProjectListItemView({model: project, vent: this.vent});
    	
    	$(this.el).append(view.el);
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

var ProjectListItemView = Backbone.View.extend({

    tagName: "div",
    
    className: "col-sm-6 col-md-4",
    
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

var ProjectView = Backbone.View.extend({

    tagName: "div",
    
    className: "row",
    
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