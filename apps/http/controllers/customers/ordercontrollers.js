const Order=require("../../../models/order")
const moment=require("moment")


function ordercontrollers(){
    return{
       async store(req,res)
        {
         const {location,door,line1,line2,landmark, phone,}=req.body
          if(!door ||!line1 ||!phone ||!location )
          {
              req.flash('error',"All fields are required")
              return res.redirect("/cart")
          }
         
          const orders=await new Order({
              customerId:req.user._id,
              items:req.session.cart.items,
              price:req.session.cart.totalPrice,
              location,
              door,
              line1,
              line2,
              landmark,
              phone,
          })
          orders.save().then(result=>{
               req.flash('success','Order placed successfully')
             
                return res.redirect('/payment') 
               
              
          }).catch(err=>{
              req.flash('error','something went wrong')
              return res.redirect('/cart')
          })
        
       },
      async index(req,res){
       
           const orders=await Order.find().sort({createdAt:-1});
            
          
            res.render('admin/orders',{ orders: orders ,moment:moment})
       }
           
       
      

    }
}


module.exports=ordercontrollers