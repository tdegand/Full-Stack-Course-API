'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const Sequelize = require("sequelize")
const bodyParser = require('body-parser')
const cors = require('cors');
const db = require('./models');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

//allows for cross origin use
app.use(cors())

// setup morgan which gives us http request logging
app.use(morgan('dev'));

//setup DB instance
//DB connection
const sequelize = new Sequelize('xvq53954zbkv26om', 'pd0vvxs252pcmgui', 'xgpnz1srrpakx03j', {
  host: "fnx6frzmhxw45qcb.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  port: "3306",
  dialect: 'mysql'
})

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// parse application/json
app.use(bodyParser.json())

//import routes
const routes = require("./routes.js");

//uses the routes file to route the user to the proper page
app.use(routes);

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
  db.sequelize.sync();
});
