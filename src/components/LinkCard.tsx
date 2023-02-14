import React from 'react'
import "./comStyles.css";
interface linkType{
    name?:string,
    type?:string,
    url?:string,
  }
interface linkTypeProps{
    item?:linkType,
}
export default function LinkCard  (props:linkTypeProps)  {
  return (
    
         <div className="c-detail-five-bulla-link">
               <p className='c-detail-five-text-link'>{props.item?.type}</p>
               <a  href={props.item?.url} target="_blank"><p className='c-detail-five-value-link'>{props.item?.name}</p></a>
             </div>
        
  )
}
