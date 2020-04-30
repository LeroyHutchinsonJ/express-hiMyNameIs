const express = require('express');
const routes = require('./routes/index');
const app = express();

//Import the path module
const path = require('path');
//I need this import to use the data from posts requests
const bodyParser = require('body-parser');

//This tells the app to use the public directory for static assets, css and such
app.use(express.static(path.join(__dirname, 'public')));

//This tells the app that the views directory is to be used for rendering templates
app.set('views', path.join(__dirname, 'views'));

//This tells the app which views engine we should use
app.set('view engine', 'hjs');


//This gives us the ability to extract data from our form when the request is sent, its middleware
app.use(bodyParser.urlencoded({extended: false}));

//This middleware types some nonsense to the console before every request along with a timestamp in the request
app.use((req,res,next) =>{
    console.log("Middleware Firing Up!");
    req.timestamp = new Date().toString();
    next();
});

//Gotta remember to use the middleware before using the routes

//This should tell the app to use the route that we have imported
app.use('/', routes);

app.listen(5000);
console.log('Server running at http://localhost:5000/');