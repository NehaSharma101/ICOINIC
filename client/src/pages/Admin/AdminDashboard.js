import React from 'react'
import Layout from '../../Components/layout/Layout.js'
import AdminMenu from '../../Components/layout/AdminMenu.js'
import { useAuth } from '../../context/auth.js'
const AdminDashboard = () => {
  const [auth]=useAuth()
  return (
    <Layout>
     <div className='container-fluid m-3 p-3s'>
      <div className='row'>
        <div className='col-md-3 '>
        <AdminMenu/>
        </div>
        <div className='col-md-9'>
          <div className='card w-75 p-3'>
              <h2>{auth?.user?.name}</h2>
              <h2>{auth?.user?.email}</h2>
              <h2>{auth?.user?.phone}</h2>

          </div>
        </div>
      </div>
     </div>
    </Layout>
    
  )
}

export default AdminDashboard