var socket = io();

socket
    .on('connect', function () {
        console.log('connect');
        connected = true;
        $inputMessage.prop('disabled', false)
    })
    .on('reconnecting', function () {
        console.log('Reconnecting. Wait...')
        connected = false;
    })
    .on('disconnect', function () {
        console.log('Disconnect');
        $inputMessage.prop('disabled', true)
        connected = false;
    })
    .on('user joined', function (username) {
        console.log('user ' + username + ' joined');
        userJoined(username);
    })
    .on('user typing', function (username) {
        userTyping(username)
    })
    .on('user stop typing', function () {
        clearTyping();
    })
    .on('receive message', function (username, message) {
        addMessage(username, message);
    })

var $window = $(window);
var $messages = $('.messages__list');
var $inputMessage = $('.input-message');
var $inputUsername = $('.input-username');
var $chat = $('.chat');
var $login = $('.login');

var messageClass = {
    message: 'message',
    messageNickname: 'message__nickname',
    messageText: 'message__text'
}

var username;
var typing = false;
var connected = false;
var typingUsers = [];

var usernameLength = 15;
var TYPING_TIMER_LENGTH = 500;

function checkLength(username, usernameLength) {
    return username.length <= usernameLength && usernameLength > 0;
}

function setUsername(input, usernameLength) {
    var value = input.val().trim();

    if (checkLength(value, usernameLength)) username = value;
}

function addTyping(username) {
    if (username) typingUsers.push(username);

    var typingUsersCount = typingUsers.length;

    if (typingUsers.length >= 4) {
        $('.typing-users').val() = typingUsersCount + ' typings...'
    } else if (typingUsersCount < 4 && typingUsersCount > 0) {
        $('.typing-users').val() += '<span>' + username + '</span>'
    }
}

function clearTyping(username) {
    var indexUser = typingUsers.indexOf(username);

    if (indexUser >= 0) {
        delete users[indexUser];
        $('.typing-users').filter(function (elem) {
            return elem.val() == !username;
        })
    }
}

function userJoined(username) {
    var $userElem = $('<li/>', {
        text: username + ' joined'
    })

    $messages.append($userElem);
}

function joinChat(username) {
    socket.emit('join to chat', username);
    $login.remove();
    $chat.show(300);
}

function addMessage(username, message) {
    var $messageElem = $('<li/>')

    var $usernameElem = $('<span/>', {
        class: 'message__nickname',
        text: username
    })

    var $textElem = $('<span/>', {
        class: 'message__text',
        text: message
    })

    $messageElem.append($usernameElem).append($messageElem);

    $messages.append($messageElem);

    $inputMessage.val('');
}

function selfTyping(username) {
    socket.emit('user typing', username)
}

function stopTyping() {
    socket.emit('stop typing')
    typing = false;
}

$inputUsername.on('keypress', function (e) {
    if (e.which === 13) {
        setUsername($inputUsername, usernameLength);
        if (username) {
            joinChat(username);
            $inputUsername.off('keypress');
        }
    }
})

$inputMessage.on('keypress', function (e) {
    if (e.which === 13) {
        var message = $inputMessage.val().trim();
        if (connected)
            if (username && message) {
                stopTyping();
                addMessage(username, message);
                socket.emit('send message', username, message);
    }
});