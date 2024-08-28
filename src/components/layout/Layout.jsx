import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../NavBar/NavBar'
import Footer from '../Footer/Footer'; // Ensure you have a Footer component

export default function Layout() {
  return <>
    
    <Navbar/>
    
   <div className='pt-16 container mx-auto'>
   <Outlet/>
   </div>
    <Footer/>
    </>
  
}
