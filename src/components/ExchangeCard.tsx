import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./exStyles.css";
import millify from "millify";
import {useSelector,useDispatch} from "react-redux";
import { getId } from '../features/complexCoin/complexSlice';
import {getAdvancedCryptoDetail} from "../features/complexCoin/complexSlice";

interface itemType{
    item:any,
    setOpen:React.Dispatch<React.SetStateAction<boolean>>,
    menu:boolean,
}
export default function ExchangeCard  (props:itemType)  {
    const dispatch=useDispatch();
    const uuid=useSelector((state:any)=>state.advancedCrypto.uuid);
   

function exCardClick(){
    dispatch(getId(props.item.uuid));
    props.setOpen(true);
}



  return (

    <main onClick={exCardClick}>
        <Accordion >
        <AccordionSummary>
          <main className="a" style={{flexDirection:props.menu?"column":"row"}}>
          <img src={props.item.iconUrl} className='ex-img'/>
          <p className="ex-title" style={{color:props.item.color?props.item.color:"black"}}>{props.item.symbol}</p>
           <p className='ex-sub'>Current : <span className='ex-value'>${millify(props.item.price)}</span></p> 
           <p className='ex-sub'>Change : <span className='ex-value'>{props.item.change}%</span></p>
           <p className='ex-sub'>Market Cap : <span className='ex-value'>${millify(Number(props.item.marketCap))}</span></p>
           <p className='ex-sub'>24h volume : <span className='ex-value'>${millify(Number(props.item["24hVolume"]))}</span></p>
            </main>
        </AccordionSummary>
      </Accordion>
        </main>
  )
  }
