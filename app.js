var express = require('express'),
app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/companies/add', require('./routes/companies'));


if(!module.parent){
   app.listen(3000);
   console.log('App is now listening');
}

module.exports = app;
