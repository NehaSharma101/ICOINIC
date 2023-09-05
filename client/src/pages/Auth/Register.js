import React , {useState}from 'react'
import Layout from '../../Components/layout/Layout'
import toast  from 'react-hot-toast';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name,setname]=useState('')
    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')
    const [phone,setphone]=useState('')
    const [address,setaddress]=useState('')
    const [question,setquestion]=useState('')
    const navigate=useNavigate()

    //form function
    const handleSubmit =async(e)=>{
      e.preventDefault()
      try{
       const res=await axios.post('http://localhost:8000/register',{name,email,password,phone,address,question})
      if(res.data.success){
        console.log(name,email,password,phone,address,question)
        toast.success(res.data.message)
        navigate('/login')
      }  
      else{
        toast.error(res.data.message)
      }
    }catch(e){
        console.log(e)
        toast.error('something went wrong')
      }
      
    }
  return (
   <Layout>
    <div className='register'>
        <h4 className='register-heading'>Registration Page</h4>
   <form className='m-3' onSubmit={handleSubmit}>
  <div className="mb-3 ">
  <label htmlFor="exampleInputName1" className="form-label">Name</label>
    <input type="text" className="form-control" id="exampleInputName1"  value={name} onChange={(e)=>setname(e.target.value)}required/>
    </div>
    <div className="mb-3 ">
    <label htmlFor="exampleInputEmail1" className="form-label">Email </label>
    <input type="email" className="form-control" id="exampleInputEmail1"  value={email} onChange={(e)=>setemail(e.target.value)}required/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e)=>setpassword(e.target.value)}required />
  </div>
  <div className="mb-3 ">
    <label htmlFor="exampleInputPhone1" className="form-label">Phone</label>
    <input type="number" className="form-control" id="exampleInputPhone1"  value={phone} onChange={(e)=>setphone(e.target.value)}required/>
    
  </div>
  <div className="mb-3 ">
    <label htmlFor="exampleInputAddress1" className="form-label">Address</label>
    <input type="text" className="form-control" id="exampleInputAddress1"  value={address} onChange={(e)=>setaddress(e.target.value)}required />
    
  </div>
  <div className="mb-3 ">
    <label htmlFor="exampleInputquestion1" className="form-label">Secret question</label>
    <input type="text" className="form-control" id="exampleInputquestion1"  placeholder="what's your nick name" value={question} onChange={(e)=>setquestion(e.target.value)}required />
    
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1" required/>
    <label className="form-check-label " htmlFor="exampleCheck1" >Terms and conditions</label>
  </div>
  
  <button type="submit" className="btn btn-primary">Register</button>
</form>
</div>

     </Layout>
  )
}

export default Register