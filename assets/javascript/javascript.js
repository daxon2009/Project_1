  // Load the IFrame Player API code asynchronously.
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/player_api";
  var lastScriptTag = document.getElementsByTagName('script')[0];
  lastScriptTag.parentNode.insertBefore(tag, lastScriptTag);

  // Replace the 'ytplayer' element with an <iframe> and
  // YouTube player after the API code downloads.

function doSearch(){
  $("#search").removeClass('open');
  var input = $("#searchinput").val() +" trailer";
  var request = gapi.client.youtube.search.list({
          q: input,
          part: 'snippet',
          maxResults: 1,
          order: 'relevance',
          safeSearch: 'moderate', 
          type: 'video',
          videoEmbeddable: true
      });

      // Send the request to the API server,
      // and invoke onSearchRepsonse() with the response.
      request.execute(function(response){
            var videos = response.items;
            console.log(videos);
            
            $.each( videos , function( index, video ) {
            	replaceYoutubeElement()
                var videoID = video.id.videoId;
                //request.execute(onSearchResponse(videoID));
                var player = new YT.Player('ytplayer', {
                  height: '360',
                  width: '640',
                  videoId: videoID
              });
            });
      });
      handleInput();
}
  //var player;
   //var player;
  function onYouTubePlayerAPIReady() {
    setTimeout(()=>{
    gapi.client.load('youtube', 'v3',function(){
    gapi.client.setApiKey('AIzaSyBWLFMCKJ6Uy5pVPe73pk-YGYfpAagp9x4');
    $("#searchbutton").attr("disabled", false);
    $("#searchinput").val("the matrix")
    doSearch();
      console.log('ggkgkjh');
    
    });
  },5000)
  }

  // function onYouTubePlayerAPIReady(videoID) {
    
  //   var videoSrc = 'https://www.youtube.com/embed/'+ videoId + '?autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0';
  //   console.log('src', videoSrc);

  //   $('.embed-responsive-item').attr( 'src', videoSrc );
  // };
  


function handleInput(){
  var userInput = $("#searchinput").val()
   console.log(userInput);

  var movies = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];
    var queryURL = "https://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=40e9cece";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) 
    {
      console.log(response)
      var movieDiv = $("<div class='movie'>");
      var rating = response.Rated;
      var pOne = $("<p>").text("Rating: " + rating);
      movieDiv.append(pOne);
      var released = response.Released;
      var pTwo = $("<p>").text("Released: " + released);
        movieDiv.append(pTwo);
        var plot = response.Plot;
        var pThree = $("<p>").text("Plot: " + plot);
        movieDiv.append(pThree);
        var imgURL = response.Poster;
        var image = $("<img>").attr("src", imgURL);
        movieDiv.append(image);
        $("#movies-view").empty(movieDiv).prepend(movieDiv);
  });
}


// function handleInput2(){
//   var userInput = $("#searchinput").val()
//      console.log(userInput);
//      search(userInput)
// }
  function showResponse(response) {
      var responseString = JSON.stringify(response, '', 2);
      document.getElementById('response').innerHTML += responseString;
  }
  function googleApiClientReady(){
  console.log('GOOGLE IS READY')
   // window.onClientLoad()
   gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

  function onClientLoad() {
      gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
  }

  function onYouTubeApiLoad() {
      gapi.client.setApiKey('AIzaSyBWLFMCKJ6Uy5pVPe73pk-YGYfpAagp9x4');
      console.log(gapi.client.youtube)
      console.log('BUTTON SHOULD DISDablE')
      // $("#search").attr("disabled", false);
  }

  function search(userInput) {

      // Use the JavaScript client library to create a search.list() API call.
      var request = gapi.client.youtube.search.list({

          q: userInput,
          part: 'snippet',
          maxResults: 1,
          order: 'viewCount',
          safeSearch: 'moderate',
          type: 'video',
          videoEmbeddable: true
      });

      // Send the request to the API server,
      // and invoke onSearchRepsonse() with the response.
      request.execute(onSearchResponse);
  }

  function onSearchResponse(response) {
    // showResponse(response);
    console.log(response);
    var videos = response.items;

    $.each( videos , function( index, video ) {
      var videoID = video.id.videoId;
      //request.execute(onSearchResponse(videoID));
      player = new YT.Player('ytplayer', {
      height: '360',
      width: '640',
      videoId: videoID
    });
    });
    };  

  


$("#searchbutton").on("click",function(event){
   //handleInput()
   event.preventDefault()
   //handleInput2()
   doSearch()
})

$(document).on("keydown",function(event){
  if (event.key==="Enter") {
    event.preventDefault()
    //handleInput()
   doSearch();
  }
})

function replaceYoutubeElement(){
	console.log('replace element')
	$("#playerholder").empty();
  	$("<div id= 'ytplayer'></div>").appendTo($("#playerholder"));


}

