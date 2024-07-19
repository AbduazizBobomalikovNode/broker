var searchError = require('../../resurs/functions/erors');

function Role(table) {
    this.getRoleForObj = async (obj) => {
        const result = await table.find(obj, {
            projection: { _id: 0 ,lastModified:0}
        }).toArray();
        return result;
    }
    this.getRole = async (id) => {
        const result = await table.findOne({ id: id }, { projection: { _id: 0 ,lastModified:0}})
            .then(result => {
                return result;
            })
            .catch(err => {
                console.error(`Role topilmadi: ${err}`)
                return false;
            })
        return result;
    }
    this.getRoleAll = async () => {
        const result = await table.find({}, { projection: { _id: 0 ,lastModified:0} })
            .sort({ name: 1 }).toArray()
        return result;
    }
    this.getRoleAllFilter = async (skip,limit) => {
        const result = await table.find({}, { projection: { _id: 0 ,lastModified:0} })
            .sort({ name: 1}).limit(limit).skip(skip).toArray();
        return result;
    };
    this.addRole = async (role) => {
        const result = await table
            .insertOne(role)
            .catch((err) => {
                let error = { error: [] };
                searchError(err, null, error);
                return error;
            });
        return result;
    }
    this.update = async (id, role) => {
        const result = await table
            .updateMany({ id: id }, {
                $set: role,
                $currentDate: { lastModified: true }
            }).catch(err => {
                let error = { error: [] };
                searchError(err, null, error);
                return error;
            });
        const rolex = await this.getRole(id);
        return rolex;
    }
    this.delete = async (id) => {
        const result = await table.deleteOne({ id: id })
        return result;
    }
}


module.exports = Role;
/*
getRole()
getRoleAll()
addRole()
update()
delete()
*/