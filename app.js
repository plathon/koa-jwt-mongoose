var koa = require('koa');
var route = require('koa-route');
var bodyParser = require('koa-bodyparser');
var cors = require('koa-cors');
var logger = require('koa-logger');

var app = koa();

app.use(logger());
app.use(bodyParser());
app.use(cors());

app.use(function *(){
  this.body = 'Hello World';
});

app.listen(3000);
