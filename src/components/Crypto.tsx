import React from 'react';
import "./comStyles.css";
import {useDispatch,useSelector} from "react-redux";
import {getCryptoDetail} from '../features/getCrypto/getCryptoSlice';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Card from './Card';
export default function Crypto ()  {
   const dispatch=useDispatch();
   const coins=useSelector((state:any)=>state.crypto.coins);
   let coinsNames:string[]=[];
   if(coins.length>=1){
     coinsNames=coins.map(function(item:any){
           return item.name;
     })
   }
const [value,setValue]=React.useState<string|null>(null);
  React.useEffect(()=>{
    dispatch(getCryptoDetail());
  },[dispatch]);
   
  let coinsDisplay:any="";
  if(value===null){
    coinsDisplay=coins.map(function(item:any){
       return (<Card key={item.uuid}  item={item} />)
 })
 }else if( value!==null){
   coinsDisplay=coins.map(function(item:any){
        if( value===item.name){
         return (<Card key={item.uuid} item={item}/>)
        }
   })
 
 }

  return (

    <main className="crypto-page">

         <p className='crypto-page-p'>Most Trusted Cryptos In The World</p>
        <div className='crypto-page-first-div'>
        <Autocomplete
           value={value}
           onChange={(event: any, newValue: string | null) => {
             setValue(newValue);
           }}
      disablePortal
      id="combo-box-demo"
      options={coinsNames}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Search Coins" />}
    />
        </div>

        <div className='crypto-page-second-div'>
          {coinsDisplay}
        </div>
        
        
        </main>
  )
}
