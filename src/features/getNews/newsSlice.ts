import { createSlice ,createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";
const options = {
	method: 'GET',
	headers: {
		'X-BingApis-SDK': 'true',
		'X-RapidAPI-Key': "bd8a10b4d8mshd7f1afd51d2986fp18262fjsn249a4f1e5041",
		'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
	}
};
const initialState = {
      allNews:[],
      newsLoading:false,
};
export const getNews :any =createAsyncThunk("news/getAllCryptoNews",
async (requiredValue:any,thunkAPI)=>{
try{
  const count=requiredValue.count;
  const qWord=requiredValue.category;
   const apiUrl=`https://bing-news-search1.p.rapidapi.com/news/search?q=${qWord}%20news&count=${count}&freshness=Day&textFormat=Raw&safeSearch=Off`
const resp=await axios(apiUrl, options)
return resp.data
}catch(error:any){

}
})

const newsSlice:any = createSlice({
name: 'news',
initialState,
reducers:{

},
extraReducers:{

    [getNews.pending]:(state:any)=>{
        state.newsLoading=true;
    },

   [getNews.fulfilled]:(state:any,action:any)=>{
       state.allNews=action.payload.value;
       state.newsLoading=false;
   },

   [getNews.rejected]:(state:any,action:any)=>{},

}
});

export default newsSlice.reducer;
