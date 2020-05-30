const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const path = require('path'); // this allows us to implement pathing in our project


if(process.env.NODE_ENV !== 'production') require('dotenv').config();

const app = express();// this instantiates for us a new express application remember that express is just a library that allows us to build an API server easily
const port = process.env.PORT || 5000; // our server will be using a different port than our localhost which is using port 3000

app.use(bodyparser.json()); // this automatically handles converting the data we get from an end point to a json value, so we do not need to use .json to convert the data returned to a json format
app.use(bodyparser.urlencoded({extended: true})); // this makes sure that what ever parameter values we pass to our url is url friendly

app.use(cors());//

if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.json(__dirname, 'client/build')));  // express.static middleware function allows us to serve a certain file located in a particular directory we used path to help us get the exact path of the directory which is client/build where all the static build files are located

    app.get('*', function (req, res) {     // using the app.get we are able to serve the static file requested based on the url, it is more of like routing
       res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, error => {
    if (error) throw error;
    console.log('Server running on port ' + port);
})
