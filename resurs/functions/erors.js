const rek = (obj, propertyName, result) => {
    var propertyName = propertyName;
    if ((typeof obj) == 'object') {
        for (const element in obj) {
            if (element == 'propertyName')
                this.propertyName = obj[element]
            if (element == 'specifiedAs')
                result.error.push({
                    error: obj["reason"],
                    method: obj["specifiedAs"],
                    column: this.propertyName
                });
            if ((typeof obj[element]) == 'object') {
                rek(obj[element], this.propertyName, result);
            }
        }
    } else {
        console.log(obj)
    }
}
module.exports = rek;