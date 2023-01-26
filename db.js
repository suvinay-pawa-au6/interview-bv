const mongoose = require('mongoose');

let cachedDB;

const connectToDatabase = async (uri, user, pass) => {
    if (cachedDB) {
      console.log('=> Using existing database connection');
      return Promise.resolve(cachedDB);
    }
    console.log('=> Using new connection');
    return mongoose
      .connect(uri, {
        useNewUrlParser: true,
        user,
        pass,
      })
      .then((db) => {
        cachedDB = db;
        console.log('Database connected');
      })
      .catch((error) => {
        console.error(error);
        console.log("Unable to connect to database")
      });
  };
  
  module.exports =  {connectToDatabase};