/*  GiphyApp.js
    Tripp Stringfield */

var topics = ["cars", "cats", "dogs", "fail", "bike", "ouch", "crazy", "stupid", "flip", "crash", "jump", "sport", "fall"];
limit = 10;
function renderButtons() {

    $("#buttonRow").empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $('<button type="button" class="btn btn-info">');
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#buttonRow").append(a);
    }
}
function displayGifs() {
    $("#gifRow").empty();
    var name = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        name + "&api_key=DR6i6j7HT7g4SZX8exHOz0zrbtsn37wM&limit=10";
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
                gifDiv.append(p);
                gifDiv.append(gifImage);
                $("#gifRow").prepend(gifDiv);
            }
        });
}

function animateGif() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
}
function addCategory() {
    event.preventDefault();
    var newGif = $("#search").val().trim();
    topics.push(newGif);
    renderButtons();

}

renderButtons();
$(document).on("click", "#submit-button", addCategory);
$(document).on("click", ".btn-info", displayGifs);
$(document).on("click", ".gif", animateGif);



