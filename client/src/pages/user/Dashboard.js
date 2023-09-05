import React from 'react'
import Layout from '../../Components/layout/Layout.js'
import Usermenu from './Usermenu.js'
import { useAuth } from '../../context/auth.js'
const Dashboard = () => {
  const [auth]=useAuth()
  return (
    <Layout>
    <div className='container-fluid m-3 p-3s'>
     <div className='row'>
       <div className='col-md-3 '>
       <Usermenu/>
       </div>
       <div className='col-md-9'>
       <div className='card w-75 p-3'>
        <h3>{auth?.user?.name}</h3>
         <h3>{auth?.user?.email}</h3>
         <h3>{auth?.user?.phone}</h3>
         <h3>{auth?.user?.address}</h3>
       </div>
       </div>
     </div>
    </div>
   </Layout>
  )
}

export default Dashboard