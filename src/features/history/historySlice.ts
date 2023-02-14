import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

interface historyType{
    time:string,
    uuid:string,
  }
const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': "6e465c86d6mshe48fc6f4fb4414bp1e9fbcjsn6c6f2bf815da",
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
  };
const initialState:any = {
   historyData:[],
   historyLoading:false,
   change:"",
    };

    export const getHistoryDetail :any =createAsyncThunk("history/getHistoryDetail",
    async (historyObject:historyType|any,thunkAPI)=>{
try{
     const uuid=historyObject.uuid;
     const time=historyObject.time;
   const resp=await axios( `https://coinranking1.p.rapidapi.com/coin/${uuid}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${time}`,options)
   return resp.data
}catch(error:any){
   
}
})


    const historySlice:any=createSlice({
        name:"history",
        initialState,
        reducers:{

        },
        extraReducers:{
            [getHistoryDetail.pending]:(state:any)=>{                              
                state.historyLoading=true;
           },
           [getHistoryDetail.fulfilled]:(state:any,action:any)=>{
              state.historyLoading=false;
              state.historyData=action.payload.data.history;
              state.change=action.payload.data.change;
              
           },
           [getHistoryDetail.rejected]:(state:any,action:any)=>{
               
           },
        }
    })

    export default historySlice.reducer;