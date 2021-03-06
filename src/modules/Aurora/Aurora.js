const User    = require('../../storage/controllers/User');
const Natural = require('../Natural/Natural');

// External data
const Railways  = require('./external/Railways');

// Components
const Messenger = require('./components/Messenger');

const run = (message) => {

    // Status: Readed
    Messenger.sendStatus('mark_seen', message.sender);

    // If payload
    // Get user information and create new User
    if (message.postback != undefined &&
        message.postback.payload === 'GET_STARTED_PAYLOAD') {

        Messenger.getInformation(message.sender).then((response) => {
            User.modify(response);
        });
    }

    // If message
    // Send to Natural
    if (message.message != undefined) {
        Messenger.sendStatus('typing_on', message.sender).then(() => {
            Natural.run(message.message).then((response) => {
                Messenger.sendMessage({
                    text: 'Sorry, Railways server is not available now. We will give you response as soon as it will be possible!'
                }, message.sender)
            }).catch((error) => {
                Messenger.sendStatus('typing_off', message.sender);

                // if Natural can't create response
                // Send message 'Sorry, I can't understand you'
                Messenger.sendMessage({
                    text: 'Sorry, I can\'t understand you!'
                }, message.sender)
            })
        })
    }
}

module.exports = {
    run
}
