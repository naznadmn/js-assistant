const axios = require('axios');

// Retrieve information
const getInformation = (sender) => {
    return new Promise((resolve, reject) => {
        axios.get(process.env.GRAPH_API + sender.id, {
            params: {
                fields: [
                    'id',
                    'first_name',
                    'last_name',
                    'gender'
                ].join(','),
                access_token: process.env.ACCESS_TOKEN
            }
        }).then((response) => {
            console.info('MESSENGER: getInformation method successfully ended');

            resolve(response);
        }).catch((error) => {
            console.error('MESSENGER: getInformation method failed with status %s', error.response.status);

            reject(error);
        })
    })
}

// Send Status of Sender
const sendStatus = (status, recipient) => {
    return new Promise((resolve, reject) => {
        axios.post(process.env.GRAPH_API + 'me/messages?access_token=' + process.env.ACCESS_TOKEN, {
            recipient     : recipient,
            sender_action : status,
        }).then((response) => {
            resolve();
        }).catch((error) => {
            console.error('MESSENGER: sendStatus method failed with status %s', error.response.status);

            reject(error);
        })
    })
}

module.exports = {
    sendStatus,
    getInformation
}
