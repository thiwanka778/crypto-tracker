import React from 'react'
import {useDispatch,useSelector} from "react-redux";
import { getNews } from '../features/getNews/newsSlice';
import NewsCard from './NewsCard';
import "./comStyles.css";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface newsType{
  count?:number,
  category?:string,
}

export default function News () {
  const coins=useSelector((state:any)=>state.crypto.coins);
  const dispatch=useDispatch();
  const allNews=useSelector((state:any)=>state.news.allNews);
  const newsLoading=useSelector((state:any)=>state.news.newsLoading);
  const [value,setValue]=React.useState<string|null>(null);
  const [pageCount,setPageCount]=React.useState<number>(1)

console.log("all news",allNews)
    let newsObject:newsType={};
    if(value===null){
         newsObject.count=100;
         newsObject.category="crypto";
    }else if (value!==null){
           newsObject.count=100;
           newsObject.category=value;
    }
  
  
  React.useEffect(()=>{
     dispatch(getNews(newsObject))
    
  },[dispatch,value]);
  
  let coinsNames:string[]=[];
  if(coins.length>=1){
    coinsNames=coins.map(function(item:any){
          return item.name;
    })
  }

  React.useEffect(()=>{
     setPageCount(1);
  },[value]);


  let firstIndex:number=0;
  let lastIndex:number=0;
  firstIndex=(Number(pageCount)*12) - (12);
  lastIndex=Number(pageCount)*12;



let currentNewsArray:any[]=[];

if(allNews.length>0){
   currentNewsArray=allNews.slice(firstIndex,lastIndex);
}


const newsDisplay=currentNewsArray.map(function(item:any){
  let count:number=1;
  const newsId=item.url+count;
  count=count+1;
        return (
          <NewsCard key={newsId} item={item}/>
        )
})

let nCount:number=0;
 if(allNews.length>=1){
  nCount=allNews.length;
   }
   
let tempCount:number=0;
let finalCount:number|string|any=0;
if(nCount%12 >5 || nCount%12===0){
  tempCount=nCount/12;
  tempCount=Number(tempCount);
  finalCount=tempCount.toFixed();
  
}else{
  tempCount=nCount/12;
  tempCount=Number(tempCount+1);
  finalCount=tempCount.toFixed();
  
}

const pCount=Number(finalCount);

function pageCountChange(event:any,p:number){
  setPageCount(p)
}

  return (

    <main className="news-bunga">

        <p className='news-bunga-title'>Crypto News</p>

        <div className="news-search">
        <Autocomplete
          value={value}
          onChange={(event: any, newValue: string | null) => {
            setValue(newValue);
          }}
      disablePortal
      id="combo-box-demo"
      options={coinsNames}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Search News" />}/>

        </div>

        {newsLoading===false ?<div className='news-bunga-div'>
          {newsDisplay}
        </div>:<p className='news-loading'> Loading...</p>}


        <div className="pagination">
        <Stack spacing={2}>
      <Pagination count={pCount} page={pageCount} onChange={pageCountChange} />
    </Stack>
        </div>
        </main>
  )
}
