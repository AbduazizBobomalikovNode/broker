var mosca = require('mosca');
const jwt = require('jsonwebtoken');
const jwt_my_key = process.env.JWT_MY_KEY;
var db = require('./db/mongodb');
const bcrypt = require('bcrypt');
var Datastore = require('nedb');
var path = require('path');

// Nedb ma'lumotlar bazasini yaratish
var messagesDb = new Datastore({ filename: path.join(__dirname, '/nedb/mqtt_messages.db'), autoload: true });
var subscriptionsDb = new Datastore({ filename: path.join(__dirname, '/nedb/mqtt_subscriptions.db'), autoload: true });

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // Handle the error, e.g., restart the server, log the error, etc.
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
  // Handle the error, e.g., restart the server, log the error, etc.
});

var settings = {
  port: 1883,
  http: {
    port: 7000,
    bundle: true,
    static: './'
  },
  host: '0.0.0.0'
};

let devices = ['device1-x123', 'device1-x321'];
let devicesPublish = { 'device1-x123': ["all"], 'device1-x321': ["all"] };
let devicesSubscribe = { 'device1-x123': ["all"], 'device1-x321': ["all"] };

var server = new mosca.Server(settings);

server.on('clientConnected', function (client) {
  console.log('client connected', client.id);
});
server.on('clientDisconnected', function (client) {
  console.log('Mijoz uzildi:', client.id);

  // Mijoz uzilganida, obunalarni o'chirish
  subscriptionsDb.remove({ clientId: client.id }, { multi: true }, function (err, numRemoved) {
    if (err) {
      console.error('Obunalarni o\'chirishda xato:', err);
    } else {
      console.log(numRemoved, 'ta obuna o\'chirildi');
    }
  });
});

server.authorizeSubscribe = async function (client, topic, callback) {
  let dbTopic = topic;
  console.error(`authorizeSubscribe :`, client.id, topic);

  if (devices.includes(client.id)) {
    send_save_data_for_user(dbTopic, client);
    return callback(null, true);
  }
  if (!client.id.startsWith("user-")) {
    if (topic.startsWith("/index/")) {
      topic = topic.substring(16);
    }
    if (topic.startsWith("/index/") && topic.split('/').length >= 4) {
      console.log("if (topic.startsWith('/index/') && topic.split('/').length >= 4) {");
      _userId_topic = topic.split('/')[2];
      topic = topic.substring(7 + _userId_topic.length + 1);
      _userId_topic = parseInt(_userId_topic);
      if (typeof _userId_topic == "number") {
        console.log("server.authorizeSubscribe :", _userId_topic, __real_topic);
      }
    }
    let devise = await (await db).device.getDeviceForObj({ key: client.id });
    let topics = await (await db).topic.getTopicForObj({ name: topic });

    console.log("authorizeSubscribe device :", devise, "authorizeSubscribe topics :", topics, "topic :", topic, "client.id :", client.id);

    if (devise.length > 0 && topics.length > 0) {
      let DHT = await (await db).DHT.getDHTForObj({ iddevice: devise[0].id, idtopic: topics[0].id });
      if (DHT.length > 0) {
        if (DHT[0].subscribed) {
          send_save_data_for_user(dbTopic, client)
        }
        return callback(null, DHT[0].subscribed);
      }
      return callback(null, false);
    }
  } else {
    let isAuthorized = devicesSubscribe[client.id];
    if (isAuthorized) {
      isAuthorized = devicesSubscribe[client.id].includes("all");
      send_save_data_for_user(dbTopic, client);
    } else {
      isAuthorized = false;
    }
    callback(null, isAuthorized);
  }

  // Mijoz obuna bo'lganida, bazadagi xabarlarni qayta yuborish

};

function send_save_data_for_user(topic, client) {
  console.log(`send_save_data_for_user  is  worked : ${topic}`)
  messagesDb.find({ topic: topic }, async function (err, messages) {
    if (!err && messages) {
      console.log("messagesDb :", messages)
      messages.forEach(function (message) {
        var packet = {
          topic: message.topic,
          payload: message.payload,
          qos: message.qos,
          retain: message.retain
        };
        server.publish(packet, client, function () {
          console.log('Xabar qayta yuborildi:', message);
        });
      });

      // Mavzuga obuna bo'linganligi haqida bazaga yozish
      if (topic) {
        if (topic.startsWith("/index/") && topic.split('/').length >= 4) {

          subscriptionsDb.insert({ topic: topic, clientId: client.id }, function (err, newSub) {
            if (err) {
              console.error('Obunani saqlashda xato:', err);
            } else {
              console.log('Obuna saqlandi:', newSub);
            }
          });
        }
      }

      // Mavzuga tegishli barcha xabarlarni bazadan o'chirish
      messagesDb.remove({ topic: topic }, { multi: true }, function (err, numRemoved) {
        if (err) {
          console.error('Xabarlarni o\'chirishda xato:', err);
        } else {
          console.log(numRemoved, 'ta xabar o\'chirildi');
        }
      });
    }
  });
}

server.authorizePublish = async function (client, topic, payload, callback) {
  console.log(`authorizePublish :`, client.id, topic, payload);

  if (devices.includes(client.id)) {
    return callback(null, true);
  }
  if (!client.id.startsWith("user-")) {
    let devise = await (await db).device.getDeviceForObj({ key: client.id });
    let topics = await (await db).topic.getTopicForObj({ name: topic });

    console.log("authorizePublish device :", devise, "authorizePublish topics :", topics);

    if (devise.length > 0 && topics.length > 0) {
      let DHT = await (await db).DHT.getDHTForObj({ iddevice: devise[0].id, idtopic: topics[0].id });
      if (DHT.length > 0) {
        return callback(null, DHT[0].published);
      }
      return callback(null, false);
    }
  } else {
    let isAuthorized = devicesPublish[client.id];
    if (isAuthorized) {
      isAuthorized = devicesPublish[client.id].includes("all");
    } else {
      isAuthorized = false;
    }
    callback(null, isAuthorized);
  }
};

server.on('message', function (topic, message) {
  let context = message.toString();
  console.log('Received message:', context, 'from topic:', topic);
});

server.on('subscribed', (packet, client) => {
  try {
    console.log("subscribed data : ", packet.payload, client.id);
    if (packet.payload) {
      console.log("subscribed data : ", packet.payload.toString());
    }
  } catch (error) {
    console.log("error :", error.message);
  }
});

let oldTopic = "";
server.on('published', async function (packet, client) {
  let iduser = null;
  console.log(packet);
  try {
    if (!client || !client.id) {
      throw new Error("client idsisiz amalga oshmaydi");
    }
    if (client && client.id.startsWith("user-")) {
      iduser = parseInt(client.id.substring(5));
    } else if (client && client.id) {
      let devise = await (await db).device.getDeviceForObj({ key: client.id });
      if (devise && devise.length > 0) {
        iduser = devise[0].iduser;
      } else {
        console.error('Devise obyekti topilmadi yoki bo\'sh');
      }
    } else {
      console.error('Client yoki client.id mavjud emas');
    }

    if (iduser !== null && oldTopic != packet.topic) {
      oldTopic = `/index/${iduser}/${packet.topic}`;
      server.publish({
        topic: `/index/${iduser}/${packet.topic}`,
        payload: packet.payload,
        qos: packet.qos,
        retain: packet.retain
      }, client);
    } else {
      console.error('iduser aniqlanmadi, publish amali bajarilmadi');
    }
  } catch (error) {
    console.error('Xatolik:', error.message);
    return;
  }
  if (packet.topic) {
    if (packet.topic.startsWith("/index/") && packet.topic.split('/').length >= 4) {
      // Obuna bo'lmagan mavzularga xabarni saqlash
      subscriptionsDb.findOne({ topic: packet.topic }, async function (err, subscription) {
        if (!subscription) {
          let elm = await (await db).topic.getTopicForObj({ topic: packet.topic });
          if (elm.length > 0) {
            if (elm.this_saved) {
              var message = {
                topic: packet.topic,
                payload: packet.payload.toString(),
                qos: packet.qos,
                retain: packet.retain,
                timestamp: new Date()
              };

              messagesDb.insert(message, function (err, newDoc) {
                if (err) {
                  console.error('Xabar saqlashda xato:', err);
                } else {
                  console.log('Yangi xabar saqlandi:', newDoc);
                }
              });
            }
          }

        }
      });
    }
  }


});

server.authenticate = async function (client, username, password, callback) {
  console.log(client.id, username, password.toString());
  try {
    const user = jwt.verify(password.toString(), jwt_my_key);
    console.log(client.id, username, user);
    if (client.id.startsWith("user-")) {
      let password = user.password;
      let user_id = Number(user.id);
      let dbuser = await (await db).user.getUser(user_id);
      console.log(dbuser);
      if (dbuser) {
        let pas_flag = password == dbuser.password || await bcrypt.compare(password, dbuser.password);

        devicesPublish[client.id] = ["all"];
        devicesSubscribe[client.id] = ["all"];
        return callback(null, pas_flag);
      }
    } else {
      let devise = await (await db).device.getDeviceForObj({ key: client.id, iduser: user.id });
      if (devise.length > 0) {
        return callback(null, true);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
  callback(null, devices.includes(client.id));
};

server.on('ready', setup);

function setup() {
  console.log('Mosca server is up and running');
}
