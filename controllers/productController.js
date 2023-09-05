import productModel from '../models/productModel.js'
import categoryModel from '../models/categoryModel.js'
import orderModel from '../models/orderModel.js'
import slugify from "slugify";
import fs from 'fs'
import braintree from 'braintree';
import dotenv from 'dotenv';

dotenv.config();
//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});


//create
export const createProductController=async(req,res)=>{
    try{
     const {name,slug,description,price,category,quantity, shipping} = req.fields
     const {photo}=req.files
     switch(true){
        case !name:
            return res.status(500).send({
                success:false,
                message:'name is required'
            })
        case !description:
            return res.status(500).send({
                    success:false,
                    message:'description is required'
            })
        case !photo || photo.size>1000000:
            return res.status(500).send({
                    success:false,
                    message: 'photo is required and its size must be less than 1 mb'
            })
         case !price:
            return res.status(500).send({
                    success:false,
                    message:'price is required'
            })
        case !category:
            return res.status(500).send({
                    success:false,
                    message:'category is required'
            })
        case !quantity:
            return res.status(500).send({
                success:false,
                message:'quantity is required'
            })
        
     }
     const product = await new productModel({...req.fields,slug:slugify(name)})
     if(photo){
        product.photo.data=fs.readFileSync(photo.path)
        product.photo.contentType=photo.type
     }
     await product.save()
     res.status(200).send({
        success:true,
        message:'product listed successfully'
    })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in creating product',error
        })
    }
}

//get product
export const getProductController=async(req,res)=>{
    try{
     const product= await productModel.find().populate('category').select('-photo').limit(12).sort({createdAt:-1})
     res.status(200).send({
        success:true,
        count:product.length,
        message:'successfull',product
    })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in getting product',error
        })
    }
}

//get single product

export const getSingleProductController = async(req,res)=>{
    try{
    //  const {slug}=req.params
     const product = await productModel.findOne({slug: req.params.slug}).select('-photo').populate('category')
     console.log(product)
     res.status(200).send({
        success:true,
        message:'successfull',product
    })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in getting single product',error
        })
    }
}

// get product photo
export const getProductPhotoController=async(req,res)=>{
    try{
     const product=await productModel.findById(req.params.pid).select('photo')
     if(product.photo.data){
        res.set('Content-type',product.photo.contentType)
     res.status(200).send(product.photo.data)
     }
    
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in getting product photo',error
        })
    }
}

//delete product
export const deleteProductController=async(req,res)=>{
    try{
       await productModel.findByIdAndDelete(req.params.pid).select('-photo')
       res.status(200).send({
        success:true,
        message:'successfull'
    })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in deleting product',error
        })
    }
}

//update
export const updateProductController = async(req,res)=>{
    try{
        const {name,slug,description,price,category,quantity, shipping} = req.fields
        const {photo}=req.files
        switch(true){
           case !name:
               return res.status(500).send({
                   success:false,
                   message:'name is required'
               })
           case !description:
               return res.status(500).send({
                       success:false,
                       message:'description is required'
               })
           case photo && photo.size>1000000:
               return res.status(500).send({
                       success:false,
                       message: 'photo is required and its size must be less than 1 mb'
               })
            case !price:
               return res.status(500).send({
                       success:false,
                       message:'price is required'
               })
           case !category:
               return res.status(500).send({
                       success:false,
                       message:'category is required'
               })
           case !quantity:
               return res.status(500).send({
                   success:false,
                   message:'quantity is required'
               })
           
        }
        const product = await productModel.findByIdAndUpdate(req.params.pid,{
            ...req.fields,slug:slugify(name)},{new:true})
        if(photo){
           product.photo.data=fs.readFileSync(photo.path)
           product.photo.contentType=photo.type
        }
        await product.save()
        res.status(200).send({
           success:true,
           message:'product updated successfully'
       })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in updating product',error
        })
    }
}


//filter controller
export const productFilterController=async(req,res)=>{
    try{
        const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in filtering product',error
        })
    }
}

//product count controller
export const productCountController=async(req,res)=>{
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
          success: true,
          total,
        });
      } catch (error) {
        console.log(error);
        res.status(400).send({
          message: "Error in product count",
          error,
          success: false,
        });
      }
}

// productListController
export const productListController = async (req, res) => {
    try {
      const perPage = 6;
      const page = req.params.page ? req.params.page : 1;
      const products = await productModel
        .find({})
        .select("-photo")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1 });
      res.status(200).send({
        success: true,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "error in per page ctrl",
        error,
      });
    }
  };

  //search conttroller
export const searchProductController = async (req, res) => {
    try {
      const { keyword } = req.params;
      const resutls = await productModel
        .find({
          $or: [
            { name: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
          ],
        })
        .select("-photo");
      res.json(resutls);
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error In Search Product API",
        error,
      });
    }
  };

  //product category controller
  export const productCategoryController = async (req, res) => {
    try {
      const category = await categoryModel.findOne({ slug: req.params.slug });
      const products = await productModel.find({ category }).populate("category");
      res.status(200).send({
        success: true,
        category,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        error,
        message: "Error While Getting products",
      });
    }
  };

  //payment gateway

  //token
  export const braintreeTokenController=async(req,res)=>{
    try{
        gateway.clientToken.generate({},function(err,response){
          if(err){
            res.status(500).send(err)
          }else{
            res.send(response)
          }
        })
    }catch(error){
      console.log(error)
    }
  }

  // payment

  export const braintreePaymentController=async(req,res)=>{
    try{
    const {cart,nonce}=req.body
    let total=0
    cart.map((i)=>{total+=i.price})

    let newTransaction=gateway.transaction.sale(
      {
        amount:total,
        paymentMethodNonce:nonce,
        options:{
          submitForSettlement:true
        }
      },  
      function(error,result){
            if(result){
              const order=new orderModel({
                  products:cart,
                  payment:result,
                  buyer:req.user._id

              }).save()
              res.json({ok:true})
            }else{
              res.status(500).send(
               { success:false,
                message:'something went wrong'}
              )
            }
      }
    )
    }catch(error){
      console.log(error)
    }
  }