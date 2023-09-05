import { hashPassword,comparepassword } from "./../helpers/authHelper.js";
import userModel from "../models/userModel.js"
import JWT from 'jsonwebtoken'
export  const registerController=async(req,res)=>{

    try{
         const{name,email,password,phone,address,question}=req.body;
         //validation
         if(!name){
            return res.send({message:'Name is required'})
         }
         if(!email){
            return res.send({message:'Email is required'})
         }
         if(!password){
            return res.send({message:'password is required'})
         }
         if(!phone){
            return res.send({message:'Phone no. is required'})
         }
         if(!address){
            return res.send({message:'address is required'})
         }
         if(!question){
            return res.send({message:'address is required'})
         }
         //existing user
         const existing_user=await userModel.findOne({email})
         //search user
         if(existing_user)
         return res.status(200).send({
        success:false,
        message:'already registered',
        })
        //register user
        const hashedpassword=await hashPassword(password)
        //save
        const user=await new userModel({name,email,password:hashedpassword,phone,address,question}).save();
        res.status(201).send({
            success:true,
            message:"user registered successfully",user 
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in registration",error
        })
    }
}

//login
export const loginController=async(req,res)=>{
   try{
       const{email,password}=req.body;
       //validation
       if(!email || !password){
         return res.status(404).send({
            success:false,
            message:"incorrect email or password"
         })
         }
       const user=await userModel.findOne({email})
       if(!user){
         return res.status(404).send({
            success:false,
            message:"email is not registered"
         })
       }
       const match =await comparepassword(password,user.password)
       if(!match){
         return res.status(200).send({
            success:false,
            message:"invalid password"
         })
       }
       const token=await JWT.sign({_id:user._id},process.env.JWT_SECRET)
       res.status(200).send({
         success:true,
         message:'login successfully',
         user:{
            name:user.name,
            email:user.email,
            phone:user.phone,
            address:user.address,
            role:user.role,
         },
         token
       })
   }catch(error){
      console.log(error)
      res.status(500).send({
         success:false,
         message:'Error in login',
         error
      })
   }
   

}

//test controller
export const testController=async(req,res)=>{
res.send("protected")
}

//forget password
export const forgotPasswordController=async(req,res)=>{
   try{
     const [email,question,newpassword]=req.body();
     if(!email){
      res.status(400).send({message:'email is required'})
     }
     if(!question){
      res.status(400).send({message:'question is required'})
     }
     if(!newpassword){
      res.status(400).send({message:'new password is required'})
     }
     //check
     const user = await userModel.findOne({email,question})
     if(!user){
      res.status(400).send({
         success:false,
         message:"invalid user or question "
      })
     }
     const hashed=await hashPassword(newpassword)
     await userModel.findByIdAndUpdate(user._id,{password:hashed})
     res.status(200).send({
      success:true,
      message:"password reset successfully"
     })

   }
   catch(error){
      console.log(error)
      res.status(500).send({
         success:false,
         message:'Something went wrong ',
         error
      })
   }
}

//update user
export const updateProfileController=async(req,res)=>{
   try{
const {name,email,password,address,phone}=req.body
const user=await userModel.findById(req.user._id)
if(password && password.length<6){
   return res.json({error:'password is required and it must be minimum 6 characters'})
}
const hashedpassword=password? await hashPassword(password):undefined
const updateduser=await userModel.findByIdAndUpdate(req.user._id,{
name:name || user.name,
password:hashedpassword || user.password,
phone:phone || user.phone,
address:address || user.address
},{new:true})
res.status(200).send({
   success:true,
   message:'profile updated',updateduser
})
   }catch(error){
      console.log(error)
      res.status(500).send({
         success:false,
         message:'Something went wrong in updating user ',
         error
      })
   }
}