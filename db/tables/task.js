var searchError = require('../../resurs/functions/erors');

function Task(table) {
    this.getTaskObj = async (obj) => {
        const result = await table.find(obj, {
            projection: { _id: 0 ,lastModified:0}
        }).sort({ name: 1}).toArray();
        return result;
    };
    this.getTask = async (id) => {
        const result = await table.findOne({ id: id }, { projection: { _id: 0 ,lastModified:0} })
            .then(result => {
                return result;
            })
            .catch(err => {
                console.error(`Task topilmadi: ${err}`)
                return false;
            })
        return result;
    };
    this.getTaskUser = async (id) => {
        const result = await table.find({ iduser: id }, { projection: { _id: 0 ,lastModified:0} })
            .sort({ name: 1}).toArray()
        return result;
    };
    this.getTaskDevice = async (id) => {
        const result = await table.find({ iddevice: id }, { projection: { _id: 0 ,lastModified:0} })
            .sort({ name: 1}).toArray()
        return result;
    };
    
    this.getTaskAll = async () => {
        const result = await table.find({}, { projection: { _id: 0 ,lastModified:0} })
            .sort({ name: 1}).toArray()
        return result;
    };
    this.getTaskAllFilter = async (skip,limit) => {
        const result = await table.find({}, { projection: { _id: 0 ,lastModified:0} })
            .sort({ name: 1}).limit(limit).skip(skip).toArray();
        return result;
    };
    this.addTask = async (task) => {
        const result = await table
            .insertOne(task)
            .catch((err) => {
                let error = { error: [] };
                searchError(err, null, error);
                return error;
            });
        return result;
    };
    this.update = async (id, task) => {
        const result = await table
            .updateMany({ id: id }, {
                $set: task,
                $currentDate: { lastModified: true }
            }).catch(err => {
                let error = { error: [] };
                searchError(err, null, error);
                return error;
            });
        const task_demo = await this.getTask(id);
        return task_demo;
    };
    this.delete = async (id) => {
        const result = await table.deleteOne({ id: id })
        return result;
    }
}

module.exports = Task;
/*
getTask()
getTaskUser()
getTaskDevice()
getTaskAll()
addTask()
update()
delete()
*/