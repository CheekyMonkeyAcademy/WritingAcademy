$(document).ready(function(){

    //Submit new story logic
    $("#createStory").on("click", function(){
        event.preventDefault();

        var newStory = {
            title: $("#createStoryTitle").val(),
            genre: $("#createStoryGenre").val(),
            openWriting: $("#openWritingToOthers").val(),
            openVoting: $("#openVotingToOthers").val(),
            visible: $("#visibleToPublic").val(),
            minimumNumberOfVoters: $("#minimumNumberOfVoters").val(),
            minimumNumberOfWriters: $("#minimumNumberOfWriters").val(),
            scheduleActive: $("#scheduleActive").val(),
            writingTimePeriodInMins: $("#writingTimePeriodInMins").val(),
            votingTimePeriodInMins: $("#votingTimePeriodInMins").val()
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
        visible: $("#visibleToPublic").val("");
        minimumNumberOfVoters: $("#minimumNumberOfVoters").val("");
        minimumNumberOfWriters: $("#minimumNumberOfWriters").val("");
        scheduleActive: $("#scheduleActive").val("");
        writingTimePeriodInMins: $("#writingTimePeriodInMins").val("");
        votingTimePeriodInMins: $("#votingTimePeriodInMins").val("")
    })

    //Update Story Click Function
    $("#updateStory").on("click", function(){
        event.preventDefault();
    
        var updatedStory = {
            title: $("#createStoryTitle").val(),
            genre: $("#createStoryGenre").val(),
            openWriting: $("#openWritingToOthers").val(),
            openVoting: $("#openVotingToOthers").val(),
            visible: $("#visibleToPublic").val(),
            minimumNumberOfVoters: $("#minimumNumberOfVoters").val(),
            minimumNumberOfWriters: $("#minimumNumberOfWriters").val(),
            scheduleActive: $("#scheduleActive").val(),
            writingTimePeriodInMins: $("#writingTimePeriodInMins").val(),
            votingTimePeriodInMins: $("#votingTimePeriodInMins").val()
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

    //Logic for Genre Search
    $("#genreButton").on("click", function(){
        event.preventDefault();

        //This works!! Getting user input
        var searchDataForThisGenre = $("#genreSearchInput").val()
        console.log(searchDataForThisGenre);

        $.ajax({
            type: "GET",
            url: `/api/genre/${searchDataForThisGenre}`,
            data: JSON.stringify(searchDataForThisGenre),
            dataType:'json',
            contentType:'application/json',
            success:
            location.href = `/api/genre/${searchDataForThisGenre}`
            //console.log(searchDataForThisGenre)
        })
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
                console.log(`successfully posted a yes vote for line id: ${id}`);
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


    $("#submitStory").on("click", function () {
        event.preventDefault();

        var writeStoryBody = {
            body: $("#storyBody").val()
        }
        $.ajax({
            type: "POST",
            url: "/api/writeStory",
            data: JSON.stringify(writeStoryBody),
            dataType: 'json',
            contentType: 'application/json',
            success: function (writeStoryBody) {
                console.log(writeStoryBody)
            }
        });
        //Clear form values
        title: $("#storyBody").val("");
    });

})//End of document.ready 