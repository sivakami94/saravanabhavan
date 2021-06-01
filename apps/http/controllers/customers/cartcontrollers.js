
const { session } = require("passport")
const { update}=require("../../../models/menu")


function cartcontrollers(){
    return{
        index(req,res)
        {
            res.render("cart")
        },
        add(req,res){
        
        //  let cart={
           //   item: {
          //        saravanabhavanId:{item:saravanabhavanObject,qty:0},
           //   },
         //     totalQty:0,
         //     totalPrice:0
        //  }  

     if(!req.session.cart){
         req.session.cart={
                items:{ },
                totalQty:0,
                   totalPrice:0
           }
        }
        let cart=req.session.cart
      
//Check if item does not exist in cart
       if(!cart.items[req.body._id]){
             cart.items[req.body._id]={
                item:req.body,    
                 qty:1
            }
             cart.totalQty=cart.totalQty+1;
            cart.totalPrice=cart.totalPrice + req.body.price
      }
      else
      {
        cart.items[req.body._id].qty= cart.items[req.body._id].qty+1
          cart.totalQty=cart.totalQty+1
          cart.totalPrice=cart.totalPrice +req.body.price
       }
         
         return res.json({totalQty:req.session.cart.totalQty})
     
       },
       
       minus(req,res){
       //   let cart={
       //       item: {
        //          saravanabhavanId:{item:saravanabhavanObject,qty:0},
       //       },
       //       totalQty:0,
        //      totalPrice:0
       //   }  

       if(!req.session.cart){
            req.session.cart={
                items:{ },
                
                totalQty:0,
                   totalPrice:0
           }
        }
        let cart=req.session.cart
       
      
//Check if item does not exist in cart
     if(!cart.items[req.body._id]){
             cart.items[req.body._id]={
                item:req.body,   
                qty:-1
           }
        //    if(qty>0)
        //    {
     //        cart.totalQty=cart.totalQty-1;
       //   cart.totalPrice=cart.totalPrice-req.body.price
      //      }
     }
        
    
      
        if(cart.items[req.body._id].qty>=1)
        {
          cart.items[req.body._id].qty= cart.items[req.body._id].qty-1
          cart.totalQty=cart.totalQty-1
          cart.totalPrice=cart.totalPrice -req.body.price
          console.log("hi")
         }
       if(cart.items[req.body._id].totalQty==0)
       {
          delete req.session.cart
       }
         
            return res.json({totalQty:req.session.cart.totalQty})
      
      }
    }
}



module.exports=cartcontrollers