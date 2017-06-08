var express = require('../server.js').express;
var router = express.Router();

var chat = require('../controllers/chatController.js');

router.get('/hello', chat.add);

module.exports = router;