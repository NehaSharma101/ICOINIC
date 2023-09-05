
import React ,{useState,useEffect} from 'react'
import Layout from '../../Components/layout/Layout'
import AdminMenu from '../../Components/layout/AdminMenu'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import {Select} from 'antd'
import { useNavigate , useParams} from 'react-router-dom'

const {Option}=Select

const UpdateProduct = () => {
    const navigate=useNavigate()
    const params=useParams()
  const [categories,setcategories]=useState([])
  const [photo,setphoto]=useState("")
  const[name,setname]=useState("")
  const [description,setdescription]=useState("")
  const [price,setprice]=useState("")
  const [category,setcategory]=useState("")
  const [quantity,setquantity]=useState("")
  const [shipping,setshipping]=useState("")
  const [id,setid]=useState("")
//   console.log(photo)
//   get all product
const getAllproduct = async () => {
    try {
      const {data} =  await axios.get('http://localhost:8000/get-category')
      console.log(data)
      if (data.success) {
        setcategories(data.allCategory)
         console.log(data.allCategory)
      }
      
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong in getting cproduct')
    }
  }

  useEffect(() => {
    getAllproduct()
  }, [])
  //get single product
  const getSingleProduct=async()=>{
    try{
        const {data}=await axios.get(`http://localhost:8000/get-single-product/${params.slug}`)
        console.log(data);
        
        setname(data.product.name)
        setid(data.product._id)
        setdescription(data.product.description)
        setprice(data.product.price)
        setcategory(data.product.category._id)
        setquantity(data.product.quantity)
        setshipping(data.product.shipping)
        // const photo = await axios.get(`http://localhost:8000/product-photo/${data.product._id}`)
        // console.log(photo)
        // setphoto(photo)
    }catch(error){
        console.log(error)
    }
  }
  useEffect(() => {
    getSingleProduct()
    //estlint-disable-next-line
  }, [])

  //handle create
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      console.log(photo)
      const { data } =  await axios.put( `http://localhost:8000/update-product/${id}`,productData)
      if (data?.success) {
        toast.success("Product Updated Successfully");
        navigate("/products");
        
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
 

 //delete a product
 const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? Type yes or no ");
      if (answer=='no') return;
      const { data } = await axios.delete(
        `http://localhost:8000/delete-product/${id}`
      );
      toast.success("Product Deleted Succfully");
      navigate("/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
         <div className='container-fluid m-3 p-3s'>
    <div className='row'>
        <div className='col-md-3 '>
        <AdminMenu/>
        </div>
        <div className='col-md-9'>
         <h1>Update Product</h1>

         <div className='m-1 w-75'>
          <Select bordered={false} placeholder='select a category' 
          size='large' showSearch className='form-select m-3'
          onChange={(value)=>{setcategory(value)}} value={category}>
            {
              categories?.map((c)=>(
                <Option key={c._id} value={c._id}>{c.name}</Option>
              ))
            }

          </Select>
          <div className='mb-3 c'>
            <label className='btn btn-outline-secondary col-md-12'>
              {
                photo? photo.name : "Upload photo"
              }
              <input type='file' 
              name='photo'
               accept='image/*' 
               onChange={(e)=>setphoto(e.target.files[0])} 
               hidden />
            </label>

          </div>
          <div className='mb-3'>
            {
              photo ? (
                <div className='text-center'>
                  <img
                   src={URL.createObjectURL(photo)}
                   alt='product photo'
                   height={'200px'}
                   className='img img-responsive'
                   />

                </div>
                
              ):(
                <div className='text-center'>
                <img
                  src={`http://localhost:8000/product-photo/${id}`}
                  alt='product photo'
                  height={'200px'}
                  className='img img-responsive'
                  />
  
               </div> 
            )
            }

          </div>
          <div className='mb-3'>
            <input type='text'
              value={name}
              placeholder='write a name of the product'
              className='form-control'
              onChange={(e)=>setname(e.target.value)}
            />

          </div>
          <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setdescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setprice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setquantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="medium"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setshipping(value);
                  }}
                  value={shipping?'YES':'NO'}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary m-2" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
                <button className="btn btn-danger m-2" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
             </div>
             {/* <div className="mb-3">
              
             </div> */}
        </div>
      </div>
      </div>
      </div>
      </Layout>
  )
}

export default UpdateProduct