var db = require("../models");

module.exports = function(app){

    app.delete("/api/permission/:id/remove", function(req, res){
        db.Permission.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(function(thisPermission){
            res.status(200);
        });
    });
    

    app.post("/api/addPermission", function(req, res){
        console.log(req.body);
        db.Permission.create({
            StoryId: StoryId,
            UserId: UserId,
            permissionVote: permissionVote,
            permissionWrite: permissionWrite,
            permissionAdmin: permissionAdmin
        })
        .then(function(permission){
            // if no error
            res.status(200).json(permission);
        })
    });



} // End module.exports