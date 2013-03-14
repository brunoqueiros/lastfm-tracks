# Demo
[https://github.com/brunoqueiros/lastfm-tracks](https://github.com/brunoqueiros/lastfm-tracks "https://github.com/brunoqueiros/lastfm-tracks")

# How to use?
## Download it!
[Click here](https://github.com/brunoqueiros/lastfm-tracks/archive/master.zip "Download the files") to download the files

## Copy and paste
Copy and paste the required files into your file.

`<script src="js/lastfm-tracks.js"></script>`

## Get your API key
To get your API key if you haven't, go to `[http://www.lastfm.com.br/api/account/create](http://www.lastfm.com.br/api/account/create)` and generate your API key

## Initialize the plugin
Enter your information to the plugin, `apiKey` and `username` are required

<pre>
LastFM.init({
   apiKey: '67b7462dbd29a1451a56b18c5d66c517', // your API key (REQUIRED)
   username: 'brunoferreira_', // your username (REQUIRED)
   autoUpdate: true // do you want to update songs automatically?
   container: 'lfm-container', // class of the element that will contain all the tracks
   musicClass: 'lfm-music', // class of the element that will contain the music
   artistClass: 'lfm-artist', // class of the element that will contain the artist
   trackClass: 'lfm-track', // class of the element that will contain the track
   imageSize: 'large', // size of the cover
   limit: 6 // number of how many songs will display
   noImage: 'img/cover_placeholder_lg.jpg', // image that will be displayed if there is no image of LastFM
   interval: 60000 // interval to update the track list
 });
</pre>