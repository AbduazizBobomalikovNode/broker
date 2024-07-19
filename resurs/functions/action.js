var db = require('../../db/mongodb');
var generateId = require('../../resurs/functions/getid');
setTimeout(async () => { db = await db }, 100);
async function Action(data) {
    let _data = {
        id:await generateId(db,8,"action"),
        ...data,
        date: (new Date()).toLocaleString().slice(0, 10).replace(',', ''),
        time: (new Date()).toLocaleTimeString().slice(0, 5)
    }
    await (await db).action.addAction(_data);
}

module.exports = Action;