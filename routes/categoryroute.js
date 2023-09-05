import  express  from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createCategoryController,
    updateCategoryController , 
    getCategoryController,
    getSingleCategoryController,
deleteCategoryController } from "../controllers/categoryController.js";
const router=express.Router()

//routes
//create
router.post('/create-category',requireSignIn,isAdmin,createCategoryController)

//update
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController)

//get 
router.get('/get-category',getCategoryController)

//get single category
router.get('/get-single-category',getSingleCategoryController)

//delete single category
router.delete('/delete-category/:id', requireSignIn,isAdmin,deleteCategoryController)
export default router;