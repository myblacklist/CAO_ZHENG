const express = require("express");
const cookie = require("cookie-parser");
const session = require("express-session");
const router = require("./route/router.js");
const app = express();
const ejs = require('ejs');

app.use(cookie());
app.engine('html',ejs.__express);
app.set('view engine', 'html');
app.use(express.static("./public"));
app.use(session({ secret: '12345', cookie: { maxAge: 1000*60*30 }}));

app.get("/login",router.login);
app.post("/login",router.plogin);

app.get("/",router.index);
app.get("/index",router.index);

app.get("/search",router.gsearch);
app.post("/search",router.search);
app.post("/updateThing",router.updateThing);

app.post("/newList",router.newList);
app.get("/deleteList",router.deleteList);

app.post("/addThing",router.addThing);
app.get("/deleteThing",router.deleteThing);
app.get("/removeThing",router.removeThing);

app.get("/logout",router.logout);
app.listen(3000);
console.log("服务器已经启动");
