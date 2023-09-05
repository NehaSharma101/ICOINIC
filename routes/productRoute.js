import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import { createProductController, 
    getProductController,
    getSingleProductController,
    getProductPhotoController,
    deleteProductController ,
    updateProductController,
    productFilterController,
    productCountController,
    productListController,
    searchProductController,
    productCategoryController,
    braintreeTokenController,
    braintreePaymentController
    } from '../controllers/productController.js'
import formidable from 'express-formidable'
const router=express.Router()

//routes

//create
router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController)
//get all
router.get('/get-product',getProductController)
//get single
router.get('/get-single-product/:slug',getSingleProductController)
//update
router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController)
//delete
router.delete('/delete-product/:pid',requireSignIn,isAdmin,deleteProductController)
//get product photo
router.get('/product-photo/:pid',getProductPhotoController)
//filter product
router.post('/product-filter',productFilterController)
//product count
router.get('/product-count',productCountController)
//product per page
router.get('/product-list/:page',productListController)
//search
router.get('/search/:keyword',searchProductController)

//braintree route
//token
router.get('/braintree/token',braintreeTokenController)
//payment
router.post('/braintree/payment',requireSignIn,braintreePaymentController)

export default router;