var searchError = require('../../resurs/functions/erors');

function Static(table) {
    this.getStatic = async (id = 5200) => {
        const result = await table.findOne({ id: id }, { projection: { _id: 0 } })
            .then(result => {
                return result;
            })
            .catch(err => {
                console.error(`malumotlar topilmadi: ${err}`)
                return false;
            })
        return result;
    };
    this.add = async (data) => {
        console.log("Static :", data);
        let doc = (await table.find({}, { projection: { _id: 0 } }).toArray())[0];
        let respons_data = null;
        if (!doc) {
            const result = await table
                .insertOne({
                    id: 5200,
                    add: data == 1 ? 1 : 0,
                    update: data == 2 ? 1 : 0,
                    delete: data == 3 ? 1 : 0,
                    view: data == 4 ? 1 : 0,
                    doc_count:
                        data == "doc1"
                            || data == "doc2"
                            || data == "doc3"
                            || data == "doc4"
                            || data == "doc5"
                            || data == "doc6"
                            || data == "doc7" ? 1 : 0,
                })
                .catch((err) => {
                    let error = { error: [] };
                    searchError(err, null, error);
                    return error;
                });
            console.log("Static result:", result);
            return 1;
        }
        if (data == 1) {
            this.update(5200, { add: doc.add + 1 });
            return doc.add + 1;
        }
        if (data == 2) {
            this.update(5200, { update: doc.update + 1 });
            return doc.update + 1;
        }
        if (data == 3) {
            this.update(5200, { delete: doc.delete + 1 });
            return doc.delete + 1;
        }
        if (data == 4) {
            this.update(5200, { view: doc.view + 1 });
            return doc.view + 1;
        }
        if (
            data == "doc1" ||
            data == "doc2" ||
            data == "doc3" ||
            data == "doc4" ||
            data == "doc5" ||
            data == "doc6" ||
            data == "doc7"
        ) {
            this.update(5200, { doc_count: doc.doc_count + 1 });
            return doc.doc_count + 1;
        }
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
        const history_demo = await this.getStatic(id);
        console.log(history_demo);
        return history_demo;
    };

}

module.exports = Static;
