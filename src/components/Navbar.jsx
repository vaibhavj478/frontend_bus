import React from 'react'
import { Link }  from "react-router-dom"

const Navbar = () => {
  return (
    <>
    

    <h2>

        <Link to={`/`} >Home</Link>
        <Link to={`/profile`} >Profile</Link>
        <Link to={`/contact`} >Contact</Link>


    </h2>

    
    
    </>
  )
}

export default Navbar