import React from 'react'
import Footer from './Footer'
import Header from './Header'
import {Toaster} from 'react-hot-toast'
const layout = (props) => {
  return (
    <div>
        <Header/>
        <main style={{minHeight:'80vh'}}>
           <Toaster />
            {props.children}
        </main>
        <Footer/>
    </div>
  )
}

export default layout