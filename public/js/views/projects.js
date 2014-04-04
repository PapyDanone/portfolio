var ProjectsView = Backbone.View.extend({
	
	tagName: "div",
	
	className: "row projects",

    initialize: function (options) {
    	this.vent = options.vent;
    	_.bindAll(this, 'addProjectView');
    	options.vent.bind('filter', this.filter);
        this.render();
    },
    
    addProjectView: function(project, scroll) {
    	
    	var view = new ProjectListItemView({model: project, vent: this.vent});
    	
    	$('.project-list', this.el).append(view.el);
    },

    render: function () {
    	console.debug('rendering projects'); 
    	
    	$(this.el).html(this.template());
        $(this.el).append(new FiltersView({ vent: this.vent }).el);
        $(this.el).append('<div class="row project-list"></div>');
    	
    	var self= this;
    	
    	_.each(this.collection.models, function (project) {
    		self.addProjectView(project, false);
        });

        return this;
    }
});

var ProjectListItemView = Backbone.View.extend({

    tagName: "div",
    
    className: "thumbnail col-sm-6 col-md-4 project-item",
    
    events: {
    },

    initialize: function (options) {
    	this.vent = options.vent;
    	_.bindAll(this, 'filter');
    	this.vent.bind('filter', this.filter);
        this.render();
    },
    
    filter: function (event) {
    	
    	var tech = event.target.innerHTML;
    	
    	if (tech == 'All') {
    		$(this.el).removeClass('hidden');
    		return;
    	}
    	
    	if (!this.model.hasTech(tech)) {
    		$(this.el).addClass('hidden');
    	} else {
    		$(this.el).removeClass('hidden');
    	}
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});

var ProjectView = Backbone.View.extend({

    tagName: "div",
    
    className: "row project",
    
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

var FiltersView = Backbone.View.extend({

    tagName: "div",
    
    className: "container text-center filters",
    
    events: {
    	"click li a": "filter"
    },

    initialize: function (options) {
    	this.vent = options.vent;
        this.render();
    },
    
    filter: function (event) {
    	$('li').removeClass('active');
    	$(event.target).parent().addClass('active');
    	this.vent.trigger("filter", event);

        return false;
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    }

});