
//require the data from the friends.js file (or database if we had one)
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
        //first create a variable to hold the req.body (ie friend object from the survey html page)
        var newFriend = req.body;

        //variables for the match process
        //arbitrary number to compare the total difference against
        var difference = 20;
        var matchName;
        var matchPhoto;

        friendsData.forEach(function(friend){
            var matchedScoresArray = [];
            var totalDifference = 20;

            function add(total, num){
                return total + num;
            };
            // loop through each friend object in the data array (do this before adding the new friend I think)
            for (var i = 0; i < friend.scores.length; i++){
                //push the difference to the  matchedScores Array to hold
                //do the absolute difference between the current data (newFriend) scores and the data from the friends array
                matchedScoresArray.push(Math.abs(parseInt(newFriend.scores[i]) - parseInt(friend.scores[i])));
                
            };
            console.log("this is the matchedScoresArray: " + matchedScoresArray);

            // make the totalDifference this new difference amount, but adding each difference together in the array
            totalDifference = matchedScoresArray.reduce(add, 0);
            console.log("this is the totalDifference: " + totalDifference);

            if (totalDifference < difference){
                //set the difference varialbe to the new difference (so that each match has to be short and short in distance to be a match)
                difference = totalDifference;
                //assign the match name and pic to the approirate data from the friendsData array
                matchName = friend.name;
                matchPhoto = friend.photo;
            };
        });

        //send the match result back to the client as a json object
        res.json(
            {
            name: matchName,
            photo: matchPhoto
            }
        );

        //then push the new friend object into the friendsData file (after comparison)
        friendsData.push(newFriend);
        
        //testing
        // console.log("newFriend: " + JSON.stringify(newFriend, null, 2));
        // console.log("friends Array: " + JSON.stringify(friendsData, null, 2));
        // console.log("Results: " + difference + " | " + matchName + " | " + matchPhoto);

    });
};

// for every friend object in the data array, loop through each of the scores in the scores array
        //     for (var j = 0; j < friendsData[i].scores.length; j++){
        //         //do the math for each index to find the absolute difference and assign the totalDifference variable
        //     }
        // }



