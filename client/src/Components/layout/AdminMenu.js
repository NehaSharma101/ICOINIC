import React from 'react'
import { NavLink } from 'react-router-dom'
const AdminMenu = () => {
  return (
    <>
    <div className='text-center'>
    <div className="list-group">
  <NavLink  to = '/admindashboard' className="list-group-item list-group-item-action " >
    Admin Panel
  </NavLink>
  <NavLink to='/admin-dashboard/create-category' className="list-group-item list-group-item-action">Create category</NavLink>
  <NavLink to='/admin-dashboard/create-product' className="list-group-item list-group-item-action">Create product</NavLink>
  <NavLink to='/products' className="list-group-item list-group-item-action">Show products</NavLink>
  <NavLink to='/admin-dashboard/create-users' className="list-group-item list-group-item-action">Users</NavLink>
</div>
    </div>
  

</>
  )
}

export default AdminMenu