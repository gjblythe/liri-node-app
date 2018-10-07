console.log("\n*******************\nType Start to Begin\n*******************");
//hides API Keys
require("dotenv").config();

//NPM Packages
var keys = require("./keys.js");
var request = require("request");
var moment = require("moment");
var fs = require("fs");
var inquirer = require("inquirer");
var Spotify = require("node-spotify-api");

//var for spotify API call
var spotify = new Spotify(keys.spotify);

//user Inputs
var liriCommand = process.argv[2];
var liriResponse = process.argv.slice(3).join(" ");

//liri function
function liriReady() {
  switch (liriCommand) {
    case "movie-this":
      if (!liriResponse) {
        liriResponse = "Highlander";
        console.log("\nThere can be only one!");
        console.log("\n,_._._._._._._._._|__________________________________________________________,");
        console.log("|_|_|_|_|_|_|_|_|_|_________________________________________________________/");
        console.log("                  !")
      }

      var movieName = liriResponse;

      var queryUrl =
        "http://www.omdbapi.com/?t=" +
        movieName +
        "&y=&plot=short&apikey=trilogy";

      request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          console.log("\n================");
          console.log("\nTitle : " + JSON.parse(body).Title);
          console.log("\nYear : " + JSON.parse(body).Year);
          console.log("\nRated : " + JSON.parse(body).Rated);
          console.log(
            "\nRotten Tomatoes Rating : " + JSON.parse(body).Ratings[1].Value
          );
          console.log("\nCountry : " + JSON.parse(body).Country);
          console.log("\nLanguage : " + JSON.parse(body).Language);
          console.log("\nPlot Summary : " + JSON.parse(body).Plot);
          console.log("\nActors : " + JSON.parse(body).Actors);
          console.log("\n================");
        }
      });
      break;
    case "concert-this":
    if (!liriResponse) {
      liriResponse = "Slayer";
      console.log("\nStill Touring...")
    }
      var bandName = liriResponse;

      var queryUrl =
        "https://rest.bandsintown.com/artists/" +
        bandName +
        "/events?app_id=codingbootcamp";

      request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          //look into the docs
          var result = JSON.parse(body)[0];
          var date = moment(result.datetime).format("l");
          console.log("\n================");
          console.log("\nLineup : " + result.lineup);
          console.log("\nName of Venue : " + result.venue.name);
          console.log(
            "\nLocation : " + result.venue.city + ", " + result.venue.country
          );
          console.log("\nDate : " + date);
          console.log("\n================");
        }
      });
      break;
    case "spotify-this-song":
      if (!liriResponse) {
        liriResponse = "Killed by Death Motorhead";
        console.log("\nRIP Lemmy")
        console.log("....................../´¯/) ");
        console.log("....................,/¯../  ");
        console.log(".................../..../  ");
        console.log("............./´¯/'...'/´¯¯`·¸  ");
        console.log("........../'/.../..../......./¨¯` ");
        console.log("........('(...´...´.... ¯~/'...') ");
        console.log(".........`.................'...../ ");
        console.log("..........''...`.......... _.·´ ");
        console.log("............`..............(  ");
        console.log("..............`.............`...");

      }

      var song = liriResponse;

      spotify.search({ type: "track", query: song + "&limit=1&" }, function(
        err,
        data
      ) {
        if (err) {
          return console.log("Error occurred: " + err);
        }

        console.log("\n================");
        console.log("\nSong Title : " + data.tracks.items[0].name);
        console.log("\nArtist : " + data.tracks.items[0].artists[0].name);
        console.log("\nAlbum : " + data.tracks.items[0].album.name);
        console.log(
          "\nCheck it out on Spotify" +
            "\n" +
            data.tracks.items[0].album.external_urls.spotify
        );
        console.log("\n================");
      });
  }
}
function doWhat() {
  if (liriCommand === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function(error, data) {
      if (error) {
        return console.log(error);
      }
      var doArray = data.split(",");
      liriCommand = doArray[0];
      liriResponse = doArray[1];
       
      liriReady();
    });
  }
}

doWhat();
liriReady();

//Inquirer interface//
//way better

if (liriCommand === "start") {
  inquirer
    .prompt([
      {
        type: "list",
        message:
          "Welcome to Liri 1.01 \nPlease chose one of the following commands",
        choices: [
          "concert-this",
          "movie-this",
          "spotify-this-song",
          "do-what-it-says"
        ],
        name: "command"
      }
    ])
    .then(function(response) {
      liriCommand = response.command;
      if (liriCommand === "concert-this") {
        inquirer
          .prompt([
            {
              type: "input",
              message: "\nPick a Band you would like to see.",
              name: "search"
            }
          ])
          .then(function(response) {
            liriResponse = response.search;
            liriReady();
          });
      } else if (liriCommand === "movie-this") {
        inquirer
          .prompt([
            {
              type: "input",
              message: "\nWhat movie would you like to check out?",
              name: "search"
            }
          ])
          .then(function(response) {
            liriResponse = response.search;
            liriReady();
          });
      } else if (liriCommand === "spotify-this-song") {
        inquirer
          .prompt([
            {
              type: "input",
              message:
                "\nName a song you want to hear. Or a song and and an Artist.",
              name: "search"
            }
          ])
          .then(function(response) {
            liriResponse = response.search;
            liriReady();
          });
      } else {
        inquirer
          .prompt([
            {
              type: "confirm",
              message:
                "\nNow for the all powerfull Random! What have the gods deemed worth?...\nAre you ready?",
              name: "confirm",
              default: true
            }
          ])
          .then(function(response) {
            if (response.confirm) {
              console.log("\n================\n\nWell Played Random...");
              doWhat();
            } else {
              console.log(
                "\n================\n\nRandom does not care what you think...Here it is anyways.."
              );
              doWhat();
            }
          });
      }
    });
}
