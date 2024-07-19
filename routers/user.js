const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');

var db = require('../db/mongodb');
var generateId = require('../resurs/functions/getid');
const validate = require("../resurs/validate/user");
const action = require("../resurs/functions/action");
var auth = require("../middlewire/auth");

setTimeout(async () => { db = await db }, 100);

router.get("/", auth, async (req, res) => {
    let user = await (await db).user.getUserAll();
    let users = await (await db).user.getUserAllFilter(0, 15);
    let roles = await (await db).role.getRoleAll();
    for (let index = 0; index < users.length; index++) {
        const element = await (await db).role.getRole(Number(users[index].idrole));
        users[index].role = element.name;
    }
    res.render('public/pages/user', {
        path: '',
        roles: roles,
        users: users,
        count: user.length,
        page: 1,
        user: req.user
    });
});
router.get("/view/:id", auth, async (req, res) => {
    let id = Number(req.params.id);
    let user = await (await db).user.getUser(id);
    user.idrole = (await (await db).role.getRole(user.idrole)).name + ` ( ${user.idrole} )`
    if (!user) {
        return res.render('public/pages/erors/error-404', {
            status: 404,
            error: 'ushbu idga mos Foydalanuvchi to\'pilmadi!',
            path: '/user'
        });
    }
    res.render('public/pages/view', {
        header: "Foydalanuvchi",
        data: user,
        back: '../',
        user: req.user
    });
})

router.get("/page/:page", auth, async (req, res) => {
    let role_filter = null;
    let page = null;
    if (req.params.page.includes('$')) {
        role_filter = parseInt(req.params.page.split('$')[1]);
        page = parseInt(req.params.page.split('$')[0]);
    } else {
        page = parseInt(req.params.page);
    }
    if (!page) {
        page = 1;
    }
    let user = await (await db).user.getUserAll();
    let users = await (await db).user.getUserAllFilter(page * 15 - 15, 15, role_filter);
    let roles = await (await db).role.getRoleAll();
    for (let index = 0; index < users.length; index++) {
        const element = await (await db).role.getRole(Number(users[index].idrole));
        users[index].role = element.name;
    }
    
    if (role_filter) {
        res.render('public/pages/user', {
            path: '../',
            roles: roles,
            users: users,
            count: users.length,
            filter: user.length,
            page: page,
            select_role: role_filter,
            user: req.user
        });
    } else {
        res.render('public/pages/user', {
            path: '../',
            roles: roles,
            users: users,
            count: user.length,
            filter: user.length,
            page: page,
            select_role: '',
            user: req.user
        });
    }

})


router.get("/get/user/:id", auth, async (req, res) => {
    let id = parseInt(req.params.id);
    if (!id) {
        return res.status(400).json({ error: 'id xato berildi, id butun son qiymat bo\'lishi shart' });
    }
    let user = await (await db).user.getUser(id);
    if (!user) {
        return res.status(404).json({ error: 'ushbu idga mos foydalanuvchi to\'pilmadi!' });
    }
    res.json(
        user
    );
})


router.get("/get/role/:id", auth, async (req, res) => {
    let id = parseInt(req.params.id);
    if (!id) {
        return res.status(400).json({ error: 'id xato berildi, id butun son qiymat bo\'lishi shart' });
    }
    const role = await (await db).role.getRole(id);
    if (!role) {
        return res.status(404).json({ error: 'ushbu idga mos role to\'pilmadi!' });
    }
    let users = await (await db).user.getUserRole(id);
    res.json(
        users
    );
})



router.get('/get/all', auth, async (req, res) => {
    let users = await (await db).user.getUserAll();
    res.json(
        users
    );
})
router.get('/add', auth, async (req, res) => {
    let roles = await (await db).role.getRoleAll();
    res.render('public/pages/users/add', {
        roles: roles,
        user: req.user
    });
});

router.post('/add', auth, async (req, res) => {
    const { error } = validate(req.body, "add");
    if (error) {
        return res.render('public/pages/erors/error-404', {
            status: 400,
            error: error.details[0].message,
            path: '/user'
        });
    }
    req.body.idrole = parseInt(req.body.idrole);
    let body = req.body;
    const hashedPassword = await bcrypt.hash(body.password, 10);
    delete body.password;
    // console.log(body)
    let users_phone = await (await db).user.getUserForObj({ phone: body.phone });
    let users_email = await (await db).user.getUserForObj({ email: body.email });
    if (users_phone.length > 0) {
        return res.render('public/pages/erors/error-404', {
            status: 400,
            error: 'ushbu telefon raqam oldin ro\'yxatga olingan.',
            path: '/user'
        });
    }
    if (users_email.length > 0) {
        return res.render('public/pages/erors/error-404', {
            status: 400,
            error: 'ushbu elektron pochta oldin ro\'yxatga olingan.',
            path: '/user'
        });
    }
    body.password = hashedPassword;
    let user = {
        id: await generateId(db,8,"user"),
        ...body
    };
    // console.log(body);
    const role = await (await db).role.getRole(req.body.idrole);
    if (!role) {
        return res.render('public/pages/erors/error-404', {
            status: 404,
            error: 'yuborilgan idga mos rol topilmadi to\'pilmadi!',
            path: '/user'
        });
    }

    let result = await (await db).user.addUser(user);
    if (result.hasOwnProperty('error')) {
        return res.render('public/pages/erors/error-404', {
            status: 400,
            error: result,
            path: '/user'
        });
    }
    //console.log(result);
    action({
        user: req.user.name,
        module: "Foydalanuvchilar",
        description: `${user.name} isimli  foydalanuchini  qo'shdi!`
    });
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script>
            window.location.href = '/user';
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
            path: '/user'
        });
    }
    let user = await (await db).user.getUser(id);
    if (!user) {
        return res.render('public/pages/erors/error-404', {
            status: 404,
            error: 'ushbu idga mos Foydalanuvchi to\'pilmadi!',
            path: '/user'
        });
    }
    let roles = await (await db).role.getRoleAll();
    
    res.render('public/pages/users/edit', {
        roles: roles,
        users: user,
        user: req.user
    });
});


router.post('/update/:id', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.render('public/pages/erors/error-404', {
            status: 400,
            error: error.details[0].message,
            path: '/user'
        });
    }
    let body = req.body;
    let id = Number(req.params.id);
    // console.log(body);
    if (!id) {
        return res.render('public/pages/erors/error-404', {
            status: 400,
            error: 'id xato berildi, id butun son qiymat bo\'lishi shart',
            path: '/user'
        });
    }

    let user = await (await db).user.getUser(id);
    if (!user) {
        return res.render('public/pages/erors/error-404', {
            status: 404,
            error: 'ushbu idga mos Foydalanuvchi to\'pilmadi!',
            path: '/user'
        });
    }
    if (body.hasOwnProperty("idrole")) {
        req.body.idrole = parseInt(req.body.idrole);
    }
    if (body.hasOwnProperty("phone")) {
        let users_phone = await (await db).user.getUserForObj({ phone: body.phone });
        if (users_phone.length > 0 && user.phone != users_phone[0].phone) {
            return res.render('public/pages/erors/error-404', {
                status: 400,
                error: 'ushbu telefon raqam mavjut.',
                path: '/user'
            });
        }
    }
    if (body.hasOwnProperty("email")) {
        let users_email = await (await db).user.getUserForObj({ email: body.email });
        if (users_email.length > 0 && user.email != users_email[0].email) {
            return res.render('public/pages/erors/error-404', {
                status: 400,
                error: 'ushbu elektron pochta mavjut.',
                path: '/user'
            });
        }

    }
    let result = await (await db).user.update(id, body);
    // console.log(result);
    if (result.hasOwnProperty('error')) {
        return res.render('public/pages/erors/error-404', {
            status: 400,
            error: JSON.stringify(result),
            path: '/user'
        });
    }
    action({
        user: req.user.name,
        module: "Foydalanuvchilar",
        description: `${user.name} isimli  foydalanuchini malumotini almashtirdi!`
    });
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script>
            window.location.href = '/user';
        </script>
    </head>
    <body>
        
    </body>
    </html>`)
});


router.put('/update/:id', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    let body = req.body;
    if (body.hasOwnProperty("idrole")) {
        req.body.idrole = parseInt(req.body.idrole);
    }
    // if (body.hasOwnProperty("iddevice")) {
    //     req.body.iddevice = parseInt(req.body.iddevice);
    // }


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

    let user = await (await db).user.getUser(id);
    if (!user) {
        return res.status(404).json({ error: 'ushbu idga mos foydalanuvchi to\'pilmadi!' });
    }
    if (body.hasOwnProperty("phone") && user.phone != body.phone) {
        let users_int = await (await db).user.getUserForObj({ phone: body.phone });
        if (users_int.length > 0) {
            return res.status(400).json({ error: 'ushbu  qiymatlar allaqachon kritilgan' });
        }
    }
    if (body.hasOwnProperty("idrole")) {
        const role = await (await db).role.getRole(req.body.idrole);
        if (!role) {
            return res.status(404).json({ error: 'ushbu idga mos role to\'pilmadi!' });
        }
    }
    // if (body.hasOwnProperty("iddevice")) {
    //     const country = await (await db).device.getDevice(req.body.iddevice);
    //     if (!country) {
    //         return res.status(404).json({ error: 'ushbu idga mos qurilma to\'pilmadi!' });
    //     }
    // }
    let result = await (await db).user.update(id, body);
    if (result.hasOwnProperty('error')) {
        return res.status(400).json(
            result
        );
    }
    res.json(
        result
    );
})

router.get('/delete/:id', auth, async (req, res) => {
    let id = parseInt(req.params.id);
    if (!id) {
        return res.render('public/pages/erors/error-404', {
            status: 400,
            error: 'id xato berildi, id butun son qiymat bo\'lishi shart',
            path: '/user'
        });
    }
    let user = await (await db).user.getUser(id);
    if (!user) {
        return res.render('public/pages/erors/error-404', {
            status: 404,
            error: 'ushbu idga mos Foydalanuvchi to\'pilmadi!',
            path: '/user'
        });
    }
    let result = await (await db).user.delete(id);
    action({
        user: req.user.name,
        module: "Foydalanuvchilar",
        description: `${user.name} isimli  foydalanuchini o'chirdi!`
    });
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script>
            window.location.href = '/user';
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
            error: 'idlar xato berildi, idlar bo\'sh bo\'lmasligi shart',
            path: '/user'
        });
    }
    let users = [];
    for (let index = 1; index < ids.length; index++) {
        const element = ids[index];
        let task = await (await db).user.getUser(element);
        if (!task) {
            return res.render('public/pages/erors/error-404', {
                status: 404,
                error: element + 'ushbu idga mos Foydalanuvchi to\'pilmadi!',
                path: '/user'
            });
        }
        let result = await (await db).user.delete(element);
    }
    action({
        user: req.user.name,
        module: "Foydalanuvchilar",
        description: `${ids.length - 1} ta  foydalanuchini o'chirdi!`
    });
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script>
            window.location.href = '/user';
        </script>
    </head>
    <body>
        
    </body>
    </html>`)
});

router.delete('/delete/:id', auth, async (req, res) => {
    let id = parseInt(req.params.id);
    if (!id) {
        return res.status(400).json({ error: 'id xato berildi, id butun son qiymat bo\'lishi shart' });
    }
    let user = await (await db).user.getUser(id);
    if (!user) {
        return res.status(404).json({ error: 'ushbu idga mos user to\'pilmadi!' });
    }
    let result = await (await db).user.delete(id);
    res.json(
        user
    );
})

module.exports = router;