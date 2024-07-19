const express = require("express");
const router = express.Router();

var db = require('../db/mongodb');
var generateId = require('../resurs/functions/getid');
const validate = require("../resurs/validate/device");
var auth = require("../middlewire/auth");


setTimeout(async () => { db = await db }, 100);


router.get("/", auth, async (req, res) => {
    let device = await (await db).device.getDeviceForObj({ iduser: req.user.id });
    let devices = await (await db).device.getDeviceAllFilter(0, 15, req.user.id);
    let topics = await (await db).topic.getTopicForObj({ iduser: req.user.id });
    for (let index = 0; index < devices.length; index++) {
        const element = devices[index];
        let demotopics = await (await db).DHT.getDHTdevice(element.id);
        element.topics = {
            published: demotopics.filter(element => element.published).map(element => element.idtopic),
            subscribed: demotopics.filter(element => element.subscribed).map(element => element.idtopic)
        }
        devices[index] = element;
        // console.log(element.topics)
    }
    res.render('public/pages/device', {
        path: '',
        device: devices,
        count: devices.length,
        topics: topics,
        filter_count: device.length,
        page: 1,
        user: req.user
    });
})



router.get("/page/:page", auth, async (req, res) => {
    let page = parseInt(req.params.page);
    if (!page) {
        page = 1;
    }
    let device = await (await db).device.getDeviceForObj({ iduser: req.user.id });
    let devices = await (await db).device.getDeviceAllFilter(page * 15 - 15, 15, req.user.id);
    let topics = await (await db).topic.getTopicForObj({ iduser: req.user.id });

    for (let index = 0; index < devices.length; index++) {
        const element = devices[index];
        let demotopics = await (await db).DHT.getDHTdevice(element.id);
        element.topics = {
            published: demotopics.filter(element => element.published).map(element => element.name),
            subscribed: demotopics.filter(element => element.subscribed).map(element => element.name)
        }
        devices[index] = element;
    }

    res.render('public/pages/device', {
        path: '../',
        device: devices,
        count: devices.length,
        filter_count: device.length,
        topics: topics,
        page: page,
        user: req.user
    });
})

// router.get("/get/device/:id", auth, async (req, res) => {
//     let id = parseInt(req.params.id);
//     if (!id) {
//         return res.status(400).json({ error: 'id xato berildi, id butun son qiymat bo\'lishi shart' });
//     }
//     let role = await (await db).device.getDevice(id);
//     if (!role) {
//         return res.status(404).json({ error: 'ushbu idga mos role to\'pilmadi!' });
//     }
//     res.json(
//         role
//     );
// })

router.get("/view/:id", auth, async (req, res) => {
    let id = Number(req.params.id);
    let device = await (await db).device.getDeviceForObj({ id: id, iduser: req.user.id });
    if (device.length == 0) {
        return res.render('public/pages/erors/error-404', {
            status: 404,
            error: 'ushbu idga mos qurilma to\'pilmadi!',
            path: '/device'
        });
    }

    res.render('public/pages/view', {
        header: "Qurilmalar",
        data: device[0],
        back: '../',
        user: req.user
    });
})

// router.get('/get/all', auth, async (req, res) => {
//     let roles = await (await db).device.getDeviceAll();
//     res.json(
//         roles
//     );
// })

router.get('/add', auth, async (req, res) => {
    //let tasks = await (await db).task.getTaskAll();
    // let bolimlar = {
    //     role: false,
    //     user: false,
    //     certifcate: false,
    //     task: false
    // };
    // if (req.user.rolePath.includes("/certifcate")) {
    //     bolimlar.certifcate = true;
    // }
    // if (req.user.rolePath.includes("/role")) {
    //     bolimlar.role = true;
    // }
    // if (req.user.rolePath.includes("/task")) {
    //     bolimlar.task = true;
    // }
    // if (req.user.rolePath.includes("/user")) {
    //     bolimlar.user = true;
    // }
    res.render('public/pages/device/add', {
        user: req.user,
        path: ""
    });
});


router.post('/add', auth, async (req, res) => {
    const { error } = validate(req.body, "add");
    if (error) {
        return res.render('public/pages/erors/error-404', {
            status: 400,
            error: error.details[0].message,
            path: '/role'
        });
    }

    let body = req.body;
    let device_int = await (await db).device.getDeviceForObj({ name: body.name, iduser: req.user.id });
    if (device_int.length > 0) {
        return res.render('public/pages/erors/error-404', {
            status: 400,
            error: 'ushbu  qiymatlar allaqachon kritilgan',
            path: '/device'
        });
    }
    let gen_id = await generateId(db, null, "device");
    let get_hash = await generateId(null, null, "", "key", gen_id);
    user_name = req.user.name || "default";
    //console.log(gen_id,get_hash)
    let device = {
        id: gen_id,
        name: body.name,
        key: user_name + "-" + get_hash,
        iduser: req.user.id
    };
    let result = await (await db).device.addDevice(device);
    //console.log(result)
    if (result.hasOwnProperty('error')) {
        return res.render('public/pages/erors/error-404', {
            status: 400,
            error: result,
            path: '/device'
        });
    }

    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script>
            window.location.href = '/device';
        </script>
    </head>
    <body>
        
    </body>
    </html>`)
})

router.get('/update/:id', auth, async (req, res) => {
    let id = Number(req.params.id);
    if (!id) {
        return res.render('public/pages/erors/error-404', {
            status: 400,
            error: 'id xato berildi, id butun son qiymat bo\'lishi shart',
            path: '/task'
        });
    }
    let device = await (await db).device.getDeviceForObj({ id: id, iduser: req.user.id });
    if (device.length == 0) {
        return res.render('public/pages/erors/error-404', {
            status: 404,
            error: 'ushbu idga mos qurilma to\'pilmadi!',
            path: '/task'
        });
    }
    res.render('public/pages/device/edit', {
        ...device[0],
        path: "",
        user: req.user
    });
});

router.post('/update/:id', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.render('public/pages/erors/error-404', {
            status: 400,
            error: error.details[0].message,
            path: '/device'
        });
    }

    let body = { name: req.body.name };
    let id = parseInt(req.params.id);

    if (!id) {
        return res.render('public/pages/erors/error-404', {
            status: 400,
            error: 'id xato berildi, id butun son qiymat bo\'lishi shart',
            path: '/device'
        });
    }

    let device = await (await db).device.getDeviceForObj({ id: id, iduser: req.user.id });
    if (device.length > 0) {
        if (body.hasOwnProperty("name") && device[0].name != body.name) {
            let device_int = await (await db).device.getDeviceForObj({ name: body.name , iduser: req.user.id});
            if (device_int.length > 0) {
                return res.render('public/pages/erors/error-404', {
                    status: 400,
                    error: 'ushbu  qiymatlar allaqachon kritilgan',
                    path: '/device'
                });
            }
        }
    }else {
        return res.render('public/pages/erors/error-404', {
            status: 404,
            error: 'ushbu idga mos qurilma to\'pilmadi!',
            path: '/device'
        });
    }
    let result = await (await db).device.update(id, body);
    if (result.hasOwnProperty('error')) {
        return res.render('public/pages/erors/error-404', {
            status: 400,
            error: result,
            path: '/device'
        });
    }
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script>
            window.location.href = '/device';
        </script>
    </head>
    <body>
        
    </body>
    </html>`)
})

router.get('/delete/:id', auth, async (req, res) => {
    let id = parseInt(req.params.id);
    if (!id) {
        return res.render('public/pages/erors/error-404', {
            status: 400,
            error: 'id xato berildi, id butun son qiymat bo\'lishi shart',
            path: '/role'
        });
    }
    let device = await (await db).device.getDeviceForObj({ id: id, iduser: req.user.id });
    if (device.length == 0) {
        return res.render('public/pages/erors/error-404', {
            status: 404,
            error: 'ushbu idga mos qurilma to\'pilmadi!',
            path: '/device'
        });
    }
    let result = await (await db).device.delete(id);
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script>
            window.location.href = '/device';
        </script>
    </head>
    <body>
        
    </body>
    </html>`)
});

router.get('/all/delete/:id', auth, async (req, res) => {
    let ids = (req.params.id.split('+')).map((el) => { return parseInt(el) });
    if (!ids) {
        return res.render('public/pages/erors/error-404', {
            status: 400,
            error: 'idlar bo\'sh berildi, idlar bo\'sh bo\'lmasligi shart',
            path: '/device'
        });
    }
    for (let index = 1; index < ids.length; index++) {
        const element = ids[index];
        let device = await (await db).device.getDeviceForObj({ id: element, iduser: req.user.id });
        if (device.length == 0) {
            return res.render('public/pages/erors/error-404', {
                status: 404,
                error: element + ' ushbu idga mos qurilma to\'pilmadi!',
                path: '/device'
            });
        }
        let result = await (await db).device.delete(element);
    }
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script>
            window.location.href = '/device';
        </script>
    </head>
    <body>
        
    </body>
    </html>`)
});



// router.delete('/delete/:id', auth, async (req, res) => {
//     let id = parseInt(req.params.id);
//     if (!id) {
//         return res.status(400).json({ error: 'id xato berildi, id butun son qiymat bo\'lishi shart' });
//     }

//     let device = await (await db).device.getDevice(id);
//     if (!device) {
//         return res.status(404).json({ error: 'ushbu idga mos qurilma to\'pilmadi!' });
//     }
//     let result = await (await db).device.delete(id);
//     res.json(
//         device
//     );
// })

module.exports = router;