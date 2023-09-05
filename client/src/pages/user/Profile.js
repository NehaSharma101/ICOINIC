import React, { useState, useEffect } from 'react'
import Layout from '../../Components/layout/Layout'
import Usermenu from './Usermenu'
import { useAuth } from '../../context/auth'
import { toast } from 'react-hot-toast'
import axios from 'axios'
const Profile = () => {
  //context
  const [auth, setAuth] = useAuth()
  //state
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [phone, setphone] = useState('')
  const [address, setaddress] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const {data} = await axios.put('http://localhost:8000/profile', { name, email,password, phone, address })
      if(data?.error){
        toast.error(data?.error)
      }else{
        setAuth({...auth,user:data?.updateduser})
        let ls=localStorage.getItem("auth")
        ls=JSON.parse(ls)
        ls.user=data.updateduser
        localStorage.setItem('auth',JSON.stringify(ls))
        toast.success('profile updated successfully')
      }
    } catch (e) {
      console.log(e)
      toast.error('something went wrong')
    }

  }
  useEffect(() => {
    if (auth?.user) {
      const { name, email, phone, address } = auth.user;
      setname(name);
      setphone(phone);
      setaddress(address);
      setemail(email);
    }
  }, [auth?.user]);

  return (
    <Layout>
      <div className='container-fluid m-3 p-3s'>
        <div className='row'>
          <div className='col-md-3 '>
            <Usermenu />
          </div>
          <div className='col-md-9'>
            <div className='register'>
              <h4 className='register-heading'>User profile</h4>
              <h7>Enter the feilds you want to update</h7>
              <form className='m-3' onSubmit={handleSubmit}>
                <div className="mb-3 ">
                  <label htmlFor="exampleInputName1" className="form-label">Name</label>
                  <input type="text" className="form-control" id="exampleInputName1" value={name} onChange={(e) => setname(e.target.value)}  />
                </div>
                <div className="mb-3 ">
                  <label htmlFor="exampleInputEmail1" className="form-label">Email </label>
                  <input type="email" className="form-control " id="exampleInputEmail1" disabled value={email} onChange={(e) => setemail(e.target.value)}  />

                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                  <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setpassword(e.target.value)}  />
                </div>
                <div className="mb-3 ">
                  <label htmlFor="exampleInputPhone1" className="form-label">Phone</label>
                  <input type="number" className="form-control" id="exampleInputPhone1" value={phone} onChange={(e) => setphone(e.target.value)}  />

                </div>
                <div className="mb-3 ">
                  <label htmlFor="exampleInputAddress1" className="form-label">Address</label>
                  <input type="text" className="form-control" id="exampleInputAddress1" value={address} onChange={(e) => setaddress(e.target.value)} />

                </div>
               
                

                <button type="submit" className="btn btn-primary">Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile