import React from 'react'
import Hero from '../Component/Hero/Hero'
import Working from "../Component/Working/Working"
import Auction from '../Component/Auction/Auction'
import Navbar  from "../Component/Navbar/Navbar"
import Footer  from "../Component/Footer/Footer"
const Home = () => {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <Working/>
        <Auction/>
        <Footer/>
    </div>
  )
}

export default Home
