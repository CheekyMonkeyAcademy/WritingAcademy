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
        db.Permission.create({
            StoryId: req.body.StoryId,
            UserId: req.body.UserId,
            permissionVote: req.body.permissionVote,
            permissionWrite: req.body.permissionWrite,
            permissionAdmin: req.body.permissionAdmin
        })
        .then(function(permission){
            // if no error
            res.status(200).json(permission);
        });
    });

    app.put("/api/permission/:id/update", function(req, res){
        console.log(`############################## HERE #################`)
        console.log(req.body);
        let updatedPermissions = req.body;
        db.Permission.update(updatedPermissions, {
            where: {
                id: req.params.id
            }
        })
        .then(function(permission){
            res.status(200).json(permission);
        });
    });

} // End module.exports