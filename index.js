const express = require('express');
const cookieParser = require("cookie-parser");
var auth = require("./middlewire/auth");
const jwt = require('jsonwebtoken');
// var document = require("./middlewire/document");
const port = 3000; // yoki istalgan boshqa port
const app = express();

const jwt_my_key = process.env.JWT_MY_KEY || "***OLIB-TASHLANDI***";
var auth = require("./middlewire/auth");

const taskRouter = require("./routers/task");
const roleRouter = require("./routers/role");
const deviceRouter = require("./routers/device");
const topicRouter = require("./routers/topic");
const userRouter = require("./routers/user");
const RHTRouter = require("./routers/_____role_has_task");
const DHTRouter = require("./routers/device_has_topic");

const authRouter = require("./routers/auth");

var db = require('./db/mongodb');

setInterval(async () => { db = await db }, 100);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/task', taskRouter)
app.use('/role', roleRouter)
app.use('/user', userRouter)
app.use('/api/RHT', RHTRouter)
app.use('/device', deviceRouter)
app.use('/topic', topicRouter)
app.use('/api/DHT', DHTRouter)
app.use('/test',auth,(req,res,next)=>{
  const token = jwt.sign({ 
    id:req.user.id,
    email:req.user.email,
    password:req.user.password
   }, jwt_my_key);
  res.render('public/pages/mqtt_test_client',{
    user:req.user,
    mqtt_url:"mqtt://localhost:7000",
    c:token
  })
})



app.use('/signout', async (req, res, next) => {
  return res
    .cookie("x-web-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .send(`<script>setTimeout(()=>{window.location.href = '/login';},10);</script>`);
})


app.use('/login', authRouter);

// Pug templateni sozlash
app.set('view engine', 'pug');
app.set('views', './views'); // Pug fayllarini joylash

// Static fayllarni servis qilish (masalan: css, js)
app.use(express.static('views/public'));
// app.use('/documents', document,async (req, res, next)=>{(await db).static.add(4);return next();},express.static('views/certifcate'));

app.get('/', auth,async (req, res) => {
  console.log("kirish amalga  oshdi!");
  // // console.log(bolimlar,!bolimlar.task && !bolimlar.role && !bolimlar.user);
  const actions = await (await db).action.getActionAll();
  // const static = await (await db).static.getStatic();
  let static = {};
  res.render('public/index',{
    static:static,
    user:req.user,
    actions:actions
  }); // 'login.pug' faylini ishlatish
});
// Login sahifasi uchun GET tarmoq so'rovini qo'llash
app.get('/login', (req, res) => {
  res.render('public/pages/login'); // 'login.pug' faylini ishlatish
});

// Serverni ishga tushirish


app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
// app.listen(port, () => {
//   console.log(`Server http://localhost:${port} portda ishlayapti...`);
// });
