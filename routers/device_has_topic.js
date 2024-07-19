const express = require("express");
const router = express.Router();

var db = require('../db/mongodb');
var generateId = require('../resurs/functions/getid');
const validate = require("../resurs/validate/DHT");
var auth = require("../middlewire/auth");
const { date } = require("joi");


setTimeout(async () => { db = await db }, 100);

router.get("/get/DHT/:id", auth, async (req, res) => {
    let id = parseInt(req.params.id);
    if (!id) {
        return res.status(400).json({ error: 'id xato berildi, id butun son qiymat bo\'lishi shart' });
    }
    let DHT = await (await db).DHT.getDHT(id);
    if (!DHT) {
        return res.status(404).json({ error: 'ushbu idga mos device va  topic to\'pilmadi!' });
    }
    res.json(
        DHT
    );
})

router.get("/get/device/:id", auth, async (req, res) => {
    let id = parseInt(req.params.id);
    if (!id) {
        return res.status(400).json({ error: 'id xato berildi, id butun son qiymat bo\'lishi shart' });
    }
    const device = await (await db).device.getDevice(id);
    if (!device) {
        return res.status(404).json({ error: 'ushbu idga mos device va  topic to\'pilmadi!' });
    }
    let DHT = await (await db).DHT.getDHTdevice(id);
    res.json(
        DHT
    );
})

router.get("/get/topic/:id", auth, async (req, res) => {
    let id = parseInt(req.params.id);
    if (!id) {
        return res.status(400).json({ error: 'id xato berildi, id butun son qiymat bo\'lishi shart' });
    }
    const topic = await (await db).topic.getTopic(id);
    if (!topic) {
        return res.status(404).json({ error: 'ushbu idga mos device va  topic to\'pilmadi!' });
    }
    let DHT = await (await db).DHT.getDHTTopic(id);
    res.json(
        DHT
    );
})

router.get('/get/all', auth, async (req, res) => {
    let DHT = await (await db).DHT.getDHTAll();
    res.json(
        DHT
    );
})

router.post('/add', auth, async (req, res) => {
    const { error } = validate(req.body, "add");
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    let body = req.body;
    let DHT_int = await (await db).DHT.getDHTForObj({ ...body });
    if (DHT_int.length > 0) {
        return res.status(400).json({ error: 'ushbu  qiymatlar allaqachon kritilgan' });
    }
    let DHT = {
        id: await generateId(db, 8, "device_has_topic"),
        ...body
    }

    let result = await (await db).DHT.addDHT(DHT);
    if (result.hasOwnProperty('error')) {
        return res.status(400).json(
            result
        );
    }
    // console.log(result);
    res.json(
        DHT
    );
})

router.post('/update', auth, async (req, res) => {
    //console.log(req.body);
    let body = req.body;
    let topics = body.idtopic;
    for (let index = 0; index < topics.length; index++) {
        let element = {
            iddevice: parseInt(body.iddevice),
            idtopic: parseInt(topics[index]),
        }
        let result = await (await db).DHT.getDHTForObj(element);
        //console.log(result);
        if (result.length > 0) { 
            if (body.hasOwnProperty("published")) {
                await (await db).DHT.update(result[0].id, { published: body.published })
            }
            if (body.hasOwnProperty("subscribed")) {
                await (await db).DHT.update(result[0].id, { subscribed: body.subscribed });
            }
        } else {
            let DHT = {
                id: await generateId(db, 8, "device_has_topic"),
                ...element,
                published: body.published || false,
                subscribed: body.subscribed || false
            };
            await (await db).DHT.addDHT(DHT); 
            //console.log(DHT);
        }
    }
    await (await db).DHT.clear();
    return res.status(200).send("ok");
});

router.put('/update/:id', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    let body = req.body;

    let id = parseInt(req.params.id);

    if (!id) {
        return res.status(400).json({ error: 'id xato berildi, id butun son qiymat bo\'lishi shart' });
    }

    if (!body) {
        return res.status(400).json({ error: 'no\'tog\'ri so\'rov. bosh qiymat yuborilgan.' });
    }

    if (body.hasOwnProperty("id")) {
        return res.status(400).json({ error: 'id qiymatini o\'zgartirib bo\'lmaydi.' });
    }

    let DHT = await (await db).DHT.getDHT(id);
    if (!DHT) {
        return res.status(404).json({ error: 'ushbu idga mos device va  topic to\'pilmadi!' });
    }

    let result = await (await db).DHT.update(id, body);
    if (result.hasOwnProperty('error')) {
        return res.status(400).json(
            result
        );
    }
    res.json(
        result
    );
})

router.delete('/delete/:id', auth, async (req, res) => {
    let id = parseInt(req.params.id);
    if (!id) {
        return res.status(400).json({ error: 'id xato berildi, id butun son qiymat bo\'lishi shart' });
    }

    let DHT = await (await db).DHT.getDHT(id);
    if (!DHT) {
        return res.status(404).json({ error: 'ushbu idga mos device va  topic to\'pilmadi!' });
    }

    let result = await (await db).DHT.delete(id);
    res.json(
        DHT
    );
})

module.exports = router;