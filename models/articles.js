var mongoose   = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema     = mongoose.Schema;

/**
* User Database Schema
**/

var ArticleSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true }
});

/**
* Timestamps plugin
**/

ArticleSchema.plugin(timestamps);

/**
* Create and exports model
**/

var ArticleModel = mongoose.model('Article', ArticleSchema);
module.exports = ArticleModel;
