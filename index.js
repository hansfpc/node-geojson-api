const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = process.env.PORT || 4000;

// Set up Express app
const app = express();
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(bodyParser.json());

// Connect MongoDB
mongoose.connect('mongodb://localhost/developers');
mongoose.Promise = global.Promise;

// Initialize routes
app.use('/api', require('./routes/api'));

// Error handling middleware
app.use((err, req, res, next)=>{
  //console.log(err)
  res.status(422).send({ error: err._message })
});


// Listen for requests
app.listen(port, () => {
  console.log('Now listening for requests');
});