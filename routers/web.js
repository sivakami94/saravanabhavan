
const homecontrollers=require("../apps/http/controllers/homecontrollers")
const authcontrollers=require("../apps/http/controllers/authcontrollers")
const cartcontrollers=require("../apps/http/controllers/customers/cartcontrollers")
const ordercontrollers=require("../apps/http/controllers/customers/ordercontrollers")
const newitems=require("../apps/http/controllers/admin/newitems")
const Adminordercontrollers=require("../apps/http/controllers/admin/ordercontrollers")
//middlewares
const guest=require('../apps/http/middleware/guest')
const auth=require("../apps/http/middleware/auth")
const admin=require("../apps/http/middleware/admin")
const { request } = require("express")

//models
const Menu = require('../apps/models/menu')

function initroute(app)
{
   
    app.get('/',authcontrollers().login)
    app.post('/',authcontrollers().postLogin)
    
    app.get('/register',authcontrollers().register)
    app.post('/register',authcontrollers().postregister)
    app.post('/logout',authcontrollers().logout)

   
    app.get('/menu',guest,homecontrollers().index)
    app.get('/cart',cartcontrollers().index)
    app.post('/add-cart',cartcontrollers().add)
    app.post('/minus-cart',cartcontrollers().minus)

    //customer routes
    app.post('/orders',ordercontrollers().store)
    app.get('/orders',admin,ordercontrollers().index)
     
    //Admin routes
    app.get('/admin/orders',admin,Adminordercontrollers().index)
    app.get("/admin/new",admin,newitems().new)
    
    app.post("/admin/new",admin,async(req, res)=>{
        const data=await Menu.create(req.body);
       
        res.redirect('/admin/new')
    })
    
   
}

module.exports=initroute