import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
//create 

export const createCategoryController=async(req,res)=>{
    try{
       const {name}=req.body;
       if(!name){
        return res.status(401).send({
            success:false,
            message:'name is required'
        })
       }
       const existingCategory=await categoryModel.findOne({name})
       console.log(existingCategory)
       if(existingCategory){
        return res.status(401).send({
            success:false,
            message:'Category already exists',
        })
       }
       const category=await new categoryModel({name,slug:slugify(name)}).save()
       res.status(201).send({
        success:true,
        message:'New category created',
        category
       })
    }
    catch(error){
        console.log(error)
        res.status( 500).send({
            success:false,
            message:'something went wrong in category'
        })
    }

}
//update
export const updateCategoryController=async(req,res)=>{
    try{
        const {name}=req.body
        const {id}=req.params
        const category=await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.status(200).send({
            success:true,
            message:'updated successfully',category
        })
    }catch(error){
        res.status(500).send(
            {
                success:false,
                message:'error in updating category'
            }
        )
    }

}

//get all records
export const getCategoryController = async(req,res)=>{
    try{
        const allCategory=await categoryModel.find({})
        res.status(200).send({
            success:true,
            message:'All records',allCategory
        })

    }catch(error){
        res.status(500).send({
            success:false,
            message:'something went wrong '
        })
    }
}

//get single record
export const getSingleCategoryController=async(req,res)=>{
    try{
        const {name}=req.body
        const Category=await categoryModel.findOne({name})
        res.status(200).send({
            success:true,
            message:'Record',Category
        })

    }catch(error){
        res.status(500).send({
            success:false,
            message:'something went wrong '
        })
    }
}

//delete record

export const deleteCategoryController=async(req,res)=>{
    try{
        const {id}=req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:'successfully deleted'
        })

    }catch(error){
        res.status(500).send({
            success:false,
            message:'something went wrong '
        })
    }
}