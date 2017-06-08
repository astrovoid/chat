var mongoose = require('mongoose');

var roomsScheme = mongoose.Schema({
    name: String,
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})