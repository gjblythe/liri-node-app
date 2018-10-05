// require("dotenv").config();

//import keys.js

// var spotify = new Spotify(keys.spotify);

var request = require("request");


// var data = process.argv.slice(2).join(" ");

if (process.argv[2] === "movie-this"){
    
var movieName = process.argv[3];

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";


console.log(queryUrl);

request(queryUrl, function(error, response, body) {


  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("Title : " + JSON.parse(body).Title);
    console.log("Year : "+ JSON.parse(body).Year);
    console.log("Rated : "+ JSON.parse(body).Rated);
    console.log("Rotten Tomatoes Rating : " + JSON.parse(body).Ratings[1].Value);
    console.log("Country : " + JSON.parse(body).Country);
    console.log("Language : " + JSON.parse(body).Language);
    console.log("Plot Summary : " + JSON.parse(body).Plot);
    console.log("Actors : " + JSON.parse(body).Actors);
  }
});
}