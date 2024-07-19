const jwt = require('jsonwebtoken');
const jwt_my_key = process.env.JWT_MY_KEY || "***OLIB-TASHLANDI***";

// let x = {
//     'user': ['get/user','get/device','get/role','get/all', 'add', 'uptade', 'delete'],
//     'role': ['get/role', 'get/all', 'add', 'uptade', 'delete'],
//     'task': ['get/task', 'get/user', 'get/device', 'get/all', 'add', 'uptade', 'delete'],
//     'device': ['get/device','get/all', 'add', 'uptade', 'delete'],
//     'history': ['get/history','get/device', 'get/all', 'add', 'uptade', 'delete']
// }
// let user = {
//     'task': ['get/task', 'get/user', 'get/device', 'get/all', 'add', 'uptade', 'delete']
// }


module.exports = async function (req, res, next) {
    // req.user = {
    //     id:55087719,
    //     role : "demo",
    //     name : "demo",
    // };
    // return next();
    const x_token = req.cookies['x-web-token'];
    if (!x_token) {
        console.log('cookies  ishlamadi');
        return res.send(`<script>setTimeout(()=>{window.location.href = '/login';},10);</script>`);
    }
    // console.log('cookies  ishladi:', x_token);
    // let path_req = req.originalUrl.slice(0,req.originalUrl.lastIndexOf("/"));
    let originalUrl = removeTrailingNumber(req.originalUrl);
    console.log(originalUrl);
    // return next();
    const token = req.cookies['x-web-token'];
    try {
        const expiredAt = jwt.decode(token).exp;
        const now = Math.floor(Date.now() / 1000);
        if (expiredAt < now) {
            console.log('Token yaroqsiz');
            return res.cookie("x-web-token", "", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
            })
                .status(200)
                .send(`<script>setTimeout(()=>{window.location.href = '/login';},10);</script>`);
        }
        const user = jwt.verify(token, jwt_my_key);
        // console.log(user);
        if (!user.rolePath.includes(originalUrl)) {
            console.log("no", user.rolePath, originalUrl);
            return res.cookie("x-web-token", "", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
            })
                .status(200)
                .send(`<script>setTimeout(()=>{window.location.href = '/login';},10);</script>`);
        }
        
        req.user = {...user,bolimlar:generateBolimlar(user)};
        // console.log(req.user);
        return next();
    } catch (err) {
        console.log(err);
        return res.send(`<script>setTimeout(()=>{window.location.href = '/login';},1);</script>`);
    }
}

// const { message } = err;
// if (message == "jwt must be provided") {
//     return res.status(400).json({ error: "web token jonatilmagan!" })
// } else {
//     console.log(err);
//     return res.status(401).json({ error: "ushbu foydalanuvchi autorizatsiya qilmagan!" })
// }

function generateBolimlar(user){
    let bolimlar = {}
    if (user.rolePath.includes("/role")) {
        bolimlar.role = ChekPathPermissions("/role",user.rolePath);
    }
    if (user.rolePath.includes("/user")) {
        bolimlar.user = ChekPathPermissions("/user",user.rolePath);
    }
    if (user.rolePath.includes("/task")) {
        bolimlar.task = ChekPathPermissions("/task",user.rolePath);
    }
    if (user.rolePath.includes("/topic")) {
        bolimlar.topic = ChekPathPermissions("/topic",user.rolePath);
    }
    if (user.rolePath.includes("/device")) {
        bolimlar.device = ChekPathPermissions("/device",user.rolePath);
    }
    if (user.rolePath.includes("/test")) {
        bolimlar.test = true;
    }
    return {...bolimlar}
}
function ChekPathPermissions(path, array) {
    let ChPP = {
        update: false,
        deletes: false,
        deletesAll: false,
        add: false,
        view: false,
    };
    if (array.includes(path + "/update")) {
        ChPP.update = true;
    }
    if (array.includes(path + "/delete")) {
        ChPP.deletes = true;
    }
    if (array.includes(path + "/all/delete")) {
        ChPP.deletesAll = true;
    }
    if (array.includes(path + "/add")) {
        ChPP.add = true;
    }
    if (array.includes(path + "/view")) {
        ChPP.view = true;
    }
    return { ...ChPP };
}
function removeTrailingNumber(str) {
    return str.replace(/\/\d+$/, '');
}