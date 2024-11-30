const mongoose = require('mongoose');
const bluebird = require('bluebird');

mongoose.Promise = bluebird;

const connect = () => {
  const url = `${process.env.DATABASE1}${process.env.DATABASE2}=${process.env.DATABASE3}=${process.env.DATABASE4}`;
  const opts = {
    useNewUrlParser: true,
    connectTimeoutMS: 20000,
    useUnifiedTopology: true,
  };

  mongoose.connect(url, opts)
    .then(() => {
      console.log('Successfully connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });
};

module.exports = { connect };