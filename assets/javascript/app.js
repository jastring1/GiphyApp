/*  GiphyApp.js
    Tripp Stringfield */
$(document).ready(function () {    
var  gifButtonArray = ["cars","cats","dogs","fail","bike","ouch","crazy","stupid","flip","crash","jump","sport","fall"];

for (var i =0;i<gifButtonArray.length;i++)
{
    var gifButton = $('<button type="button" class="btn btn-info">');
    gifButton.text(gifButtonArray[i]);
    gifButton.attr('id',gifButtonArray[i]);
    $("#buttonRow").append(gifButton);
}



$("#submit-button").on("click", function(){
    var newGifButton = $('<button type="button" class="btn btn-info">');
    newGifButton.text($("#search").val());
    newGifButton.attr('id',$("#search").val());
    $("#buttonRow").append(newGifButton);
});





});
