const express = require("express");
const router = express.Router();

var db = require('../db/mongodb');
var generateId = require('../resurs/functions/getid');
const validate = require("../resurs/validate/role");
var auth = require("../middlewire/auth");


setTimeout(async () => { db = await db }, 100);



router.get("/", auth, async (req, res) => {
    let role = await (await db).role.getRoleAll();
    let roles = await (await db).role.getRoleAllFilter(0, 15);
    for (let index = 0; index < roles.length; index++) {
        let tasks = '';
        const element = await (await db).RHT.getRHTForObj({ idrole: roles[index].id });
        // console.log(element)
        for (let index_last = 0; index_last < element.length; index_last++) {
            const element_last = element[index_last];
            let demo = await (await db).task.getTask(element_last.idtask);
            //console.log(demo, element_last);
            if(demo){
                if ((index_last + 1) % 3 == 0) {
                    tasks += demo.name + '....';
                    break;
                }
                tasks += demo.name + ",";
            }
        }
        roles[index].tasks = tasks;
    }
    
    res.render('public/pages/role', {
        path: '',
        roles: roles,
        count: role.length,
        page: 1,
        user: req.user
    });
})

router.get("/page/:page", auth, async (req, res) => {
    let page = parseInt(req.params.page);
    if (!page) {
        page = 1;
    }
    let role = await (await db).role.getRoleAll();
    let roles = await (await db).role.getRoleAllFilter(page * 15 - 15, 15);
    for (let index = 0; index < roles.length; index++) {
        let tasks = '';
        const element = await (await db).RHT.getRHTForObj({ idrole: roles[index].id });
        // console.log(element)
        for (let index_last = 0; index_last < element.length; index_last++) {
            const element_last = element[index_last];
            let demo = await (await db).task.getTask(element_last.idtask);
            // console.log(demo, element_last);
            if ((index_last + 1) % 3 == 0) {
                tasks += demo.name + '....';
                break;
            }
            tasks += demo.name + ",";
        }
        roles[index].tasks = tasks;
    }
    
    res.render('public/pages/role', {
        path: '../',
        roles: roles,
        count: role.length,
        page: page,
        user: req.user
    });
})

router.get("/get/role/:id", auth, async (req, res) => {
    let id = parseInt(req.params.id);
    if (!id) {
        return res.status(400).json({ error: 'id xato berildi, id butun son qiymat bo\'lishi shart' });
    }
    let role = await (await db).role.getRole(id);
    if (!role) {
        return res.status(404).json({ error: 'ushbu idga mos role to\'pilmadi!' });
    }
    res.json(
        role
    );
})

router.get("/view/:id", auth, async (req, res) => {
    let id = Number(req.params.id);
    let role = await (await db).role.getRole(id);
    let tasks = await (await db).RHT.getRHTRole(id);
    if (!role) {
        return res.render('public/pages/erors/error-404', {
            status: 404,
            error: 'ushbu idga mos rol to\'pilmadi!',
            path: '/role'
        });
    }
    for (let index = 0; index < tasks.length; index++) {
        const element = tasks[index];
        let task = await (await db).task.getTask(element.idtask);
        role[`vazifa-${index + 1}`] = task.name + `(${task.path})`;
    }
    
    res.render('public/pages/view', {
        header: "Rol",
        data: role,
        back: '../',
        user: req.user
    });
})

router.get('/get/all', auth, async (req, res) => {
    let roles = await (await db).role.getRoleAll();
    res.json(
        roles
    );
})

router.get('/add', auth, async (req, res) => {
    let tasks = await (await db).task.getTaskAll();
    
    res.render('public/pages/roles/add', {
        tasks: tasks,
        user: req.user
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
    // console.log(req.body);
    let tasks = req.body.tasks;
    if (req.body.hasOwnProperty('tasks') && req.body.tasks.length > 0) {
        tasks = tasks.split(',').map((el) => { return parseInt(el) });
        // console.log(tasks);
    }
    let body = req.body;
    let role_int = await (await db).role.getRoleForObj({ name: body.name });
    if (role_int.length > 0) {
        return res.render('public/pages/erors/error-404', {
            status: 400,
            error: 'ushbu  qiymatlar allaqachon kritilgan',
            path: '/role'
        });
    }
    let role = {
        id: await generateId(db,8,"role"),
        name: body.name
    };
    let result = await (await db).role.addRole(role);
    if (result.hasOwnProperty('error')) {
        return res.render('public/pages/erors/error-404', {
            status: 400,
            error: result,
            path: '/role'
        });
    }
    if (tasks) {
        for (let index = 0; index < tasks.length; index++) {
            const element = tasks[index];
            if (element) {
                let task = await (await db).task.getTask(element);
                if (!task) {
                    return res.render('public/pages/erors/error-404', {
                        status: 404,
                        error: 'ushbu idga mos vazifa to\'pilmadi!',
                        path: '/role'
                    });
                }
                let RHT = {
                    id: await generateId(db,8,"role_has_task"),
                    idrole: role.id,
                    idtask: element,
                };
                await (await db).RHT.addRHT(RHT);
                tasks[index] = RHT;
            }
        }
    }
    // console.log(tasks);
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script>
            window.location.href = '/role';
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
    let role = await (await db).role.getRole(id);
    if (!role) {
        return res.render('public/pages/erors/error-404', {
            status: 404,
            error: 'ushbu idga mos role to\'pilmadi!',
            path: '/task'
        });
    }
    let tasks_role = [];
    let RHTs = await (await db).RHT.getRHTRole(id);
    for (let index = 0; index < RHTs.length; index++) {
        const element = RHTs[index].idtask;
        tasks_role.push((await (await db).task.getTask(element)).name);
    }
    let tasks = await (await db).task.getTaskAll();

    res.render('public/pages/roles/edit', {
        ...role,
        tasks: tasks,
        tasks_role: tasks_role,
        user: req.user
    });
});

router.post('/update/:id', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.render('public/pages/erors/error-404', {
            status: 400,
            error: error.details[0].message,
            path: '/task'
        });
    }

    let body = { name: req.body.name };
    let id = parseInt(req.params.id);

    if (!id) {
        return res.render('public/pages/erors/error-404', {
            status: 400,
            error: 'id xato berildi, id butun son qiymat bo\'lishi shart',
            path: '/task'
        });
    }
    // console.log(req.body);
    let tasks = req.body.tasks;
    if (req.body.hasOwnProperty('tasks') && req.body.tasks.length > 0) {
        tasks = tasks.split(',').map((el) => { return parseInt(el) });
    }
    let role = await (await db).role.getRole(id);

    if (body.hasOwnProperty("name") && role.name != body.name) {
        let role_int = await (await db).role.getRoleForObj({ name: body.name });
        if (role_int.length > 0) {
            return res.render('public/pages/erors/error-404', {
                status: 400,
                error: 'ushbu  qiymatlar allaqachon kritilgan',
                path: '/task'
            });
        }
    }
    if (!role) {
        return res.render('public/pages/erors/error-404', {
            status: 404,
            error: 'ushbu idga mos role to\'pilmadi!',
            path: '/task'
        });
    }
    let RHTs = (await (await db).RHT.getRHTRole(id))//.map((el) => { return el.idtask });
    // console.log("avvall ", tasks, RHTs);
    let cloneArr = [...RHTs];
    for (let index = 0; index < cloneArr.length; index++) {
        const element = cloneArr[index].idtask;
        if (tasks.includes(element)) {
            tasks.splice(tasks.indexOf(element), 1);
            // console.log('o\'chirildi ', RHTs[RHTs.indexOf(cloneArr[index])])
            RHTs.splice(RHTs.indexOf(cloneArr[index]), 1);
        }
    }
    // console.log("keyin ", tasks, RHTs);
    if (tasks) {
        //console.log("RHTs",RHTs,"tasks",tasks)
        for (let index = 0; index < RHTs.length; index++) {
            const element = RHTs[index];
            // console.log("deleting RHT " + element);
            await (await db).RHT.delete(element.id);
        }
        for (let index = 0; index < tasks.length; index++) {
            const element = tasks[index];
            let RHT = {
                id: await generateId(db,8,"role_has_task"), 
                idrole: id,
                idtask: element,
            };
            // console.log("adding RHT " + RHT);
            await (await db).RHT.addRHT(RHT);
        }
    }
    if (req.body.tasks.length == 0) {
        for (let index = 0; index < RHTs.length; index++) {
            const element = RHTs[index];
            // console.log("deleting RHT " + element);
            await (await db).RHT.delete(element.id);
        }
    }
    let result = await (await db).role.update(id, body);
    if (result.hasOwnProperty('error')) {
        return res.render('public/pages/erors/error-404', {
            status: 400,
            error: result,
            path: '/task'
        });
    }
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script>
            window.location.href = '/role';
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
    let role = await (await db).role.getRole(id);
    if (!role) {
        return res.render('public/pages/erors/error-404', {
            status: 404,
            error: 'ushbu idga mos role to\'pilmadi!',
            path: '/role'
        });
    }
    let result = await (await db).role.delete(id);
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script>
            window.location.href = '/role';
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
            path: '/role'
        });
    }
    let roles = [];
    for (let index = 1; index < ids.length; index++) {
        const element = ids[index];
        let role = await (await db).role.getRole(element);
        if (!role) {
            return res.render('public/pages/erors/error-404', {
                status: 404,
                error: element + ' ushbu idga mos role to\'pilmadi!',
                path: '/role'
            });
        }
        let result = await (await db).role.delete(element);
    }
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script>
            window.location.href = '/role';
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

    let role = await (await db).role.getRole(id);
    if (!role) {
        return res.status(404).json({ error: 'ushbu idga mos role to\'pilmadi!' });
    }
    let result = await (await db).role.delete(id);
    res.json(
        role
    );
})

module.exports = router;