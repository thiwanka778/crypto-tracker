import React from 'react'
import {useSelector,useDispatch} from "react-redux";
import ExchangeCard from './ExchangeCard';
import {getAdvancedCryptoDetail} from "../features/complexCoin/complexSlice";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

interface itemProps{
  menu:boolean,
}
export default function Exchange  (props:itemProps)  {
  const dispatch=useDispatch();
  const coins=useSelector((state:any)=>state.crypto.coins);
  const uuid:string=useSelector((state:any)=>state.advancedCrypto.uuid);
  const advancedCoin=useSelector((state:any)=>state.advancedCrypto.advancedCoin);
  console.log(uuid);
  const [open, setOpen] = React.useState<boolean>(false);

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

  const exDisplay=coins.map(function(item:any){
          return <ExchangeCard key={item.uuid} item={item} setOpen={setOpen} menu={props.menu}/>
  });

 /* React.useEffect(()=>{
    dispatch(getAdvancedCryptoDetail(uuid))
  },[uuid]); */

  React.useEffect(()=>{
    dispatch(getAdvancedCryptoDetail(uuid));
},[dispatch,uuid,coins]);

console.log(advancedCoin);



  return (
  <main>

 {coins.length>0 ? <div>
       {exDisplay}
        </div>:<p className="ex-loading">Loading...</p>}

        <div>
        <Dialog
        open={open}
        onClose={handleClose}
        >
        <DialogContent>
      {advancedCoin.uuid===uuid ?
      <main>  
        <div className="pop-div">
          <img className='pop-img' src={advancedCoin.iconUrl} alt="crypto"/>
          <p className='pop-p' style={{color:advancedCoin.color?advancedCoin.color:"black"}} >{advancedCoin.symbol}</p>
        </div>
        <p className='pop-title'>What is <span style={{color:advancedCoin.color?advancedCoin.color:"black"}}>{advancedCoin.name}</span></p>

        <div className="ex-pop" dangerouslySetInnerHTML={{__html:advancedCoin.description}}>

        </div>
         </main>
         :<p className='ex-loading'>Loading...</p>}
        </DialogContent>
      </Dialog>
        </div>
  </main>
  
  )
}
