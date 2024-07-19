var searchError = require('../../resurs/functions/erors');

function Device(table) {
    this.getDeviceForObj = async (obj) => {
        const result = await table.find(obj, {
            projection: { _id: 0 ,lastModified:0}
        }).toArray();
        return result;
    }
    this.getDevice = async (id) => {
        const result = await table.findOne({ id: id }, { projection: { _id: 0 ,lastModified:0}})
            .then(result => {
                return result;
            })
            .catch(err => {
                console.error(`Device topilmadi: ${err}`)
                return false;
            })
        return result;
    }
    this.getDeviceAll = async () => {
        const result = await table.find({}, { projection: { _id: 0 ,lastModified:0} })
            .sort({ name: 1 }).toArray()
        return result;
    }
    this.getDeviceAllFilter = async (skip,limit,find_user) => {
        const result = await table.find({iduser:find_user}, { projection: { _id: 0 ,lastModified:0} })
            .sort({ name: 1}).limit(limit).skip(skip).toArray();
        return result;
    };
    this.addDevice = async (device) => {
        const result = await table
            .insertOne(device)
            .catch((err) => {
                let error = { error: [] };
                searchError(err, null, error);
                return error;
            });
        return result;
    }
    this.update = async (id, device) => {
        const result = await table
            .updateMany({ id: id }, {
                $set: device,
                $currentDate: { lastModified: true }
            }).catch(err => {
                let error = { error: [] };
                searchError(err, null, error);
                return error;
            });
        const devicex = await this.getDevice(id);
        return devicex;
    }
    this.delete = async (id) => {
        const result = await table.deleteOne({ id: id })
        return result;
    }
}


module.exports = Device;
/*
getDevice()
getDeviceAll()
addDevice()
update()
delete()
*/