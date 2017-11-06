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

//Update Story Click Function
$("#updateStory").on("click", function(){
    event.preventDefault();
   
    var updatedStory = {
        title: $("#createStoryTitle").val(),
        genre: $("#createStoryGenre").val(),
        openWriting: $("#openWritingToOthers").val(),
        openVoting: $("#openVotingToOthers").val(),
        visible: $("#visibleToPublic").val()
    }

    //Ajax call here to update story:
    $.ajax({
        type: "PUT", 
        url: "/api/stories/" +$("form").data('id'),
        data: JSON.stringify(updatedStory),
        // data: newStory,
        dataType: 'json',
        contentType: 'application/json',
        success: 
             console.log(updatedStory)
            // location.href = "/"
    })
})

//Click Function for Genre Search Button
$("#searchGenre").on("click", function(){
    console.log("Search Button is working")
})

$(".yesVote").on("click", function(){
    console.log(`clicked: yes vote for panel` + $(this).attr('targetId'));
    let target = 'panel' + $(this).attr('targetId');
    let id = $(this).attr('targetId');

    // Hide the target panel (we're done with voting for this one)
    $("#"+target).css('display', 'none');

    // TODO Add a vote for that target line
    $.ajax({
        url: `/api/line/${id}/voteYes`,
        type: 'PUT',
        success: function(result) {
            console.log(`successfully posted a yes vote for id: ${id}`);
        }
    });
});

$(".noVote").on("click", function(){
    console.log(`clicked: no vote for panel` + $(this).attr('targetId'));
    let target = 'panel' + $(this).attr('targetId');

    // Hide the target panel (we're done with voting for this one)
    $("#"+target).css('display', 'none');

    // the 'No' votes are not tallied - so we're done
});

})//End of document.ready 