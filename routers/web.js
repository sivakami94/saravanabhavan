
const homecontrollers=require("../apps/http/controllers/homecontrollers")
const authcontrollers=require("../apps/http/controllers/authcontrollers")
const cartcontrollers=require("../apps/http/controllers/cartcontrollers")
function initroute(app)
{
    app.get('/', homecontrollers().index)

    app.get('/login', authcontrollers().login)

    app.get('/register', authcontrollers().register)

    app.get('/cart', cartcontrollers().index)
    app.post('/update-cart',cartcontrollers().update)
}

module.exports=initroute