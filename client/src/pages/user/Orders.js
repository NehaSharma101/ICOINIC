import React from 'react'
import Usermenu from './Usermenu'
import Layout from '../../Components/layout/Layout'

const Orders = () => {
  return (
    <Layout>
    <div className='container-fluid m-3 p-3s'>
     <div className='row'>
       <div className='col-md-3 '>
       <Usermenu/>
       </div>
       <div className='col-md-9'>
        <h2>Orders</h2>
       </div>
     </div>
    </div>
   </Layout>
  )
}

export default Orders