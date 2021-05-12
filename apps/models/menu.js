const mongoose =require("mongoose")
const Schema=mongoose.Schema

const menuSchema=new Schema({
     category:{type:String,required:true},
    name:{ type :String ,required:true},
    image:{type:String, required:true},
    price:{ type :Number ,required:true}
     
    
})

module.exports=mongoose.model('Menu',menuSchema)