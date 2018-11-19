# liri-node-app
Node search application. Connects users to helpfull API's for their entertainment needs. 

To watch this app in action check out this link. https://drive.google.com/file/d/109_1w6GpZCRVS0sRGdezvab2H3DE75SZ/view

This is a search application that uses Node.js to process async calls to 3 different APIs to seach Concerts(bandsintown), Movies(omdb) and Songs(Spotify).

A forth option is avaiale which readFile is used to have the app run the app as well.

![](https://github.com/gjblythe/liri-node-app/raw/master/liriStart.gif)
npm modules used are as follows use npm install for the following
-moment 
 -inquirer
 -node-spotify-api

Spotify will require you to create a user to get an API Key and a Secret for this function to work on your machine.

The app works these two ways.

    
    1)Type any of the following commands into process.argv[2] followed by item to be seached starting process.argv[3].
    
    concert-this (band name)
        //Uses bandsintown api to call the venue information from the band selected.
    
    movie-this (move title)
        //Uses ombd api to search by movie title.
    
    spotify-this-song (song name(followed be artist name optional))
        //Uses the spotify api to search by song and song by artist.
    
    do-what-it-says (null)
        //Uses fs to read .txt and search by command and input.

   
   2) Type node liri.js start 
        //uses inquirer for a better UX. Clicks and input promps guide the user through the search functions.
        
        
copyright 2018
