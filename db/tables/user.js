var searchError = require('../../resurs/functions/erors');

function User(table) {
    this.getUser = async (id) => {
        const result = await table.findOne({ id: id }, { projection: { _id: 0, lastModified: 0 } })
            .then(resultin => {
                return resultin;
            })
            .catch(err => {
                console.error(`Foydalanuvchi topilmadi: ${err}`)
                return false;
            });
        return result;
    }
    this.getUserAllFilter = async (skip, limit, role_filter) => {
        if (role_filter) {
            const result = await table.find({idrole:role_filter}, { projection: { _id: 0, lastModified: 0 } })
                .sort({ name: 1 }).limit(limit).skip(skip).toArray();
            return result;
        }
        const result = await table.find({}, { projection: { _id: 0, lastModified: 0 } })
            .sort({ name: 1 }).limit(limit).skip(skip).toArray();
        return result;
    };
    this.getUserForObj = async (obj) => {
        const result = await table.find(obj, {
            projection: { _id: 0, lastModified: 0 }
        }).toArray();
        return result;
    }
    // this.getUserDevice = async (id) => {
    //     const result = await table.find({ iddevice: id }, { projection: { _id: 0 ,lastModified:0} })
    //         .toArray()
    //     return result;
    // }

    this.getUserRole = async (id) => {
        const result = await table.find({ idrole: id }, { projection: { _id: 0, lastModified: 0 } })
            .toArray()
        return result;
    }

    this.getUserAll = async () => {
        const result = await table.find({}, { projection: { _id: 0, lastModified: 0 } })
            .toArray()
        return result;
    }
    this.addUser = async (user) => {
        const result = await table
            .insertOne(user)
            .catch((err) => {
                let error = { error: [] };
                searchError(err, null, error);
                return error;
            });
        return result;
    }
    this.update = async (id, user) => {
        const result = await table
            .updateMany({ id: id }, {
                $set: user,
                $currentDate: { lastModified: true }
            }).catch(err => {
                let error = { error: [] };
                searchError(err, null, error);
                return error;
            });
        const userx = await this.getUser(id);
        return userx;
    }
    this.delete = async (id) => {
        const result = await table.deleteOne({ id: id })
        return result;
    }
}


module.exports = User;
/*
getUser()
getUserDevice()
getUserRole()
getUserAll()
addUser()
update()
delete()
*/