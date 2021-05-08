const Order=require("../../../models/order")
const moment=require("moment")
function ordercontrollers(){
    return{
        store(req,res)
        {
         const { phone,address}=req.body
          if(!phone ||!address)
          {
              req.flash('error',"All fields are required")
              return res.redirect("/cart")
          }

          const orders=new Order({
              customerId:req.user._id,
              items:req.session.cart.items,
              phone,
              address
          })
          orders.save().then(result=>{
               req.flash('success','Order placed successfully')
               delete req.session.cart
               return res.redirect('/menu')
          }).catch(err=>{
              req.flash('error','something went wrong')
              return res.redirect('/cart')
          })
       },
      async index(req,res){
         
           const orders=await Order.find({customerId: req.user._id},
            null,
            { sort: {'createdAt':-1}  })
            res.render('customer/orders',{ orders: orders ,moment:moment})
       }
           
       
      

    }
}


module.exports=ordercontrollers