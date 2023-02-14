import React, { useState } from 'react'
import {useSelector,useDispatch} from "react-redux";
import "../styles.css";
import millify from "millify";
import Card from "./Card";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getNews } from '../features/getNews/newsSlice';
import NewsCard from './NewsCard';

interface newsType{
  count?:number,
  category?:string,
}
interface providerTypes{
  _type:string,
  name:string,
  image:any|null,
}
interface propsType{
  
      about:any[],
      datePublished:string,
      description:string,
      image:{
          _type:string,
          thumbnail:{
              _type:string,
              contentUrl:string,
              height:number,
              width:number,
          }
      },
      mentions:any[],
      name:string,
      provider:providerTypes[],
      url:string,
      _type:string,
  
  
}

export default function Home ()  {
  const dispatch=useDispatch();
    const coins=useSelector((state:any)=>state.crypto.coins);
    const stats=useSelector((state:any)=>state.crypto.stats);
    const isLoading=useSelector((state:any)=>state.crypto.isLoading);
    const [value,setValue]=React.useState<string|null>(null);
    const [show,setShow] =React.useState<boolean>(false);
    const allNews=useSelector((state:any)=>state.news.allNews);
    const [nShow,setNshow]=React.useState<boolean>(false);

    let coinsNames:string[]=[];
if(coins.length>=1){
  coinsNames=coins.map(function(item:any){
        return item.name;
  })
}
let newsObject:newsType={};

if(nShow===false){
  
  newsObject.count=10;
  newsObject.category="crypto";
}
else if(nShow===true){

  newsObject.count=100;
  newsObject.category="crypto";
}

React.useEffect(()=>{
  dispatch(getNews(newsObject));
},[dispatch,nShow])

 // console.log(allNews)

let c10:any=[];
   if(coins.length>=1){
    c10=[];
    
    for(let i=0;i<10;i++){
        c10.push(coins[i]);
    }
   }else{
    c10=[];
   
   }


   const total24hVolume=Number(stats.total24hVolume);
   const totalMarketCap=Number(stats.totalMarketCap);

 let coinsDisplay;

  if(show===false){
     coinsDisplay=c10.map(function(item:any){
        return (<Card key={item.uuid}  item={item} />)
  })
  }else if(show===true && value===null){
    coinsDisplay=coins.map(function(item:any){
        return (<Card key={item.uuid}  item={item} />)
  })
  }else if(show===true && value!==null){
    coinsDisplay=coins.map(function(item:any){
         if( value===item.name){
          return (<Card key={item.uuid} item={item}/>)
         }
    })
  
  }
  let newsCount:number|string="";
if(allNews.length>=1){
      newsCount=allNews.length;
}

  const newsDisplay=allNews.map(function(item:propsType){
         let count:number=1;
          const newsId=item.url+count;
          count=count+1;
          return (
            <NewsCard key={newsId} item={item} />
          )
  })
     
   
 function showClick(){
    setShow(function(prevState:boolean){
           return !prevState;
    })
 }

 function nShowClick(){
  setNshow(function(prevState:boolean){
           return !prevState;
  })
 }

  return (
        <main className="home">

        { show===true &&  <div className="card-auto-complete">
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
          </div>}

           <section className='home-a'>
            <div className="home-aa">
            <p className="top-10-title">{show===false?"Top 10 Cryptos In The World":"Well-Known Cryptos In The World"}</p>
            <p  className="top-10-show-more" onClick={showClick}>{show===true?"show less":"show more"}</p>
            </div>

           { isLoading===false? <div className='container'> {coinsDisplay}</div>:<p className="home-b-text-loading">Loading...</p>}
           </section>


           {/* under the crypto card (news start) */}

        <section className="news">

              <div className="news-a">
                   <p className='n1'>{nShow===false?"Top Crypto News":"Latest Crypto News"} <span>(</span><span>{newsCount}</span>)</p>
                   <p className='n2' onClick={nShowClick}>{nShow===false?"show more":"show less"}</p>
              </div>

       </section>

       <div className='news-b'>
               {newsDisplay}
              </div>




           {/* news end*/}


           <section className='home-b'>
            <div className='home-b-g'>
            <p className="home-b-global">Global Crypto Stats</p>
            </div>
            

            {isLoading===false ?<div className="home-b-part2">

                <p className='home-b-text'>Total Cryptocurrencies</p>
                <p className='home-b-number'>{millify(stats.totalCoins)}</p>

                <p className='home-b-text'>Total Exchanges</p>
                <p className='home-b-number'>{millify(stats.totalExchanges)}</p>

                <p className='home-b-text'>Total Market Cap</p>
                <p className='home-b-number'>{millify(totalMarketCap)}</p>

                <p className='home-b-text'>Total 24h Volume</p>
                <p className='home-b-number'>{millify(total24hVolume)}</p>

                <p className='home-b-text'>Total Markets</p>
                <p className='home-b-number'>{millify(stats.totalMarkets)}</p>

             </div>:<p className="home-b-text-loading">Loading...</p>}

            </section>  
 


        </main>
  )
}
