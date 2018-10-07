
require("dotenv").config();

var keys = require('./keys.js');
var request = require("request");
var moment = require("moment");
var fs = require("fs");
var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify)

var liriCommand = process.argv[2];
var liriResponse = process.argv.slice(3).join(" ");

function liriReady() {
switch (liriCommand) {
  case "movie-this":
    if (!liriResponse) {
      liriResponse = "Mr. Nobody";
    }

    var movieName = liriResponse;

    var queryUrl =
      "http://www.omdbapi.com/?t=" +
      movieName +
      "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log("Title : " + JSON.parse(body).Title);
        console.log("Year : " + JSON.parse(body).Year);
        console.log("Rated : " + JSON.parse(body).Rated);
        console.log(
          "Rotten Tomatoes Rating : " + JSON.parse(body).Ratings[1].Value
        );
        console.log("Country : " + JSON.parse(body).Country);
        console.log("Language : " + JSON.parse(body).Language);
        console.log("Plot Summary : " + JSON.parse(body).Plot);
        console.log("Actors : " + JSON.parse(body).Actors);
      }
    });
    break;
    case "concert-this":
    var bandName = liriResponse

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
    break;
    case "spotify-this-song":
    
    if (!liriResponse) {
      liriResponse = "the sign by Ace of Base";
    };
    
    var song = liriResponse;
    

    spotify.search({ type: 'track', query: song + "&limit=1&" }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
     
      console.log("\n================")
      console.log("\nSong Title : " +data.tracks.items[0].name);
      console.log("\nArtist : " +data.tracks.items[0].artists[0].name); 
      console.log("\nAlbum : " + data.tracks.items[0].album.name);
      console.log("\nCheck it out on Spotify" + "\n" +data.tracks.items[0].album.external_urls.spotify);
      console.log("\n================")
    });
}

}

if (liriCommand === "do-what-it-says") {

    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error)
        }
        var doArray = data.split(',');
        liriCommand = doArray[0];
        liriResponse = doArray[1]
        liriReady();
    })
}

liriReady();