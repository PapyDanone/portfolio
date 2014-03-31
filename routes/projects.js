var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('portfolio', server, {safe: true});

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'portfolio' database");
        db.collection('projects', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'projects' collection doesn't exist");
            }
        });
    }
});

exports.findAll = function(req, res) {
    db.collection('projects', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.findBySlug = function(req, res) {
    var slug = req.params.slug;
    console.log('Retrieving project: ' + slug);
    db.collection('projects', function(err, collection) {
        collection.findOne({'slug': slug}, function(err, item) {
            res.send(item);
        });
    });
};