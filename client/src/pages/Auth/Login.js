import React , {useState} from 'react'
import Layout from '../../Components/layout/Layout'
import toast  from 'react-hot-toast';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const Login = () => {
    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')
    const [auth,setauth]=useAuth()
    const navigate=useNavigate()
    const handleSubmit =async(e)=>{
        e.preventDefault()
        try{
         const res=await axios.post('http://localhost:8000/login',{email,password})
        if(res.data.success){
          console.log(email,password)
          toast.success(res.data.message)
          setauth({
            ...auth,
            user:res.data.user,
            token:res.data.token 
          })
          localStorage.setItem('auth',JSON.stringify(res.data))
          navigate('/')
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
    <div>
        <Layout>
        <div className='register'>
        <h4 className='register-heading'>Login</h4>
   <form className='m-3' onSubmit={handleSubmit} >
  
    <div className="mb-3 ">
    <label htmlFor="exampleInputEmail1" className="form-label">Email </label>
    <input type="email" className="form-control" id="exampleInputEmail1"  value={email} onChange={(e)=>setemail(e.target.value)}required/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e)=>setpassword(e.target.value)}required />
  </div>
  <button type="button" className="btn btn-primary" onClick={()=>{navigate('/forgot-password')}}>Forgot password?</button>
  <button type="submit" className="btn btn-primary m-3">Login</button>
</form>
</div>

     </Layout>

        
    </div>
  )
}

export default Login