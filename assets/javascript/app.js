/*  GiphyApp.js
    Tripp Stringfield */

var topics = ["cars", "cats", "dogs", "fail", "bike", "ouch", "crazy", "stupid", "flip", "crash", "jump", "sport", "fall"];
var limit = 10;
var offset = 10;
var globalName = "";

function renderButtons() {

    $("#buttonRow").empty();
    for (var i = 0; i < topics.length; i++) {
        var a = $('<button type="button" class="btn btn-info">');
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#buttonRow").append(a);
    }
}
function loadTrending() {
    $("#gifRow").empty();
    var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=DR6i6j7HT7g4SZX8exHOz0zrbtsn37wM&limit=" + limit;
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
                gifDiv.append(gifImage);
                gifDiv.append(p);
                $("#gifRow").append(gifDiv);
            }
        });

}
function displayGifs() {
    $("#gifRow").empty();
    var name = $(this).attr("data-name");
    globalName = name;
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        name + "&api_key=DR6i6j7HT7g4SZX8exHOz0zrbtsn37wM&limit=" + limit;
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
                gifDiv.append(gifImage);
                gifDiv.append(p);
                $("#gifRow").append(gifDiv);
            }
        });
}
function displayMore() {
    var name = globalName;
    var queryURL;
    globalName === "" ? queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=DR6i6j7HT7g4SZX8exHOz0zrbtsn37wM&limit=" + limit + "&offset=" + offset :
        queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        name + "&api_key=DR6i6j7HT7g4SZX8exHOz0zrbtsn37wM&limit=" + limit + "&offset=" + offset;
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
                gifDiv.append(gifImage);
                gifDiv.append(p);
                $("#gifRow").append(gifDiv);
            }
        });
    offset += 10;
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
    var newGif = $("#search").val().trim().toLowerCase();
    if (newGif !== ""){
    topics.push(newGif);
    renderButtons();
    }
}

renderButtons();
loadTrending();
$(document).on("click", "#submit-button", addCategory);
$(document).on("click", "#more-button", displayMore);
$(document).on("click", ".btn-info", displayGifs);
$(document).on("click", ".gif", animateGif);



