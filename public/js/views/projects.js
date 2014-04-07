var ProjectsView = Backbone.View.extend({
	
	tagName: "div",
	
	className: "row projects",

    initialize: function (options) {
    	this.vent = options.vent;
    	_.bindAll(this, 'addProjectView', 'filter');
    	options.vent.bind('filter', this.filter);
        this.render();
    },
    
    addProjectView: function(project) {
    	
    	var view = new ProjectListItemView({model: project, vent: this.vent});
    	
    	$('.project-list', this.el).append(view.el);
    },

    filter: function (event) {

        var tech = $(event.target).attr('data-filter');

        $('.project-list', this.el).isotope({
            itemSelector: 'article',
            filter: function() {

                if (tech == '*') {
                    return true;
                }

	            return $(this).attr('data-tech').indexOf(tech) >= 0;
            }
        });

        return false;
    },

    render: function () {
    	
    	$(this.el)
            .html(this.template())
            .append(new FiltersView({ vent: this.vent }).el)
            .append('<div class="row project-list"></div>');
    	
    	var self = this;
    	
    	_.each(this.collection.models, function (project) {
    		self.addProjectView(project);
        });

        return this;
    }
});

var ProjectListItemView = Backbone.View.extend({

    tagName: "article",
    
    className: "col-sm-6 col-md-4 project-item",
    
    events: {
    },

    initialize: function (options) {
    	this.vent = options.vent;
        this.render();
    },

    render: function () {

        $(this.el).attr('data-tech', this.model.get('techs').join(', '));
        
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
        
        // @see http://stackoverflow.com/questions/9145680/calling-javascript-on-rendering-views-in-backbone-js-post-render-callback
        _.defer(prettyPrint); 

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