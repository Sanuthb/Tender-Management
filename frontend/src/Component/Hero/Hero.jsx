import React from 'react'
import "./Hero.css"
import { Link } from 'react-router-dom'
const Hero = () => {
  return (
    <div className='hero'>
       <div className='leftcontianer'>
        <h1>Exclusive Online Bid for Unbeatable Deals!</h1>
        <p>Participate in bid and get hottest gadgets on your Ticket Cost.</p>
        <Link to="/tender"><button>Start Bidding</button></Link>
       </div>
       <div className='rigthcontianer'>
        <img src="/hero.png" alt="" srcset="" />
       </div>
    </div>
  )
}

export default Hero
