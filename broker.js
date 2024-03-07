var mosca = require('mosca');
var mysql = require('mysql');
const jwt = require('jsonwebtoken');

var settings = {
  port: 1883,
  interfaces: [
    { type: "mqtt", port: 1883 },
    { type: "tcp", port: 1883 } // TCP protokoli uchun moslashtirilgan
  ],
};

var server = new mosca.Server(settings);

server.on('clientConnected', function (client) {
  console.log('Client connected:', client.id);
});

// Boshqa funksiyalar va tadbirlarni qo'shing

server.on('ready', setup);

function setup() {
  console.log('Mosca server is up and running');
}
