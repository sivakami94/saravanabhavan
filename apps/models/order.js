const mongoose =require("mongoose")
const Schema = mongoose.Schema

const orderSchema=new Schema({
   customerId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'User',
              required:true
              },
    items:{type:Object,required : true},
    price:{type:Number,required:true},
    phone:{type:Number,required : true},
    location:{type:String,required : true},
    door:{type:String,required : true},
    line1:{type:String,required : true},
    line2:{type:String},
    landmark:{type:String},
    paymentType:{type:String,default:'COD'},
    status:{type:String, default: 'order_placed'},
},{ timestamps:true })

module.exports= mongoose.model('Order',orderSchema)