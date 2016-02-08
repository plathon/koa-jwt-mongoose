var koa = require('koa');
var route = require('koa-route');
var bodyParser = require('koa-bodyparser');
var cors = require('koa-cors');
var logger = require('koa-logger');
var mongoose = require('mongoose');
var config = require('./config');

mongoose.connect(config.mongo);

var users = require('./resources/users');

var app = koa();

var env = process.env.NODE_ENV || 'development';
if (env != 'test') app.use(logger())

app.use(bodyParser());
app.use(cors());

//users
app.use(route.get('/', users.index));

app.listen(3001);
