import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

interface bullaType{
    "24hVolume"?:string,
    allTimeHigh?:{price?:string,timestamp?:number|any},
    btcPrice?:string,
    change?:string,
    coinrankingUrl?:string,
    color?:string,
    description?:string,
    fullyDilutedMarketCap?:string,
    iconUrl?:string,
    links?:any[],
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
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6e465c86d6mshe48fc6f4fb4414bp1e9fbcjsn6c6f2bf815da',
		'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
	}
};

interface initType{
    advancedCoin:bullaType,
    isLoading:boolean,
    uuid:string,
}
const initialState:initType={
    advancedCoin:{},
    isLoading:false,
    uuid:"",
}
export const getAdvancedCryptoDetail :any =createAsyncThunk("cryptoAdvanced/getAdvancedCryptoDetail",
async (uuid:string,thunkAPI)=>{
try{
          const bullId=uuid;
const resp=await axios(`https://coinranking1.p.rapidapi.com/coin/${bullId}?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h`, options)
return resp.data
}catch(error:any){

}
})

	



const complexSlice :any = createSlice({
    name: 'advancedCrypto',
    initialState,
    reducers:{
         getId:(state:any,action:any)=>{
             state.uuid=action.payload
         }
    },
    extraReducers:{
        [getAdvancedCryptoDetail.pending]:(state:any)=>{                              
            state.isLoading=true;
       },
       [getAdvancedCryptoDetail.fulfilled]:(state:any,action:any)=>{
         state.advancedCoin=action.payload.data.coin;
          state.isLoading=false;
       
           
       },
       [getAdvancedCryptoDetail.rejected]:(state:any,action:any)=>{
           
       },
    }
    });

export const {getId}=complexSlice.actions;
export default complexSlice.reducer;