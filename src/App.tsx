import React from 'react';
import Nav from './components/Nav';
import "./styles.css"
import {Routes,Route,NavLink} from "react-router-dom";
import Home from "./components/Home"
import Crypto from './components/Crypto';
import Exchange from './components/Exchange';
import News from './components/News';
import {getCryptoDetail} from "./features/getCrypto/getCryptoSlice";
import {useDispatch} from "react-redux";
import {getNews} from "./features/getNews/newsSlice";
import  CryptoDetailPage  from './components/CryptoDetailPage';
import Footer from './components/Footer';
import moment from "moment";

function App() {
const dispatch=useDispatch();
  // const [detail,setDetail] =React.useState<any>([]);
 
  React.useEffect(()=>{
    dispatch(getCryptoDetail());
  },[dispatch])

 
  // resize

  const [menu,setMenu]=React.useState<boolean>(false);
  const [screenSize,setScreenSize]=React.useState<number|string|null|any>(null);

 
 React.useEffect(()=>{
  const handleResize=()=>setScreenSize(window.innerWidth);
  window.addEventListener('resize',handleResize);
  handleResize();
  return ()=>window.removeEventListener('resize',handleResize);
 },[])

 React.useEffect(()=>{
    if(screenSize<912){
      setMenu(true);
    }else{
      setMenu(false);
    }
 },[screenSize])
  

//test



  return (
   
    <main className='app'>

        { menu===false && <section className='app-a'>
        <Nav menu={menu}/>
         </section>}

        
          <section className='app-b' style={{width:menu?"100%":"auto",paddingLeft:menu?"1px":"270px"}}>

            <div className="app-d">
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/crypto-currency" element={<Crypto/>}/>
               <Route path="/crypto-detail/:id" element={<CryptoDetailPage menu={menu}/>}/>
              <Route path="/exchange" element={<Exchange menu={menu}/>} />
              <Route path="/news" element={<News/>} />
            </Routes>
            </div>

      <div className='app-e'>
        <Footer/>
      </div>
          
           
          </section>

         
         
         
    </main>
   
  );
}

export default App;
