require("dotenv").config()
const express = require("express");
const app =express();
const path = require("path");
const expressLayout=require("express-ejs-layouts")
const MethodOverride=require("method-override")

const mongoose=require("mongoose")
const session=require("express-session")
const flash=require("express-flash")
const MongoDbStore=require("connect-mongo")(session)
const passport=require("passport")

//payments
const cors=require("cors");
const crypto=require("crypto");
const Razorpay=require("razorpay")


//Middlewares
app.use(cors());



//database connection
//"mongodb://localhost:27017/saravanabhavan"||
const url="mongodb://localhost:27017/saravanabhavan"||process.env.db_url;
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true,'useFindAndModify': false,'useCreateIndex': true});
const connection = mongoose.connection;
connection.once('open',()=> {
    console.log("Database connected...");
}).catch(err => {
    console.log("connection failed")
});


//session store
let mongoStore= new MongoDbStore({
                     mongooseConnection:connection,
                     collection:'sessions'
              })
//Session config
app.use(session({
    secret:process.env.COOKIE_SECRET,
    resave:false,
    store:mongoStore,
    saveUninitialized:false,
    cookie:{maxAge:1000*60*60*24} //24 hours
}))
//passport config
const passportInit =require("./apps/config/passport")
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
//Assert
app.use(express.static("public"))
app.use(express.urlencoded({extended: false}))
app.use(MethodOverride('_method'))
app.use(express.json())


//Global middleware
app.use((req,res,next)=>{
    res.locals.session=req.session
    res.locals.user=req.user
    next()
})
app.use(expressLayout)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/resources/views'))
require("./routers/web")(app)



app.listen(process.env.PORT||3000, () => {
    console.log("server stated");
})