import React from 'react'
import "../styles.css";
import HomeIcon from '@mui/icons-material/Home';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import {NavLink} from "react-router-dom";
interface itemType{
   menu:boolean,
}
export default function Nav (props:itemType)  {
 return (
    <nav className='nav'>
       
          <div className='title-img'>
            <p className='title'>Cryptostorm</p>
          </div>


<section className="nav-b">

         <NavLink to="/" className="tile">
            <p className='icon'><HomeIcon /></p>
         <p className='text'>Home</p>
         </NavLink>

         <NavLink to="/crypto-currency" className="tile">
            <p className='icon'><CurrencyBitcoinIcon /></p>
         <p className='text'>Cryptocurrencies</p>
         </NavLink>

         <NavLink to="/exchange" className="tile">
            <p className='icon'><AutorenewIcon  /></p>
         <p className='text'>Exchanges</p>
         </NavLink>

         <NavLink to="/news" className="tile">
            <p className='icon'><NewspaperIcon/></p>
         <p className='text'>News</p>
         </NavLink>

         
         
          </section> 

    </nav>
 )
}
