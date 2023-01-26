const express = require('express');
const cors = require('cors');
const {connectToDatabase} = require("./db")
const serverless = require('serverless-http');
const app = express();
const httpStatus = require('http-status');
const routes = require('./src/routes/v1');

require('dotenv').config()
const port = process.env.port || 3000;
const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL } = process.env;

connectToDatabase(MONGODB_URL, MONGODB_USER, MONGODB_PASSWORD);
/*
Using a middle ware to check for db connection because we are going to deploy 
the app to aws lambda
*/
app.use((req, res, next) => {
    connectToDatabase(MONGODB_URL, MONGODB_USER, MONGODB_PASSWORD)
      .then(() => next())
      .catch((error) => {
        throw error;
      });
  });

// Parsing JSON request body and Urlencoded request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Enabling Cors to prevent CRSF attacks
app.use(cors());
app.options('*', cors());


// Using a rate limiter on production to prevent attacks
if (process.env.ENVIRONMENT === 'production') {
    app.use('/v1/auth', authLimiter);
}
  
app.use('/v1', routes);


// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    res.status(httpStatus.NOT_FOUND).json({
        success : false,
        message : "Unknown Route"
    })
  });

// Handles Internal errors 
app.use((err, req, res, next) => {
    if (err) {
    return res.status(err.statusCode || 500).json({
        success : false,
        message : err.message
    });  
  }
  next() 
}); 

let server;
  
server = app.listen(port, () => {
    console.warn(`Listening to port ${port}`);
});

module.exports.handler = serverless(server);

 