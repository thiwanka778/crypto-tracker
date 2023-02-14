import React from 'react'
import "./comStyles.css";


interface providerTypes{
    _type:string,
    name:string,
    image:any|null,
}
interface propsType{
    item:{
        about?:any[],
        datePublished:string,
        description?:string,
        image?:{
            _type?:string,
            thumbnail?:{
                _type?:string,
                contentUrl?:string,
                height?:number,
                width?:number,
            }
        },
        mentions?:any[],
        name?:string,
        provider:providerTypes[],
        url?:string,
        _type?:string,
    } 
}
export default function NewsCard (props:propsType)  {
let imgUrl:string="";
const date=props.item.datePublished.slice(0,10)

if(props.item.image){
    imgUrl=`${props.item.image?.thumbnail?.contentUrl}.jpg`;
}else{
    imgUrl="https://v2.cimg.co/news/101438/250389/responsive-images/adobestock-560651574___media_library_original_600_600.jpeg"
}

  
       
  return (

    
    <main className='news-bulla'>
        
        <img className='news-img' src={imgUrl}   alt="news" />
        <p className='news-title'>
      {props.item.name}
        </p>

        <div className='news-d'>
            <p className="news-d-p">{props.item.description}</p>
        </div>

        <div className='news-div'>
        <p className='news-date'>{date}</p>
        <p className='news-provider'>{props.item.provider[0].name}</p>
        </div>

        <div className="news-link">
            <a href={props.item.url} target="_blank" className='news-link-a'>
            <p className="news-link-p">more...</p>
            </a>
        </div>
        
        </main>
        
  )
}
