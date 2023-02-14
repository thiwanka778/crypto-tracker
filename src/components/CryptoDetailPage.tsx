import React from 'react'
import "./comStyles.css";
import { useParams } from 'react-router-dom';
import { getCryptoDetail } from '../features/getCrypto/getCryptoSlice';
import {useDispatch,useSelector} from "react-redux";
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import TagIcon from '@mui/icons-material/Tag';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import millify from "millify";
import {getAdvancedCryptoDetail} from "../features/complexCoin/complexSlice";
import BarChartIcon from '@mui/icons-material/BarChart';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import DoneIcon from '@mui/icons-material/Done';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CloseIcon from '@mui/icons-material/Close';
import LinkCard from './LinkCard';
import {getHistoryDetail} from "../features/history/historySlice";

interface coinsType{
    "24hVolume"?:string,
    btcPrice?:string,
    change?:string,
    coinrankingUrl?:string,
    color?:string,
    iconUrl?:string,
    listedAt?:number,
    lowVolume?:boolean,
    marketCap?:string,
    name?:string,
    price?:string,
    rank?:number,
    sparkline?:string[],
    symbol?:string,
    tier?:number,
    uuid?:string

}

interface linkType{
  name:string,
  type:string,
  url:string,
}
interface bullaType{
  "24hVolume"?:string,
  allTimeHigh?:{price?:string,timestamp?:number|any},
  btcPrice?:string,
  change?:string,
  coinrankingUrl?:string,
  color?:string,
  description:string,
  fullyDilutedMarketCap?:string,
  iconUrl?:string,
  links:linkType[],
  listedAt?:number,
  lowVolume?:boolean,
  marketCap?:string,
  name?:string,
  notices?:null|string|any,
  numberOfExchanges?:number,
  numberOfMarkets?:number,
  price?:string,
  priceAt?:number,
  rank?:number,
  sparkline?:string[],
  supply?:{confirmed?:boolean,supplyAt?:number,max?:string,total?:string,circulating?:string}
  symbol?:string,
  tags?:string[],
  tier?:number,
  uuid?:string,
  websiteUrl?:string,

}
interface historyType{
  time:string,
  uuid:string,
}
interface itemProps{
  menu:boolean,
}

export default function CryptoDetailPage  (props:itemProps)  {
  const dispatch=useDispatch();

      let coinId =useParams();
      const id=Number(coinId.id);

      // start here
      const historyData=useSelector((state:any)=>state.history.historyData);
      const change=useSelector((state:any)=>state.history.change);
      const historyLoading=useSelector((state:any)=>state.history.historyLoading);
      const coins=useSelector((state:any)=>state.crypto.coins);
      const  advancedCoin=useSelector((state:any)=>state.advancedCrypto.advancedCoin);
     
      const [coinDetail,setCoinDetail]=React.useState<coinsType>(()=>{
        const localData=window.localStorage.getItem("coinDetail");
        return localData?JSON.parse(localData):{};
      });

      const [bulla,setBulla] =React.useState<bullaType>(()=>{
        const bullaData=window.localStorage.getItem("bulla");
        return bullaData?JSON.parse(bullaData):{description:"",links:[]};
      })
      React.useEffect(()=>{
        dispatch(getCryptoDetail())
      },[dispatch,id])

      React.useEffect(()=>{
        if(coins.length>0){
          setCoinDetail(function(prevState:coinsType|any){
            for(let i=0;i<coins.length;i++){
                if(coins[i].rank==id){
                      prevState={...coins[i]}
                      return prevState;
                }
               
            }
           
       })
        }
       
      },[dispatch,id,coins])
      let color:string|any|undefined="";
     if(coinDetail){
          color=coinDetail.color?coinDetail.color:"black";
     }
     let volume24:string|any;
     if(coinDetail){
       volume24=coinDetail["24hVolume"];
     }


   

     React.useEffect(()=>{
     window.localStorage.setItem("coinDetail",JSON.stringify(coinDetail));
     },[coinDetail,id]);


     let uuid:string|any="";
     if(coinDetail){
        uuid=coinDetail.uuid;
     }
     React.useEffect(()=>{
         dispatch(getAdvancedCryptoDetail(uuid));
     },[dispatch,coinDetail,id,uuid,coins])

React.useEffect(()=>{
    
      setBulla(function(prevState:bullaType){
           return advancedCoin;
      })
     
},[advancedCoin,id,coinDetail,uuid])


React.useEffect(()=>{
  window.localStorage.setItem("bulla",JSON.stringify(bulla))
},[bulla,id])

let linkDisplay:any="";
if(bulla.links){
   linkDisplay=bulla.links.map(function(item:linkType){
    const linkId=item.url+1;
       return (
         <LinkCard key={linkId} item={item}/>
       )
 })
}
let historyObject:historyType|any={};

if(coinDetail){
  
    historyObject.uuid=coinDetail.uuid;
    historyObject.time="7d";
};





React.useEffect(()=>{
  dispatch(getHistoryDetail(historyObject));
},[dispatch,id,uuid,coinDetail])



  return (
   
    <main className="c-detail">
        
        <div className='c-detail-first-div'>
          <img src={coinDetail.iconUrl} className='c-detail-img'  alt="coin" />
          <p className='c-detail-title' style={{color:color}}>{coinDetail.name}</p>
        </div>

        <div className='c-detail-second-div'>
            <p className='c-detail-p'><span>{coinDetail.name}</span> live price in US dollars. View value statistics, market cap and supply.</p>
        </div>

        {/*chart start */}

      <div className='c-detail-third-div'>
         
       </div>



        {/*chart start */}

        <div className='c-detail-fourth-div'>
        <p className='c-detail-fourth-1'><span>{coinDetail.name}</span> Value Statistics </p>
            <p className='c-detail-fourth-2'>An overview showing the stats of <span>{coinDetail.name}</span></p>
        </div>


        <div className='c-detail-five-div'>

           <section className='c-detail-five-box'>

             <div className="c-detail-five-bulla" style={{width:props.menu?"50%":"500px"}}>
               <header className='c-detail-five-icon'><LocalAtmIcon fontSize="small"/></header> 
               <p className='c-detail-five-text'>Price to USD</p>
               <p className='c-detail-five-value'><span>$</span> {millify(Number(coinDetail.price))}</p>
             </div>


             <div className='c-detail-horizontal-line'></div>


             <div className="c-detail-five-bulla"  style={{width:props.menu?"50%":"500px"}}>
               <header className='c-detail-five-icon'><TagIcon fontSize="small"/></header> 
               <p className='c-detail-five-text'>Rank</p>
               <p className='c-detail-five-value'>{coinDetail.rank}</p>
             </div>


             <div className='c-detail-horizontal-line'></div>


             <div className="c-detail-five-bulla"  style={{width:props.menu?"50%":"500px"}}>
               <header className='c-detail-five-icon'><FlashOnIcon fontSize="small"/></header> 
               <p className='c-detail-five-text'>24h Volume</p>
               <p className='c-detail-five-value'><span>$</span> {millify(volume24)}</p>
             </div>


             <div className='c-detail-horizontal-line'></div>

             <div className="c-detail-five-bulla"  style={{width:props.menu?"50%":"500px"}}>
               <header className='c-detail-five-icon'><MonetizationOnIcon fontSize="small"/></header> 
               <p className='c-detail-five-text'>Market Cap</p>
               <p className='c-detail-five-value'><span>$</span> {millify(Number(coinDetail.marketCap))}</p>
             </div>


             <div className='c-detail-horizontal-line'></div>


             <div className="c-detail-five-bulla"  style={{width:props.menu?"50%":"500px"}}>
               <header className='c-detail-five-icon'><EmojiEventsIcon fontSize="small"/></header> 
               <p className='c-detail-five-text'>All-time-high (daily avg)</p>
               <p className='c-detail-five-value'><span>$</span> {millify(Number(bulla.allTimeHigh?.price))}</p>
             </div>


             <div className='c-detail-horizontal-line'></div>

            
          
           </section>
        </div>

            {/*  start here   */}

        <div className='c-detail-fourth-div'>
        <p className='c-detail-fourth-1'><span>{coinDetail.name}</span> Other Statistics </p>
            <p className='c-detail-fourth-2'>An overview showing the other stats of <span>{coinDetail.name}</span></p>
        </div>

{/*  start here   */}

        <div className='c-detail-five-div'>

           <section className='c-detail-five-box'>

             <div className="c-detail-five-bulla"  style={{width:props.menu?"50%":"500px"}}>
               <header className='c-detail-five-icon'><BarChartIcon fontSize="small"/></header> 
               <p className='c-detail-five-text'>Number Of Markets</p>
               <p className='c-detail-five-value'><span></span> {millify(Number(bulla.numberOfMarkets))}</p>
             </div>


             <div className='c-detail-horizontal-line'></div>


             <div className="c-detail-five-bulla"  style={{width:props.menu?"50%":"500px"}}>
               <header className='c-detail-five-icon'><CurrencyExchangeIcon fontSize="small"/></header> 
               <p className='c-detail-five-text'>Number Of Exchanges</p>
               <p className='c-detail-five-value'>{bulla.numberOfExchanges}</p>
             </div>


             <div className='c-detail-horizontal-line'></div>


             <div className="c-detail-five-bulla" style={{width:props.menu?"50%":"500px"}}>
               <header className='c-detail-five-icon'><ErrorOutlineIcon fontSize="small"/></header> 
               <p className='c-detail-five-text'>Approved Supply</p>
               <p className='c-detail-five-value'><span></span>{bulla.supply?.confirmed===true?<DoneIcon/>:<CloseIcon/>}</p>
             </div>


             <div className='c-detail-horizontal-line'></div>

             <div className="c-detail-five-bulla"  style={{width:props.menu?"50%":"500px"}}>
               <header className='c-detail-five-icon'><ErrorOutlineIcon fontSize="small"/></header> 
               <p className='c-detail-five-text'>Total Supply</p>
               <p className='c-detail-five-value'><span>$</span> {millify(Number(bulla.supply?.total))}</p>
             </div>


             <div className='c-detail-horizontal-line'></div>


             <div className="c-detail-five-bulla"  style={{width:props.menu?"50%":"500px"}}>
               <header className='c-detail-five-icon'><ErrorOutlineIcon fontSize="small"/></header> 
               <p className='c-detail-five-text'>Circulating Supply</p>
               <p className='c-detail-five-value'><span>$</span> {millify(Number(bulla.supply?.circulating))}</p>
             </div>


             <div className='c-detail-horizontal-line'></div>
           </section>
        </div>

       <div className='c-detail-six-div'>
        <p className='c-detail-six-p'>What Is {coinDetail.name}</p>
       { coinDetail.name===bulla.name?<div className='c-detail-six-auto' dangerouslySetInnerHTML={{__html:bulla.description}}></div>:<p className='reload'>Please reload the page...</p>}
        
       </div>

       {/* Links start  */}
       <div className='ira-div'>
        <div className="ira"></div>
       </div>

      {coinDetail.name===bulla.name ? <div>

       <p className="website-link"><span>{bulla.name}</span> Links</p>

<div>
{linkDisplay}
</div>

       </div>:<p className='reload'>Please reload the page...</p>}

     

        </main>
  )
}
