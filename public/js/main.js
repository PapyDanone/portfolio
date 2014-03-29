var AppRouter = Backbone.Router.extend({

    routes: {
        ""              : "home",
        "projects"	    : "list",
        "project/:id"	: "detail"
    },

    initialize: function () {
    	this.headerView = new HeaderView();
        $('body').append(this.headerView.el);
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
        		
        		var msgView = new ProjectsView({
        			collection: projects, 
        			socket: window.socket
        		});
        		
        		$("#content").html(msgView.el);
        	},
        	error: function() {
        		console.debug('error while fetching projects');
        	}
        });
    },
    
    detail: function (id) {
        var project = new Project({_id: id});
        project.fetch({success: function(){
            $("#content").html(new ProjectView({model: project}).el);
        }});
        //this.headerView.selectMenuItem();
    }

});

utils.loadTemplate(['HomeView', 'HeaderView', 'ProjectView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});