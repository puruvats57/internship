var express = require('express');

var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
const User = require("./models/User");
const appController = require("./controllers/appController");
const cors=require('cors');
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


mongoose.connect('mongodb://localhost:27017/inventory', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (!err) {
    console.log('MongoDB Connection Succeeded.');
  } else {
    console.log('Error in DB connection : ' + err);
  }
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
});

app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  }),
  
  
  

}));






app.post("/add",appController.add);
app.post("/update", appController.update);

app.delete("/delete", appController.delete);

app.get("/filter", appController.filter);
app.get("/getdetails", appController.getdetails);



  
const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log('Server will started at http://127.0.0.1:'+PORT);
});