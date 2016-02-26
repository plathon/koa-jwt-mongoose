var config    = require('../config');
var ArticleModel = require('../models/articles');

/**
* list articles
**/

module.exports.index = function *() {
  try {

    var reqQuery = this.query;
    var articles = yield ArticleModel
    .find(reqQuery.search ? { name: reqQuery.search } : null)
    .skip(reqQuery.offset || 0)
    .limit(reqQuery.limit || 0)
    .sort({_id: -1})
    .exec(function (err, campaigns) {
      if (err) this.throw( 'cannot retrieve articles.' );
    });
    this.body = articles;

  } catch (err) {
    this.status = err.status || 500;
    this.body = err.message;
    this.app.emit('error', err, this);
  }
}

/**
* create article
**/

module.exports.create = function *() {
  try {

    var reqBody = this.request.body;
    var article = yield ArticleModel.create(reqBody);
    this.body = { msg: 'Article was successfully created.' }

  } catch (err) {
    this.status = err.status || 500;
    this.body = err.message;
    this.app.emit('error', err, this);
  }
}
