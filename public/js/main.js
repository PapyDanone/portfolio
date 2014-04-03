var AppRouter = Backbone.Router.extend({

    routes: {
        ""              : "home",
        "projects"	    : "list",
        "project/:slug"	: "detail"
    },

    initialize: function () {
    	this.headerView = new HeaderView();
        $('body').prepend(this.headerView.el);
    },
    
    home: function () {
    	$("#content").html(new HomeView().el);
    	this.headerView.selectMenuItem('home');
    },

	list: function() {
		
		this.headerView.selectMenuItem('projects');
        
    	var projects = new ProjectCollection();
        
        projects.fetch({
        	success: function() {
        		$("#content").html(new ProjectsView({
        			collection: projects,
        			vent: vent
        		}).el);
        		
        		$("#content").append(new FiltersView({ vent: vent }).el);
        	},
        	error: function() {
        		console.debug('error while fetching projects');
        	}
        });
    },
    
    detail: function (slug) {
    	
    	this.headerView.selectMenuItem('projects');
    	
        var project = new Project({ slug: slug});
        project.fetch({success: function(){
            $("#content").html(new ProjectView({model: project}).el);
        }});
        //this.headerView.selectMenuItem();
    }

});

utils.loadTemplate(['HomeView', 'HeaderView', 'ProjectView', 'ProjectListItemView', 'FiltersView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});

var vent = _.extend({}, Backbone.Events);