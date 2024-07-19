
const { hash,genSalt } = require('bcrypt');
// var db = require('../../db/mongodb');
// setTimeout(async () => { db = await db }, 100);

function createUniqueRandomGenerator(num) {
    //console.log(num)
    if (num) {
        let binaryInteger = parseInt(parseInt(Math.random() * 10) * 10 ** 12 + (parseInt((parseInt(Math.random() * 10 ** 12) + "").split('').reverse().join('')) + (new Date()).valueOf()));
        if (`${binaryInteger}`.length > 13) {
            return createUniqueRandomGenerator(num);
        }
        let result = parseInt(binaryInteger + Math.random() * 10 ** 8) % 10 ** (num + 1);
        if (`${result}`.length != num) {
            return createUniqueRandomGenerator(num);
        }
        return result;
    } else {
        let binaryInteger = parseInt(parseInt(Math.random() * 10) * 10 ** 12 + (parseInt((parseInt(Math.random() * 10 ** 12) + "").split('').reverse().join('')) + (new Date()).valueOf()));
        if (`${binaryInteger}`.length > 13) {
            return createUniqueRandomGenerator();
        }
        let result = parseInt(binaryInteger + Math.random() * 10 ** 8) % 10 ** 9;
        if (`${result}`.length != 8) {
            return createUniqueRandomGenerator();
        }
        return result;
    }
}



async function Chek(db,num,table,param,solt){ 
    if(param == "key"){
        solt = parseInt(solt);
        const input = (new Date()).valueOf().toString() + " " + solt;
        const salt = await genSalt(5);
        const hashed = await hash(input, salt);
        return hashed.substring(8, 16)+solt.toString(21);
    }
    let gen_id = 0;
    if(num){
        gen_id = createUniqueRandomGenerator(num);
    }else{
        gen_id = createUniqueRandomGenerator(8);
    }
    let res = await (await db).chek_id(table,gen_id)
    //console.log(table,gen_id,res)
    if(!res){
        return gen_id;
    }else{
        return Chek(db,num,table,param,solt);
    }
}
module.exports = Chek;