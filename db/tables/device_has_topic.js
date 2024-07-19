var searchError = require('../../resurs/functions/erors');

function DHT(table) {
    this.getDHTForObj = async (obj) => {
        const result = await table.find(obj, {
            projection: { _id: 0 ,lastModified:0}
        }).toArray();
        return result;
    }
    this.getDHT = async (id) => {
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
    // this.getDHTLicence = async (id) => {
    //     const result = await table.find({ idrole: id }, { projection: { _id: 0 ,lastModified:0} })
    //         .toArray()
    //     result = result.map((x) => x.path);
    //     return result;
    // }
    this.getDHTdevice = async (id) => {
        const result = await table.find({ iddevice: id }, { projection: { _id: 0 ,lastModified:0} })
            .toArray()
        return result;
    }
    this.getDHTTopic = async (id) => {
        const result = await table.find({ idtopic: id }, { projection: { _id: 0 ,lastModified:0} })
            .toArray()
        return result;
    }
    this.getDHTAll = async () => {
        const result = await table.find({}, { projection: { _id: 0 ,lastModified:0} })
            .sort({ name: 1 }).toArray()
        return result;
    }
    this.addDHT = async (dht) => {
        const result = await table
            .insertOne(dht)
            .catch((err) => {
                let error = { error: [] };
                searchError(err, null, error);
                return error;
            });
        return result;
    }
    this.update = async (id, dht) => {
        const result = await table
            .updateMany({ id: id }, {
                $set: dht,
                $currentDate: { lastModified: true }
            }).catch(err => {
                let error = { error: [] };
                searchError(err, null, error);
                return error;
            });
        const rolex = await this.getDHT(id);
        return rolex;
    }
    this.delete = async (id) => {
        const result = await table.deleteOne({ id: id })
        return result;
    }
    this.clear = async () => {
        const result = await table.deleteMany({
            published: false,
            subscribed:  false
         });
        return result;
    }
}


module.exports = DHT;
/*
getDHT()
getDHTAll()
addDHT()
update()
delete()
*/