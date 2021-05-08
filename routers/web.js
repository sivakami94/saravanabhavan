
const homecontrollers=require("../apps/http/controllers/homecontrollers")
const authcontrollers=require("../apps/http/controllers/authcontrollers")
const cartcontrollers=require("../apps/http/controllers/customers/cartcontrollers")
const ordercontrollers=require("../apps/http/controllers/customers/ordercontrollers")

const Adminordercontrollers=require("../apps/http/controllers/admin/ordercontrollers")
//middlewares
//const guest=require('../apps/http/middleware/guest')
const auth=require("../apps/http/middleware/auth")
const admin=require("../apps/http/middleware/admin")

function initroute(app)
{
    app.get('/', authcontrollers().login)
    app.post('/',authcontrollers().postLogin)
    app.get('/register', authcontrollers().register)
    app.post('/register', authcontrollers().postregister)
    app.post('/logout',authcontrollers().logout)

    app.get('/menu', homecontrollers().index)

    app.get('/cart', cartcontrollers().index)
    app.post('/update-cart',cartcontrollers().update)

    //customer routes
    app.post('/orders',auth,ordercontrollers().store)
    app.get('/customer/orders',auth,ordercontrollers().index)

    //Admin routes
    app.get('/admin/orders',admin,Adminordercontrollers().index)
}

module.exports=initroute