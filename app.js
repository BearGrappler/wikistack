var express = require('express');
var app = express();
var morgan = require('morgan');
// var usersRouter = require('./routes/users.js');
var router = require('./routes/index.js');
var bodyParser = require('body-parser');
var swig = require('swig');
var models = require('./models');


// point res.render to the proper directory
app.set('views', __dirname + '/views');
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files
// have it use swig to do so
app.engine('html', swig.renderFile);
// turn of swig's caching
swig.setDefaults({cache: false});

app.use(morgan('dev'));

var filePath = __dirname + '/public/';

console.log(filePath);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(filePath));

app.use(router);


// ... other stuff

models.User.sync({force: true})
.then(function () {
    console.log('hitting this then');
    console.log(models.Page);
    return models.Page.sync({force: true})
})
.then(function () {
    console.log('hitting the next then');
    app.listen(3000, function () {
        console.log('Server is listening on port 5432!');
    });
})
.catch(console.error);
