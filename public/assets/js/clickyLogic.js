$(document).ready(function(){

//Submit new story logic
$("#createStory").on("click", function(){
    event.preventDefault();

    var newStory = {
        title: $("#createStoryTitle").val(),
        genre: $("#createStoryGenre").val(),
        openWriting: $("#openWritingToOthers").val(),
        openVoting: $("#openVotingToOthers").val(),
        visible: $("#visibleToPublic").val()
    }
  
    //This Works!!!!
    //We are getting an object for the database
    // console.log(newStory);

    //Ajax call here:
    $.ajax({
        type: "POST", 
        url: "/api/newStory",
        data: JSON.stringify(newStory),
        // data: newStory,
        dataType: 'json',
        contentType: 'application/json',
        success: function(newStory){
            console.log(newStory)
        }
            
    })

    //Clear form values
    title: $("#createStoryTitle").val("");
    genre: $("#createStoryGenre").val("");
    openWriting: $("#openWritingToOthers").val("");
    openVoting: $("#openVotingToOthers").val("");
    visible: $("#visibleToPublic").val("")


})




})//End of document.ready 