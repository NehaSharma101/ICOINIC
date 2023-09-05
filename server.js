import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import morgan from 'morgan';
import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryroute.js'
import productRoutes from './routes/productRoute.js'
import cors from 'cors'
import path from 'path'
//configure env
dotenv.config();
//configure database
connectDB();
//rest object
const app= express();
//middlewares
app.use(cors())
app.use(express.json());
app.use(morgan('dev'));
//routes
app.use(authRoutes)
app.use(categoryRoutes)
app.use(productRoutes)
// app.use(express.static(path.join(__dirname,'./client/build')))
//rest api
// app.get('/',(req,res)=>{
//     res.send("welcome to my ecommerce website")
// })
app.use('*',function(req,res){
res.sendFile(path.join(__dirname,'./client/build/index.html'))
})
//port
app.listen(process.env.PORT || 8000,()=>{
    console.log(`server started in ${process.env.MODE} mode  `);
})