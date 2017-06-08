var http = require('http'),
    express = require('express'),
    path = require('path'),
    mongoose = require('mongoose');
    app = express(),
    server = http.createServer(app);

module.exports.express = express;

mongoose.connect('mongodb://localhost/chat');

var db = mongoose.connection;

var chat = require('./models/chat');

var port = process.env.port || 3000;

app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));

app.use('/1', function (req, res, next) {
    res.render('index');
});

app.use('/', require('./routes/index'));

app.use(function (req, res) {
    res.status(404).send('Page not found');
})

server.listen(port, function () {
    console.log(`Server listen port: ${port}`)
})

require('./socket/socket.js')(server);