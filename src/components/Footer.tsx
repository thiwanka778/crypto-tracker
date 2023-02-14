import React from 'react'
import {NavLink} from "react-router-dom";
import "../styles.css";
export default function Footer ()  {
  return (
    <section className='home-c'>
    <p className="home-c-title">Cryptostorm</p>
    <p className='home-c-all-right'>All rights reserverd</p>
    <div className='home-c-part2'>
        <NavLink to="/" className='home-c-p'>Home</NavLink>
        <NavLink to="/crypto-currency" className='home-c-p'>Cryptocurrencies</NavLink>
        <NavLink to="/exchange" className='home-c-p'>Exchanges</NavLink>
        <NavLink to="/news" className='home-c-p'>News</NavLink>
    </div>
    </section>
  )
}
