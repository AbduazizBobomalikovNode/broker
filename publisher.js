var mqtt = require('mqtt');

const jwt = require('jsonwebtoken');

const token = jwt.sign({ clientId: 'your_client_id' }, 'your_secret_key');

var client = mqtt.connect('mqtt://localhost:1883',{
    clientId: 'abdusoft916664315',
    username: 'abdusoft', // This could be any string indicating JWT authentication
    password: token
  });

client.on('connect', function () {
    setInterval(function () {
        client.publish('start', JSON.stringify({mesaage: 'Hello mqtt' + Math.random()*10}));
        console.log('Message Sent');
    }, 5000*5);
});