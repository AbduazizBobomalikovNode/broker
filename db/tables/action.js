var searchError = require('../../resurs/functions/erors');

function Action(table) {
    this.getActionObj = async (obj) => {
        const result = await table.find(obj, {
            projection: { _id: 0 }
        }).sort({ date: -1,time: -1}).toArray();
        return result;
    };
    this.getAction = async (id) => {
        const result = await table.findOne({ id: id }, { projection: { _id: 0 } })
            .then(result => {
                return result;
            })
            .catch(err => {
                console.error(`holat topilmadi: ${err}`)
                return false;
            })
        return result;
    };
    this.getActionAll = async () => {
        const result = await table.find({date: (new Date()).toLocaleString().slice(0, 10).replace(',', '')}, { projection: { _id: 0 } })
            .sort({ date: -1,time: -1}).toArray()
        return result;
    };
    this.addAction = async (data) => {
        const result = await table
            .insertOne(data)
            .catch((err) => {
                let error = { error: [] };
                searchError(err, null, error);
                return error;
            });
        return result;
    };
    this.update = async (id, data) => {
        const result = await table
            .updateMany({ id: id }, {
                $set: data,
                $currentDate: { lastModified: true }
            }).catch(err => {
                let error = { error: [] };
                searchError(err, null, error);
                return error;
            });
        const history_demo = await this.getAction(id);
        return history_demo;
    };
    this.delete = async (id) => {
        const result = await table.deleteOne({ id: id })
        return result;
    }
}

module.exports = Action;
/*
getAction()
getActionAll()
addAction()
update()
delete()
*/