import React from 'react'
import { NavLink } from 'react-router-dom'

const Usermenu = () => {
  return (
    <>
    <div className='text-center'>
    <div className="list-group">
  <NavLink  to = '/dashboard' className="list-group-item list-group-item-action " >
    Dashboard
  </NavLink>
  <NavLink to='/Dashboard/profile' className="list-group-item list-group-item-action">Profile</NavLink>
  <NavLink to='/Dashboard/orders' className="list-group-item list-group-item-action">Orders</NavLink>
  {/* <NavLink to='/admin-dashboard/create-users' className="list-group-item list-group-item-action">Users</NavLink> */}
</div>
    </div>
  

</>
  )
}

export default Usermenu