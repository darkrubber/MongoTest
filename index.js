var express = require('express');
var app = express();
var mongodb = require('mongodb');
var router = express.Router();
//LOAD the various controllers
var controllerMongoCollection = require('./controllers/database'); //load controller code dealing with database mongodb and Routes collection

var mongoDBURI = process.env.MONGODB_URI || 'mongodb://darkrubber:leung123@ds155695.mlab.com:55695/heroku_tf07tcg3';

app.use('/*', router);
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

//**************************************************************************
//***** mongodb get all of the Routes in Routes collection where frequence>=1
//      and sort by the name of the route.  Render information in the views/pages/mongodb.ejs
app.get('/mongodb', function (request, response) {

    mongodb.MongoClient.connect(mongoDBURI, function(err, db) {
        if(err) throw err;
        //get collection of routes
        var Routes = db.collection('Routes');
        //get all Routes
        Routes.find({ }).sort({ name: 1 }).toArray(function (err, docs) {
            if(err) throw err;

            response.render('pages/mongodb', {results: docs});

        });

        //close connection when your app is terminating.
        db.close(function (err) {
            if(err) throw err;
        });
    });//end of connect

});//end XXX.get


//CODE to route /getAllRoutes to appropriate  Controller function
//**************************************************************************
//***** mongodb get all of the Routes in Routes collection w
//      and Render information iwith an ejs view
app.get('/orders', controllerMongoCollection.getAllOrders);