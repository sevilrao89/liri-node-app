var Twitter = require('twitter');
var Spotify = require('node-spotify-api')
var keys = require("./keys.js")
require("dotenv").config();
var request = require("request")
console.log(keys)

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
//var bodyParser = require('body-parser')


if(process.argv[2]=="my-tweets"){
  myTweets()
}
else if(process.argv[2]=='spotify-this-song'){
  spotifySong(process.argv[3])
}
else if(process.argv[2]=='movie-this'){
  lookUpMovie(process.argv[3])
}
function lookUpMovie(movie){
 request
  .get('http://www.omdbapi.com/?apikey=d5f37d00&t=' + movie)
  .on('response', function(response) {
  console.log(response.statusCode) // 200
  console.log(response.body) // 'image/png'
  })

}


function spotifySong(song){
  spotify.search({ type: 'track', query: song }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   var newData = data.tracks.items[0]
   console.log(newData.album.artists[0].name);
   console.log(newData.name)
   console.log(newData.preview_url)
   console.log(newData.album.name)
  //console.log(data.tracks.items[0].album.artists[0],.); 
  });
}
function myTweets(){
  // $.ajax({
  //   url: "test.html",
  //   method: "GET"
  // }).done(function() {
  //   $( this ).addClass( "done" );
  // });
var params = {screen_name: 'sv_liri'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (var i = 0; i < tweets.length;  i++){
      console.log(tweets[i]['created_at'], tweets[i]['text'])
    }
    //console.log(tweets);
  }
});

}



