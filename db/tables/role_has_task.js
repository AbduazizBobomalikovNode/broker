var searchError = require('../../resurs/functions/erors');

function RHT(table) {
    this.getRHTForObj = async (obj) => {
        const result = await table.find(obj, {
            projection: { _id: 0 ,lastModified:0}
        }).toArray();
        return result;
    }
    this.getRHT = async (id) => {
        const result = await table.findOne({ id: id }, { projection: { _id: 0 ,lastModified:0} })
            .then(result => {
                return result;
            })
            .catch(err => {
                console.error(`Role topilmadi: ${err}`)
                return false;
            })
        return result;
    }
    this.getRHTLicence = async (id) => {
        const result = await table.find({ idrole: id }, { projection: { _id: 0 ,lastModified:0} })
            .toArray()
        result = result.map((x) => x.path);
        return result;
    }
    this.getRHTRole = async (id) => {
        const result = await table.find({ idrole: id }, { projection: { _id: 0 ,lastModified:0} })
            .toArray()
        return result;
    }
    this.getRHTTask = async (id) => {
        const result = await table.find({ idtask: id }, { projection: { _id: 0 ,lastModified:0} })
            .toArray()
        return result;
    }
    this.getRHTAll = async () => {
        const result = await table.find({}, { projection: { _id: 0 ,lastModified:0} })
            .sort({ name: 1 }).toArray()
        return result;
    }
    this.addRHT = async (rht) => {
        const result = await table
            .insertOne(rht)
            .catch((err) => {
                let error = { error: [] };
                searchError(err, null, error);
                return error;
            });
        return result;
    }
    this.update = async (id, rht) => {
        const result = await table
            .updateMany({ id: id }, {
                $set: rht,
                $currentDate: { lastModified: true }
            }).catch(err => {
                let error = { error: [] };
                searchError(err, null, error);
                return error;
            });
        const rolex = await this.getRHT(id);
        return rolex;
    }
    this.delete = async (id) => {
        const result = await table.deleteOne({ id: id })
        return result;
    }
}


module.exports = RHT;
/*
getRHT()
getRHTAll()
addRHT()
update()
delete()
*/