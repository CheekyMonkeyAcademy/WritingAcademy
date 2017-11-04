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
        success: 
        function(newStory){
            console.log(newStory)
            //I want to go to the index.handlebars to view the stories I have created
            // location.href = "/"
        }            
    })

    //Clear form values
    title: $("#createStoryTitle").val("");
    genre: $("#createStoryGenre").val("");
    openWriting: $("#openWritingToOthers").val("");
    openVoting: $("#openVotingToOthers").val("");
    visible: $("#visibleToPublic").val("")
})

//Edit Created Story Logic
$("#editStory").on("click", function(){
    // event.preventDefault();
    console.log("WORKING?? WORKING??");
    // var thisStoryUpdateId = $(this).attr('thisStoryId');
    // console.log(thisStoryUpdateId);
})




})//End of document.ready 