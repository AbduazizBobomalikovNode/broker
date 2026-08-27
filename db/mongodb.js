const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.URI_MONGO;
if (!uri) throw new Error('URI_MONGO environment o\'zgaruvchisi berilmagan');;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
var db = null;
const role = require("./tables/role");
const topic = require("./tables/topic");
const user = require("./tables/user");
const task = require("./tables/task");
const RHT = require("./tables/role_has_task");
const DHT = require("./tables/device_has_topic");
const device = require("./tables/device");
// const file = require("./tables/file");
const action = require("./tables/action");
const Chek = require('../resurs/functions/getid');
// const statik = require("./tables/static");

class Db {
    constructor() {
        this.buffer = (async function () {
            await client.connect();
            db = await client.db('broker');
            console.log("bazaga ulanish hosil qilindi");
            // await sxema(db);
            return {
                role: new role(db.collection("role")),
                user: new user(db.collection("user")),
                task: new task(db.collection("task")), 
                RHT: new RHT(db.collection("role_has_task")),
                DHT: new DHT(db.collection("device_has_topic")),
                device: new device(db.collection("device")),
                topic: new topic(db.collection("topic")),
                action: new action(db.collection("action")),
                chek_id: async function(table, id){
                    try {
                        const result = await db.collection(table).findOne({ id: id }, { projection: { _id: 0 } });
                        return result ? true : false;
                    } catch (err) {
                        return false;
                    }
                },
                // static: new statik(db.collection("static")),
                close: function () {
                    client.close();
                }
            }
        })();
    }
    async Main() {
        return this.buffer;
    }
}

module.exports = new Db().Main();


