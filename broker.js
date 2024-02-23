var mosca = require('mosca');
var mysql = require('mysql');
const jwt = require('jsonwebtoken');

// var ascoltatore = {
//   //using ascoltatore
//   type: 'mongo',   
//   url: 'mongodb+srv://nodederter:kapalakSAS1D@cluster0.kow1y.mongodb.net/Bots?retryWrites=true&w=majority',
//   pubsubCollection: 'ascoltatori',
//   mongo: {}
// };

var settings = {
  port: 1883,
  // backend: ascoltatore
};

var server = new mosca.Server(settings);



server.on('clientConnected', function (client) {
  console.log('client connected', client.id);
});

server.authorizeSubscribe

var con = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "admin",
  database:"broker"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

server.authorizeSubscribe = function (client, topic, callback) {
  // console.log(client,client.usernmae, topic);
  // Implement your authorization logic here
  // For example, you can check if the client is allowed to subscribe to the given topic
  // You can then call the callback function with true to allow the subscription, or false to deny it
  let isAuthorized = /* Your authorization logic */ true;
  callback(null, isAuthorized);
};


server.authenticate = function(client, username, password, callback) {
  if (username === 'jwt') {
    try {
      const decoded = jwt.verify(password.toString(), 'your_secret_key');
      if (decoded && decoded.clientId) {
        client.user = decoded.clientId; // Store the client ID in the client object for later use
        callback(null, true);
        return;
      }
    } catch (err) {
      console.error('JWT verification failed:', err);
    }
  }
  callback(null, false); // Reject connection if JWT is invalid or missing
};


server.on('subscribed', (packet, client) => {
  if (packet.payload) {
    try {
      var payload = JSON.parse(packet.payload.toString());
      console.log('subscribed JSON data:', payload, packet, client.id);
    } catch (error) {
      if (typeof packet.payload.toString() === "string") {
        console.log(`Mijoz  ${packet.payload.toString()}`, client)
      } else {
        console.error('Error parsing JSON data:', error);
      }
    }
  }
})
// fired when a message is received
server.on('published', function (packet, client) {

  if (packet.payload) {
    var payload;
    try {
      payload = JSON.parse(packet.payload.toString());
      // console.log('Published JSON data:', payload, packet, client.id);

    } catch (error) {
      if (typeof packet.payload.toString() === "string") {
        payload = packet.payload.toString();
        // console.log(`Xabar  ${packet.payload.toString()}`, client)
      } else {
        console.error('Json   xatoligi:', error);
      }
    }
    var sql = "INSERT INTO message  set ?";
    let data = {
      topic: packet.topic,
      message: packet.payload,
      message_id: packet.messageId
    }
    console.log("data : ", data)
    con.query(sql, data, function (err, result) {
      if (err) throw err;
      console.log("1 ta  xabar saqlandi");
    });
  }
});



server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running');
}