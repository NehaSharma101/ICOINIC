import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    
    <div className='footer'>
        <p>
          
          <Link to='/contact'>Contact</Link>|
          <Link to='/about'>About</Link>|
          <Link to='/policy'>Privacy Policy</Link>|
        </p>
        <h4>All rights are reserved @nehasharma</h4>

    </div>
  )
}

export default Footer