// require("dotenv").config();
require("dotenv").config();
// var keys = require('keys.js');
//import keys.js

// var spotify = new Spotify(keys.spotify);
var request = require("request");
var moment = require("moment");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var liriCommand = "";
var liriResponse = "";




if (process.argv[2] === "movie-this"){
    
var movieName = process.argv.slice(3).join(" ")

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    
    if (movieName !== ""){
        request(queryUrl, function(error, response, body) {
    
        if (!error && response.statusCode === 200) {
            console.log("Title : " + JSON.parse(body).Title);
            console.log("Year : "+ JSON.parse(body).Year);
            console.log("Rated : "+ JSON.parse(body).Rated);
            console.log("Rotten Tomatoes Rating : " + JSON.parse(body).Ratings[1].Value);
            console.log("Country : " + JSON.parse(body).Country);
            console.log("Language : " + JSON.parse(body).Language);
            console.log("Plot Summary : " + JSON.parse(body).Plot);
            console.log("Actors : " + JSON.parse(body).Actors);
        } 
     })
    } else if (movieName === "") {

        movieName = "Mr. Nobody";

        queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
            
            request(queryUrl, function(error, response, body) {
    
                if (!error && response.statusCode === 200) {
                    console.log("Title : " + JSON.parse(body).Title);
                    console.log("Year : "+ JSON.parse(body).Year);
                    console.log("Rated : "+ JSON.parse(body).Rated);
                    console.log("Rotten Tomatoes Rating : " + JSON.parse(body).Ratings[1].Value);
                    console.log("Country : " + JSON.parse(body).Country);
                    console.log("Language : " + JSON.parse(body).Language);
                    console.log("Plot Summary : " + JSON.parse(body).Plot);
                    console.log("Actors : " + JSON.parse(body).Actors);
                    console.log("You should check this movie out");
                    console.log("It's on Netflix");
                }
                })
    } 

} 
else if (process.argv[2] === "concert-this") {
    var bandName = process.argv.slice(3).join(" ")
    
    var queryUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";
    
    request(queryUrl, function(error, response, body){
        if (!error && response.statusCode === 200){
            //look into the docs
            var result = JSON.parse(body)[0];
            var date = moment(result.datetime).format('l')
            console.log("Lineup : " + result.lineup);
            console.log("Name of Venue : " + result.venue.name);
            console.log("Location : " + result.venue.city + ", " + result.venue.country);
            console.log("Date : " + date);
        }
    });
} 
else if (process.argv[2] === "do-what-it-says" || process.argv[2] === "spotify-this-song") {
    
    if (process.argv[2] === "do-what-it-says") {fs.readFile("random.txt", "utf8", function(error, data){
        if(error){
            console.log(error)
            return; 
        }
        var doArray = data.split(',');
        liriCommand = doArray[0];
        liriResponse = doArray[1]

         // queryUrl = https://blahblah + randomResponse + apikey

    // request(queryURL, function(error, response, body){
        // if (!error && response === 200){
            // console.log(body);
        // }
    // })

    }); 
    } else if (process.argv[2] === "spotify-this-song") {
    var songName = process.argv.slice(3).join(" ");
    console.log(songName);
    
    // queryUrl = https://blahblah + songName + apikey

    // request(queryURL, function(error, response, body){
        // if (!error && response === 200){
            // console.log(body);
        // }
    // })

    }
}