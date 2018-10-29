
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
        // variable to hold the req.body (i.e. friend object from the survey page)
        var newFriend = req.body;

        //variables for the match process
        var difference = 20; //arbitrary number to compare the total difference against
        var matchName;
        var matchPhoto;

        // loop through our friendsArray data
        friendsData.forEach(function(friend){
            //empty array to hold our score differences 
            var matchedScoresArray = [];
            var totalDifference = 20; //same arbitrary number, when a match is closer it will be replaced by that new number

            //helper function to to add up the total differences 
            function add(total, num){
                return total + num;
            };

            // loop through each friend's scores array in the data array (do this before adding the new friend I think)
            for (var i = 0; i < friend.scores.length; i++){
                //push the difference to the  matchedScores Array to hold
                //do the absolute difference between the current data (newFriend) scores and the data from the friends array
                matchedScoresArray.push(Math.abs(parseInt(newFriend.scores[i]) - parseInt(friend.scores[i])));
                
            };
            
            // make the totalDifference this new difference amount, by adding each difference together in the array (using the helper function "add" here)
            totalDifference = matchedScoresArray.reduce(add, 0);

            // testing section
            // console.log("this is the matchedScoresArray: " + matchedScoresArray);
            // console.log("this is the totalDifference: " + totalDifference);

            if (totalDifference < difference){
                //set the difference varialbe to the new difference (so that each match has to be short and short in distance to be a match)
                difference = totalDifference;
                //assign the match name and pic to the appr. data from the friendsData array
                matchName = friend.name;
                matchPhoto = friend.photo;
            };
        });

        //send the match result back to the client as a json object ("data")
        res.json(
            {
            name: matchName,
            photo: matchPhoto
            }
        );

        //then push the new friend object into the friendsData file
        friendsData.push(newFriend);
        
        //testing section
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



