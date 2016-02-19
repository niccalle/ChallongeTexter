var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Player = require('./player');

var BracketSchema = new Schema({
	bracketName: {type: String},
	matchesPinged: [{type: String}],
	numbers: [Player]
});

module.exports = mongoose.model('Bracket', BracketSchema);