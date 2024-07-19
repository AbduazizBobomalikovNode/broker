const express = require("express");
const router = express.Router();

var db = require('../db/mongodb');
var generateId = require('../resurs/functions/getid');
const validate = require("../resurs/validate/topic");
var auth = require("../middlewire/auth");
const User = require("../db/tables/user");


setTimeout(async () => { db = await db }, 100);


router.get("/", auth, async (req, res) => {
    let topic = await (await db).topic.getTopicAll();
    let topics = await (await db).topic.getTopicAllFilter(0, 15);

    res.render('public/pages/topic', {
        path: '',
        topics: topics,
        count: topics.length,
        filter_count:topic.length,
        page: 1,
        user: req.user
    });
})

router.get("/page/:page", auth, async (req, res) => {
    let page = parseInt(req.params.page);
    if (!page) {
        page = 1;
    }
    let topic = await (await db).topic.getTopicAll();
    let topics = await (await db).topic.getTopicAllFilter(page * 15 - 15, 15);
   

    res.render('public/pages/topic', {
        path: '../',
        topics: topics,
        count: topics.length,
        filter_count:topic.length,
        page: page,
        user: req.user
    });
})

router.get("/get/topic/:id", auth, async (req, res) => {
    let id = parseInt(req.params.id);
    if (!id) {
        return res.status(400).json({ error: 'id xato berildi, id butun son qiymat bo\'lishi shart' });
    }
    let topic = await (await db).topic.getTopic(id);
    if (!topic) {
        return res.status(404).json({ error: 'ushbu idga mos mavzu to\'pilmadi!' });
    }
    res.json(
        topic
    );
})

router.get("/view/:id", auth, async (req, res) => {
    let id = Number(req.params.id);
    let topic = await (await db).topic.getTopic(id);
    if (!topic) {
        return res.render('public/pages/erors/error-404', {
            status: 404,
            error: 'ushbu idga mos Mavzu to\'pilmadi!',
            path: '/topic'
        });
    }

    res.render('public/pages/view', {
        header: "Mavzular",
        data: topic,
        back: '../',
        user: req.user
    });
})

router.get('/get/all', auth, async (req, res) => {
    let topics = await (await db).topic.getTopicAll();
    res.json(
        topics
    );
})

router.get('/add', auth, async (req, res) => {
    res.render('public/pages/topic/add', {
        path: '/',
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
    
    let body = req.body;
    let topic_int = await (await db).topic.getTopicForObj({ name: body.name,iduser:req.user.id });
    if (topic_int.length > 0) {
        return res.render('public/pages/erors/error-404', {
            status: 400,
            error: 'ushbu  qiymatlar allaqachon kritilgan',
            path: '/topic'
        });
    }
    let topic = {
        id: await generateId(db,8,"topic"),
        name: body.name,
        topic: `/index/${req.user.id}/`+body.name,
        description:body.description,
        iduser:req.user.id
    };
    let result = await (await db).topic.addTopic(topic);
    if (result.hasOwnProperty('error')) {
        return res.render('public/pages/erors/error-404', {
            status: 400,
            error: result,
            path: '/topic'
        });
    }
    
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script>
            window.location.href = '/topic';
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
            path: '/topic'
        });
    }
    let topic = await (await db).topic.getTopic(id);
    if (!topic) {
        return res.render('public/pages/erors/error-404', {
            status: 404,
            error: 'ushbu idga mos Mavzu to\'pilmadi!',
            path: '/topic'
        });
    }
    
    res.render('public/pages/topic/edit', {
        path: '/',
        ...topic,
        user: req.user
    });
});

router.post('/update/:id', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.render('public/pages/erors/error-404', {
            status: 400,
            error: error.details[0].message,
            path: '/topic'
        });
    }

    let body = { name: req.body.name,description:req.body.description};
    let id = parseInt(req.params.id);

    if (!id) {
        return res.render('public/pages/erors/error-404', {
            status: 400,
            error: 'id xato berildi, id butun son qiymat bo\'lishi shart',
            path: '/topic'
        });
    }
    
    let topic = await (await db).topic.getTopic(id);

    if (body.hasOwnProperty("name") && topic.name != body.name) {
        let topic_int = await (await db).topic.getTopicForObj({ name: body.name,iduser:req.user.id });
        if (topic_int.length > 0) {
            return res.render('public/pages/erors/error-404', {
                status: 400,
                error: 'ushbu  qiymatlar allaqachon kritilgan',
                path: '/topic'
            });
        }
    }
    if (!topic) {
        return res.render('public/pages/erors/error-404', {
            status: 404,
            error: 'ushbu idga mos mavzu to\'pilmadi!',
            path: '/topic'
        });
    }
    
    
    let result = await (await db).topic.update(id, body);
    if (result.hasOwnProperty('error')) {
        return res.render('public/pages/erors/error-404', {
            status: 400,
            error: result,
            path: '/topic'
        });
    }
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script>
            window.location.href = '/topic';
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
            path: '/topic'
        });
    }
    let topic = await (await db).topic.getTopic(id);
    if (!topic) {
        return res.render('public/pages/erors/error-404', {
            status: 404,
            error: 'ushbu idga mos mavzu to\'pilmadi!',
            path: '/topic'
        });
    }
    let result = await (await db).topic.delete(id);
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script>
            window.location.href = '/topic';
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
            path: '/topic'
        });
    }
    for (let index = 1; index < ids.length; index++) {
        const element = ids[index];
        let topic = await (await db).topic.getTopic(element);
        if (!topic) {
            return res.render('public/pages/erors/error-404', {
                status: 404,
                error: element + ' ushbu idga mos mavzu to\'pilmadi!',
                path: '/topic'
            });
        }
        let result = await (await db).topic.delete(element);
    }
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script>
            window.location.href = '/topic';
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

    let topic = await (await db).topic.getTopic(id);
    if (!topic) {
        return res.status(404).json({ error: 'ushbu idga mos mavzu to\'pilmadi!' });
    }
    let result = await (await db).topic.delete(id);
    res.json(
        topic
    );
})

module.exports = router;