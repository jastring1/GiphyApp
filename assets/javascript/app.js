/*  GiphyApp.js
    Tripp Stringfield */

var gifButtonArray = ["cars", "cats", "dogs", "fail", "bike", "ouch", "crazy", "stupid", "flip", "crash", "jump", "sport", "fall"];

function renderButtons() {

    $("#buttonRow").empty();
    for (var i = 0; i < gifButtonArray.length; i++) {
        var a = $('<button type="button" class="btn btn-info">');
        a.attr("data-name", gifButtonArray[i]);
        a.text(gifButtonArray[i]);
        $("#buttonRow").append(a);
    }
}
function displayGifs(){
    $("#gifRow").empty();
    var name = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        name + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_still.url);
                gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                gifImage.attr("data-animate", results[i].images.fixed_height.url);
                gifImage.attr("data-state", "still");
                gifImage.addClass("gif");
                console.log(gifImage.attr("data-animate"));
                gifDiv.append(p);
                gifDiv.append(gifImage);
               $("#gifRow").prepend(gifDiv);
            }
        });

}
function animateGif(){
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
}
$("#submit-button").on("click", function () {
    event.preventDefault();
    var newGif = $("#search").val().trim();
    gifButtonArray.push(newGif);
    renderButtons();
});

renderButtons();
$(document).on("click", ".btn-info", displayGifs);
$(document).on("click", ".gif", animateGif);



