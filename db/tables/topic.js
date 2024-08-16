var searchError = require('../../resurs/functions/erors');

function Topic(table) {
    this.getTopicForObj = async (obj) => {
        const result = await table.find(obj, {
            projection: { _id: 0 ,lastModified:0}
        }).toArray();
        return result;
    }
    this.getTopic = async (id) => {
        const result = await table.findOne({ id: id }, { projection: { _id: 0 ,lastModified:0}})
            .then(result => {
                return result;
            })
            .catch(err => {
                console.error(`Topic topilmadi: ${err}`)
                return false;
            })
        return result;
    }
    this.getTopicAll = async () => {
        const result = await table.find({}, { projection: { _id: 0 ,lastModified:0} })
            .sort({ name: 1 }).toArray()
        return result;
    }
    this.getTopicAllFilter = async (skip,limit,find_user) => {
        const result = await table.find({iduser:find_user} , { projection: { _id: 0 ,lastModified:0} })
            .sort({ name: 1}).limit(limit).skip(skip).toArray();
        return result;
    };
    this.addTopic = async (topic) => {
        const result = await table
            .insertOne(topic)
            .catch((err) => {
                let error = { error: [] };
                searchError(err, null, error);
                return error;
            });
        return result;
    }
    this.update = async (id, topic) => {
        const result = await table
            .updateMany({ id: id }, {
                $set: topic,
                $currentDate: { lastModified: true }
            }).catch(err => {
                let error = { error: [] };
                searchError(err, null, error);
                return error;
            });
        const topicx = await this.getTopic(id);
        return topicx;
    }
    this.delete = async (id) => {
        const result = await table.deleteOne({ id: id })
        return result;
    }
}


module.exports = Topic;
/*
getTopic()
getTopicAll()
addTopic()
update()
delete()
*/