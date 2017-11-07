//Search for a story by genre
//*******MAKE SURE ROUTES ARE INCLUDED IN THE SERVER.JS FILE!!!!!!!!!!!!!!!!!! */


var db = require("../models");

module.exports = function(app){

    app.get("/api/genre/:genre", function(req, res){        
        console.log(req.params.genre)
        db.Story.findAll({
            where:{
                genre: req.params.genre
              }
        }).then(function(story){
            // res.json(story);
            console.log(story)
            var allStoriesByGenre = {
                handlebarsCall:story
            };

            // console.log("***GENRE STORIES")
            console.log(allStoriesByGenre);
            res.render("genreSearchResults", allStoriesByGenre)
           
        })
    
});

}//End of exports