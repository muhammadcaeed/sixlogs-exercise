var express = require("express");
var cors = require('cors');
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var USERS_COLLECTION = "users";

var app = express();

app.use(cors());
app.use(bodyParser.json());

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

var db;

// mongodb.MongoClient.connect('mongodb://localhost:27017/exercise', function (err, database) {
mongodb.MongoClient.connect('mongodb://msaeed:mastiworld1@ds145188.mlab.com:45188/sixlogs_exercise', function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  db = database;

app.post('/', function(req, res) {
  db.collection(USERS_COLLECTION).insert(
      req.body,
      function (err, result) {
          if (err) res.sendStatus(400);
          else res.status(200).json(result);
  })
});

app.put('/:id', function(req, res) {
  db.collection(USERS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, req.body, function(err, result) {
    if (err) res.sendStatus(400);
    else res.status(200).json(result);
  })
});

app.get('/', function(req, res) {
  db.collection(USERS_COLLECTION).find({}).toArray(function (err, users) {
    if (err) res.sendStatus(400);
    else res.status(200).json(users);
  })
});

app.delete('/:id', function(req, res) {
  db.collection(USERS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) res.sendStatus(400);
    else res.status(200).json(result);
  })
});

var server = app.listen(process.env.PORT || 3000, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

});
