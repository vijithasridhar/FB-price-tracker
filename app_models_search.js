// app/models/search.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SearchSchema   = new Schema({
	name: String
	results: Array

});

module.exports = mongoose.model(‘Search’, SearchSchema);
