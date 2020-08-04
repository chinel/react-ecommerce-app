const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const path = require('path'); // this allows us to implement pathing in our project
const compression = require('compression');
const enforce = require('express-sslify');


if(process.env.NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);//using the require function to import the stripe library returns a function that expects the first parameter to be the stripe api secret key// using the process.env.STRIPE_SECRET KEY is possible because of the line above where we had to require the dotenv

const app = express();// this instantiates for us a new express application remember that express is just a library that allows us to build an API server easily
const port = process.env.PORT || 5000; // our server will be using a different port than our localhost which is using port 3000

app.use(compression());
app.use(bodyparser.json()); // this automatically handles converting the data we get from an end point to a json value, so we do not need to use .json to convert the data returned to a json format
app.use(bodyparser.urlencoded({extended: true})); // this makes sure that what ever parameter values we pass to our url is url friendly

app.use(cors());//
app.use(enforce.HTTPS({trustProtoHeader: true}));

if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'client/build')));  // express.static middleware function allows us to serve a certain file located in a particular directory we used path to help us get the exact path of the directory which is client/build where all the static build files are located

    app.get('*', function (req, res) {     // using the app.get we are able to serve the static file requested based on the url, it is more of like routing
       res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, error => {
    if (error) throw error;
    console.log('Server running on port ' + port);
});


app.get('/service-worker.js',(req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'service-worker.js'))
});


app.post('/payment', (req, res) => {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd'
    };

    //this section creates our stripe charge using the parameters sent from the request and then it returns a status and message whether success or error
    stripe.charges.create(body, (stripeErr, stripeRes) => {
    if(stripeErr){
        res.status(500).send({error: stripeErr});
    }else{
        res.status(200).send({success: stripeRes});
    }
    })


});
