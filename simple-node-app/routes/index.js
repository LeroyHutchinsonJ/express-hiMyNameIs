//This imports the express framework
const express = require('express');

//This is an express object called the router, I need to use it if I am exporting routes
const router = express.Router();

//This sends some random text to the default homepage
//The home page
/*
router.get('/', (req,res, next) => {
    res.send("Random stuff United!");
});
*/

var user = null;
const profiles = [
    {name:'Mike', city: 'New Mexico', profession: 'Robotics Engineer'},
    {name:'Cindy', city: 'San Francisco'},
    {name:'Kevin', city: 'New York', profession: 'Game Developer'}];

router.get( '/', (req, res, next) =>{
    var data = {
        name : "Index",
        date : req.timestamp,
        profiles: profiles,
        user : user
    };
    //For render we pass in the name of the template we are uploading, along with the data we are injecting
    res.render('index', data);
});

//This is the post request handler, this accepts post data from a form
router.post('/join',(req, res, next) =>{

    //Body parser allows me to do this
    const body = req.body;
    profiles.push(body);

    //This will redirect the user to the homepage once again
    res.redirect('/');

});

//This is the json route
router.get('/json', (req, res, next) =>{
    var obj = {Sheila:"Girl", John:"Boy"};
    var html = "<html><body style = color:red>Check me out</body></html>"
    res.send(html);
});


//Check the /query route

router.get('/query', (req, res, next) =>{

    //This req.query function call will allow us to get data from the router url
    const query = req.query;
    //Send it out as json
    res.json(query);
});


//The names followed by ':' are object names
router.get('/params/:name/:location/:occupation' ,(req, res, next) =>{
//To access the params, I must use the params function
    const params = req.params;
    res.json({params:params});
});

router.get('/login', (req, res, next) =>{
    res.render("login", null);
});


//Make a request handler for the button
router.post('/retry', (req, res, next) =>{
    res.render('login.hjs', null);
});

router.post('/login', (req,res,next) =>{
    const password = req.body.password;
    const username = req.body.username;

    //If the password is 123 login should be successful
        if(password === "123")
        {
            user = {username:username};
            res.redirect('/');
            return
        }
        else
        {
            const data = {message: "Please check your username and/or password!"};

            res.render('error.hjs', data);
        }
});

//Export this file so that other files may use it
module.exports = router;