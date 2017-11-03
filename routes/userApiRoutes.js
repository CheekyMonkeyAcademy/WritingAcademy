// POST--CREATE
// GET--READ
// PUT--UPDATE
// DELETE--DELETE

//THESE are unknowns

//Create a User *********
//WHERE TO CREATE ADMIN*******

app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
);