
//require the data from the friends.js file
var friendsData = require("../data/friends");

//export these as a function to be used by the server.js file
module.exports = function(app) {

    //get route for survey page/modal to retrieve the survey results /data/friends.js (aka /api/friends) from the data/friends.js file and ...
    //also used when the API link is clicked at bottom of home page and ...
    //displays all friends as objects in an array

    app.get("/api/friends", function(req, res){
        res.json(friendsData);
    });

    //post route that will gather the survey data when its completed and send to the /data/friends.js (aka api/friends) file
    app.post("/api/friends", function(req, res){
        //send to the the friends.js file > friendsArray as an object
        //first create a variable to hold the req.body (ie friend object from the survey html page)
        var friend = req.body;

        //then push the new friend object into the friendsData file
        friendsData.push(friend);

        // finally send the array as a JSON object?
        // res.json(friendsArray);

        //when pushed to array mark as true(not sure if this is needed or not) this will let them know what their friend match is/pops the modal I think
        res.json(true);
    });

    //will also handle the compatability logic
};



