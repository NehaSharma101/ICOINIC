import mongoose from "mongoose";
const orderSchema=new mongoose.Schema({
   products:[{
    type:mongoose.ObjectId,
    ref:'Product'
   }],
   payment:{},
   buyer:{
    type:mongoose.ObjectId,
    ref:'User'
   },
   status:{
    type:String,
    default:'Not processed',
    enum:['Not processed','Processing','Shipped','Delivered']
   }
},{timestamps:true})
export default mongoose.model('Order',orderSchema)