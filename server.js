const express = require("express");
const app =express();
const ejs=require('ejs')
const path = require("path");
const expressLayout=require("express-ejs-layouts")
app.use(express.static('public'))
const mongoose=require("mongoose")


//database connection
const url="mongodb+srv://sivakami:sivakami@cluster0.tiwar.mongodb.net/test?authSource=admin&replicaSet=atlas-43t7rf-shard-0&readPreference=primary&ssl=true";
mongoose.connect(url,{useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology:true,
useFindAndModify :true});
const connection = mongoose.connection;
connection.once('open',()=> {
    console.log("Database connected...");
}).catch(err => {
    console.log("connection failed")
});

app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')
require("./routers/web")(app)

app.listen(3000, () => {
    console.log("server stated");
})