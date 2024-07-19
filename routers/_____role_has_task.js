const express = require("express");
const router = express.Router();

var db = require('../db/mongodb');
var generateId = require('../resurs/functions/getid');
const validate = require("../resurs/validate/device");
var auth = require("../middlewire/auth");


setTimeout(async () => { db = await db }, 100);

router.get("/get/RHT/:id", auth, async (req, res) => {
    let id = parseInt(req.params.id);
    if (!id) {
        return res.status(400).json({ error: 'id xato berildi, id butun son qiymat bo\'lishi shart' });
    }
    let RHT = await (await db).RHT.getRHT(id);
    if (!RHT) {
        return res.status(404).json({ error: 'ushbu idga mos role va  task to\'pilmadi!' });
    }
    res.json(
        RHT
    );
})

router.get("/get/role/:id", auth, async (req, res) => {
    let id = parseInt(req.params.id);
    if (!id) {
        return res.status(400).json({ error: 'id xato berildi, id butun son qiymat bo\'lishi shart' });
    }
    const role = await (await db).role.getRole(id);
    if (!role) {
        return res.status(404).json({ error: 'ushbu idga mos role va task to\'pilmadi!' });
    }
    let RHT = await (await db).RHT.getRHTRole(id);
    res.json(
        RHT
    );
})

router.get("/get/task/:id", auth, async (req, res) => {
    let id = parseInt(req.params.id);
    if (!id) {
        return res.status(400).json({ error: 'id xato berildi, id butun son qiymat bo\'lishi shart' });
    }
    const task = await (await db).task.getTask(id);
    if (!task) {
        return res.status(404).json({ error: 'ushbu idga mos role va task to\'pilmadi!' });
    }
    let RHT = await (await db).RHT.getRHTTask(id);
    res.json(
        RHT
    );
})

router.get('/get/all', auth, async (req, res) => {
    let RHT = await (await db).RHT.getRHTAll();
    res.json(
        RHT
    );
})

router.post('/add', auth, async (req, res) => {
    const { error } = validate(req.body, "add");
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    let body = req.body;
    let RHT_int = await (await db).RHT.getRHTForObj({ ...body });
    if (RHT_int.length > 0) {
        return res.status(400).json({ error: 'ushbu  qiymatlar allaqachon kritilgan' });
    }
    let RHT = {
        id: await generateId(),
        ...body
    }

    let result = await (await db).RHT.addRHT(RHT);
    if (result.hasOwnProperty('error')) {
        return res.status(400).json(
            result
        );
    }
    // console.log(result);
    res.json(
        RHT
    );
})

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



    let RHT = await (await db).RHT.getRHT(id);
    if (!RHT) {
        return res.status(404).json({ error: 'ushbu idga mos role va task to\'pilmadi!' });
    }
    
    // if (body.hasOwnProperty("name")) {
    //     let device_int = await (await db).device.getDeviceObj({ ...body });
    //     if (device_int.length > 0 && device.name != device_int.name) {
    //         return res.status(400).json({ error: 'ushbu  qiymatlar allaqachon kritilgan' });
    //     }
    // }

    // if (body.hasOwnProperty("token")) {
    //     let device_int = await (await db).device.getDeviceObj({ ...body });
    //     if (device_int.length > 0 && device.token != device_int.token) {
    //         return res.status(400).json({ error: 'ushbu  qiymatlar allaqachon kritilgan' });
    //     }
    // }



    let result = await (await db).RHT.update(id, body);
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

    let RHT = await (await db).RHT.getRHT(id);
    if (!RHT) {
        return res.status(404).json({ error: 'ushbu idga mos role va task to\'pilmadi!' });
    }

    let result = await (await db).RHT.delete(id);
    res.json(
        RHT
    );
})

module.exports = router;