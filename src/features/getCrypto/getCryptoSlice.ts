import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': "6e465c86d6mshe48fc6f4fb4414bp1e9fbcjsn6c6f2bf815da",
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
  };
/*interface statType{
    total?:number,
    total24hVolume?:string,
    totalCoins?:number,
    totalExchanges?:number,
    totalMarketCap?:string,
    totalMarkets?:number,
}*/
interface underType{
    coins:any[],
    stats:any[],
    isLoading:boolean,
    coinsLimitArray:any[],
}
const initialState:any = {
    coins:[],
    stats:{},
    isLoading:false,
    coinsLimitArray:[],
    };

    export const getCryptoDetail :any =createAsyncThunk("crypto/getAllCryptoDetail",
       async (thunkAPI)=>{
   try{
    
      const resp=await axios('https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=100&offset=0', options)
      return resp.data
   }catch(error:any){
      
   }
})

    const getCryptoSlice :any = createSlice({
        name: 'crypto',
        initialState,
        reducers:{
             
        },
        extraReducers:{
            [getCryptoDetail.pending]:(state:any)=>{                              
                 state.isLoading=true;
            },
            [getCryptoDetail.fulfilled]:(state:any,action:any)=>{
               state.coins=action.payload.data.coins
               state.stats=action.payload.data.stats
               state.isLoading=false;
            
                
            },
            [getCryptoDetail.rejected]:(state:any,action:any)=>{
                
            },
        }
        });
        

        export default getCryptoSlice.reducer;