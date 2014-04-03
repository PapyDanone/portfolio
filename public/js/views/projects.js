var ProjectsView = Backbone.View.extend({
	
	tagName: "div",
	
	className: "row",

    initialize: function (options) {
    	this.vent = options.vent;
    	_.bindAll(this, 'addProjectView');
    	options.vent.bind('filter', this.filter);
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
    
    className: "col-sm-6 col-md-3",
    
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
    		$(this.el).fadeIn('fast');
    		return;
    	}
    	
    	if (!this.model.hasTech(tech)) {
    		$(this.el).fadeOut('fast');
    	} else {
    		$(this.el).fadeIn('fast');
    	}
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
    
    hide: function () {
    	$(this.el).hide();
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});

var FiltersView = Backbone.View.extend({

    tagName: "div",
    
    className: "row",
    
    events: {
    	"click .label": "filter"
    },

    initialize: function (options) {
    	this.vent = options.vent;
        this.render();
    },
    
    filter: function (event) {
    	$('.label').removeClass('label-primary').addClass('label-default');
    	$(event.target).removeClass('label-default');
    	$(event.target).addClass('label-primary');
    	this.vent.trigger("filter", event);
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    }

});