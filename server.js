var express = require('express');
	path = require('path'),
	app = express(),
	projects = require('./routes/projects');

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'public')));
});

var server = require('http').Server(app);

app.get('/projects', projects.findAll);
app.get('/project/:slug', projects.findBySlug);

server.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});