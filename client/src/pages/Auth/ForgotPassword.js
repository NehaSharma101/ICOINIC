import React , {useState} from 'react'
import Layout from '../../Components/layout/Layout'
import toast  from 'react-hot-toast';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email,setemail]=useState('')
  const [newpassword,setnewpassword]=useState('')
  const [question,setquestion]=useState('')
  const navigate=useNavigate()
  const handleSubmit =async(e)=>{
      e.preventDefault()
      try{
       const res=await axios.post('http://localhost:8000/forgot-password',{email,newpassword,question})
      if(res.data.success){
        console.log(email,newpassword)
        toast.success(res.data.message)
       
        navigate('/login')
      }  
      else{
        toast.error(res.data.message)
      }
    }catch(e){
        console.log(e)
        toast.error('something went wrong ')
      }
      
    }
  return (
    <Layout>
      <div className='register'>
        <h4 className='register-heading'>Reset Password</h4>
   <form className='m-3' onSubmit={handleSubmit} >
  
    <div className="mb-3 ">
    <label htmlFor="exampleInputEmail1" className="form-label">Email </label>
    <input type="email" className="form-control" id="exampleInputEmail1"  value={email} onChange={(e)=>setemail(e.target.value)}required/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputquestion1" className="form-label">Secret question</label>
    <input type="text" className="form-control" id="exampleInputquestion1" value={question} onChange={(e)=>setquestion(e.target.value)}required />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputnewpassword1" className="form-label">New password</label>
    <input type="password" className="form-control" id="exampleInputnewpassword1" value={newpassword} onChange={(e)=>setnewpassword(e.target.value)}required />
  </div>
  <button type="submit" className="btn btn-primary m-3">Reset password</button>
</form>
</div>
      </Layout>
  )
}

export default ForgotPassword