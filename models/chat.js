var mongoose = require('mongoose');

var chatSchema = mongoose.Schema({
    username: String,
    text: String
});

chatSchema.statics.findByName = function(username, cb) {
    return this.find({
        username: username
    }, cb);
}

chatSchema.methods.addMessage = function(username, message, cb) {
    
};

var chat = mongoose.model('Chat', chatSchema);

module.exports = chat;