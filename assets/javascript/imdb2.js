var movies = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];
function displayMovieInfo() 
{
	var movie = $(this).attr("data-name");
	var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece";
	$.ajax({
	    url: queryURL,
	    method: "GET"
	}).done(function(response) 
	{
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

function renderButtons() {
	$("#buttons-view").empty();
	for (var i = 0; i < movies.length; i++) 
	{
    // Then dynamicaly generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
	    var a = $("<button>");
	    // Adding a class of movie to our button
	    a.addClass("movie");
	    // Adding a data-attribute
	    a.attr("data-name", movies[i]);
	    // Providing the initial button text
	    a.text(movies[i]);
	    // Adding the button to the buttons-view div
	    $("#buttons-view").append(a);
  	}
}

$("#add-movie").on("click", function(event) 
{
  event.preventDefault();
  // This line grabs the input from the textbox
  var movie = $("#movie-input").val().trim();
  // Adding movie from the textbox to our array
  movies.push(movie);
  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});
// Adding a click event listener to all elements with a class of "movie"
$(document).on("click", ".movie", displayMovieInfo);
// Calling the renderButtons function to display the intial buttons
renderButtons();