import React from 'react'
import "./comStyles.css";
import millify from "millify";
import {useNavigate,Outlet} from "react-router-dom";


interface propsType{
    item:any,
}
export default function Card  (props:propsType)  {
   const navigate=useNavigate();
    const imgUrl=props.item.iconUrl;
    const marketCap:number=Number(props.item.marketCap);
    const price:number=Number(props.item.price);
    const navigateUrl=`/crypto-detail/${props.item.rank}`;
  return (
    <main className="card" onClick={()=>navigate(navigateUrl)}>

       <div className="card-a">

        <p className="card-a-title"><span>{props.item.rank}</span> .<span> {props.item.name}</span></p>
        <img className='card-a-img' src={imgUrl} alt="crypto"/>
         </div>

         <div className="card-b">
            <div className='card-bb'></div>
         </div>

         <div className='card-c'>
            <p className='card-c-text'>Price : <span>$</span> {millify(price)}</p>
            <p className='card-c-text'>Market Cap : <span>{millify(marketCap)}</span></p>
            <p className='card-c-text'>Daily Change : <span>{props.item.change}</span>%</p>
         </div>
      
    </main>
  )
}
