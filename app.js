var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors")
var AbilityUpagradesRoutes = require('./routes/upgrade_abilitiy');

var app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use('/ability-upgrades', AbilityUpagradesRoutes);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



app.listen(8000, () => {
  console.log(`Example app listening at http://localhost:${8000}`)
})
