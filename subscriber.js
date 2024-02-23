var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost:1883')

// client.handleAuth

client.on('connect', function () {
    client.subscribe('start');
})
client.on('message', function (topic, message) {
    context = message.toString();
    console.log(context,topic)
    
})
// client.on('packetreceive', function (packet) {
//     console.log(packet)
//     client.subscribe(['asror','g\'ani','leet']);
// })