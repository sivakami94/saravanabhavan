
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

//maps
const mbxGeocoding=require("@mapbox/mapbox-sdk/services/geocoding")
const Mapbox_token=process.env.mapbox_token;
const geocoder= mbxGeocoding({accessToken:Mapbox_token})
//
const crypto=require("crypto");
const Razorpay=require("razorpay")
const { session } = require("passport")
const instance=new Razorpay({
    key_id:process.env.key_id,
    key_secret:process.env.key_secret
});
function initroute(app)
{
    app.get('/',authcontrollers().login)
    app.post('/',authcontrollers().postLogin)
    
    app.get('/register',authcontrollers().register)
    app.post('/register',authcontrollers().postregister)
    app.post('/logout',authcontrollers().logout)

    app.get('/menu',guest,homecontrollers().index)
    app.get('/cart',guest,cartcontrollers().index)
   
    app.post('/add-cart',cartcontrollers().add)
    app.post('/minus-cart',cartcontrollers().minus)

    //customer routes
    app.post('/orders',ordercontrollers().store)
    app.get('/admin/orders',ordercontrollers().index)
     
    //Admin routes
    app.get("/admin/new",newitems().new)
    
    app.post("/admin/new",async(req, res)=>{
        if(req.body.available===undefined)
         {
              req.body.available=false
         }
        else{
               req.body.available=true
           }
        const data=await Menu.create(req.body);
       
        res.redirect('/admin/new')
    })
    app.get("/admin/:id",async(req,res)=>{
        const {id}=req.params;
        const shows=await Menu.find({});
        res.render("admin/show",{shows:shows})

    })
   app.get("/admin/:id/edit",async(req,res)=>{
       const{id}=req.params;
      const edit=await Menu.findById(id);
      res.render("admin/edit",{edit:edit})
   })
   app.put("/admin/:id",async(req,res)=>{
    const{id}=req.params;
   if(req.body.available===undefined)
   {
    req.body.available=false
   }
   else{
       req.body.available=true
   }
   console.log(req.body)
      const update=await Menu.findByIdAndUpdate(id,req.body,{runValidators:true,new:true}) 
       res.redirect('/admin/show')
    })
    app.delete("/admin/:id",async(req,res)=>{
        const{id}=req.params;
        const del=await Menu.findByIdAndDelete(id);
       res.redirect("/admin/show")
    })
 
   app.get("/payment",(req,res)=>{
       res.render("payment",{key:process.env.key_id});
      
   });
   app.post("/api/payment/order",(req,res)=>{
       params=req.body.params;
       console.log(params)
       instance.orders
         .create(params)
         .then((data)=>{
             console.log(data)
             res.send({sub: data,status:"success"});
           
            
         })
         .catch((error)=>{
            res.send({sub:error,status:"failed"});
         });
     
   });

   app.post("/api/payment/verify",(req,res)=>{
       body=req.body.razorpay_order_id +"|" +req.body.razorpay_payment_id;
      // var expectedSignature=crypto
      // .createHmac("sga256",process.env.key_secret)
      // .update(body.toString())
      // .digest("hex")
       //console.log("sig"+ req.body.razorpay_signature)
      // console.log("sig"+ expectedSignature)
      // var response={status:"failure"};
     //  if(expectedSignature=== req.body.razorpay_signature)
     //  {
     //      response={status:"success"};
          return res.redirect("/menu")
     //  }
     //   res.send(response)
    })
}

module.exports=initroute