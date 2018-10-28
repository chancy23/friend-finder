//dependencies
var express = require("express");

//this is now in the htmlroutes.js file, it says "path" is not defined otherwise
//var path = require("path");

//set up express for app
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//get the html routes and the api routes from the files so that our frontend will work
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

//set server to listen ============================
app.listen(PORT, function(){
    console.log("App listening on Port " + PORT);
});