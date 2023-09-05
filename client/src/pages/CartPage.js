import React, { useState , useEffect   } from 'react'
import Layout from '../Components/layout/Layout'
import { useCart } from '../context/Cart'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import DropIn from 'braintree-web-drop-in-react'
import toast from 'react-hot-toast'
import axios from 'axios'
const CartPage = () => {
  const [auth,setAuth]=useAuth()
  const [cart,setCart]=useCart()
  const [clientToken,setClientToken]=useState('')
  const [instance,setInstance]=useState('')
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()


  //payment handle
  const handlePayment=async()=>{
  try {
    setLoading(true)
    const {nonce}=await instance.requestPaymentMethod()
    const {data}=await axios.post('hhttp://localhost:8000/braintree/payment',{
      nonce,cart
    })
    setLoading(false)
    localStorage.removeItem('cart')
    setCart([])
    navigate('/Dashboard/orders')
    toast.success('Payment successfull!!')
  } catch (error) {
    console.log(error)
    setLoading(false)
  }
  }

//total price
const totalPrice=()=>{
  try{
let total=0;
cart.map((item)=>{
  total=total+item.price
})
return total

  }catch(error){
    console.log(error)
  }
}

  //delete item
const removeCartItem=(pid)=>{
try{
let myCart = [...cart]
let index=myCart.findIndex(( item)=>item._id===pid)
myCart.splice(index,1);
setCart(myCart)
localStorage.setItem('cart',JSON.stringify(myCart))
}catch(error){
  console.log(error)
}
  }

  //get payment gateway

  const getToken=async()=>{
    try {
      const {data}=await axios.get('http://localhost:8000/braintree/token')
      setClientToken(data?.clientToken)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getToken()
  },[auth?.token])
  return (
   <Layout>
    <div className='container'>
        <div className='row'>
            <div className='col-md-12'>
             <h2 className='text-center bg-light p-2 mb-2'>
              {
                `Hello ${auth?.token && auth?.user?.name}`
              }
             </h2>
             <h4 className='text-center'>
               {/* {
                cart?.length>0
                ? `You have ${cart.length} items in your cart ${auth?.token? " " :  'please login to check out'} `:'your cart is empty'
               } */}
                 {
               auth?.token
                ? ` ${  cart?.length>0 ?`You have ${cart.length} items in your cart`  : 'your cart is empty'} `:'please login to check out'
               } 
             </h4>
            </div>
        </div>
        <div className='row m-3'>
          <div className='col-md-6 '>
            <div className='row'>
              {
                cart?.map((p)=>(
                  <div className='row mb-2 card flex-row p-3'>
                    <div className='col-md-4 '>
                    <img
                    src={`http://localhost:8000/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                    </div>
                      <div className='col-md-8'>
                         <h3 className='mb-2'>{p.name}</h3>
                         <p className='mb-2'>{p.description.substring(0,30)}</p>
                         <p className='mb-2'>Price: {p.price}</p>
                         <button className='btn btn-danger btn-sm' onClick={()=>removeCartItem(p._id)}>Remove</button>
                      </div>
                   
                  </div>
                ))
              }
            </div>
          </div>
         <div className='col-md-4'>
            {/* { cart?.length>0?""
            ":""
} */}    
           <h4>Cart Summary</h4>
           <p>Total | Checkout | Payment</p>
           <hr/>
           <h5 className='mb-5'>Total : Rs {totalPrice()}</h5>
         
      

{auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h6>{auth?.user?.address}</h6>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/Dashboard/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/Dashboard/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Plase Login to checkout
                    </button>
                  )}
                </div>
              )} 
              <div className='mt-3'>
                  {
                    !clientToken || !cart?.length?(''):(
                      <>
                        <DropIn
              options={{
                authorization:clientToken,
                paypal:{
                  flow:'vault'
                }
              }
            }
            onInstance={instance=>setInstance(instance)}
             />
             <button className='btn btn-primary' onClick={handlePayment} disabled={!loading || !instance || !auth?.user?.address}>
              {loading?'Processing..':"Make payment"}
              </button>
                      </>
                    )
                  }
           
              </div>
             </div> 
        </div>
    </div>
   </Layout>
  )
}

export default CartPage