const order = require("../../../models/order")
const moment=require("moment")
const axios=require("axios")


function ordercontrollers()
{
    return{
        index(req,res)
        {
           order.find({status:{$ne: 'completed'}},null,{sort:{'createdAt':-1}})
           .populate('customerId','-password').exec((err,orders) =>{
              
           if(req.xhr)
           {
               return res.json(orders)
              
           }
           else
           {
            let orders=[]
       
           
            axios.get('/admin/orders',{
                headers:{
                    "X-Requested-With":"XMLHttpRequest"
                }
            }).then(res => {
               orders=res.data
               console.log(orders)
              // return res.render('admin/orders',{orders:orders},{moment:moment})
            }).catch(err =>{
                console.log(err)
            })
              
           }
        })
     }
  }
}

module.exports=ordercontrollers