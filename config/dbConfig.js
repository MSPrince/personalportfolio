const mongoose = require("mongoose");
mongoose.connect(process.env.mongo_url)

  const connection = mongoose.connection;

  connection.on('error', () => {
    console.log('error connecting to database');
  });
  connection.on('connected', () => {
     console.log('mongodb connection successfull');
  })

module.exports = connection;