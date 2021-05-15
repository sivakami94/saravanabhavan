
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

function initroute(app)
{
   
    app.get('/',guest,authcontrollers().login)
    app.post('/',authcontrollers().postLogin)
    
    app.get('/register',guest,authcontrollers().register)
    app.post('/register', authcontrollers().postregister)
    app.post('/logout',authcontrollers().logout)

   
    app.get('/menu', homecontrollers().index)
    app.get('/cart',cartcontrollers().index)
    app.post('/add-cart',cartcontrollers().add)
    app.post('/minus-cart',cartcontrollers().minus)

    //customer routes
    app.post('/orders',ordercontrollers().store)
    app.get('/orders',ordercontrollers().index)
     
    //Admin routes
    app.get('/admin/orders',admin,Adminordercontrollers().index)
    app.get("/admin/new",admin,newitems().new)
    app.post("admin/new",newitems().postnew)
    
   
}

module.exports=initroute