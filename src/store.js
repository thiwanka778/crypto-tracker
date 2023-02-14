import { configureStore } from '@reduxjs/toolkit';
import  cryptoReducer from "./features/getCrypto/getCryptoSlice";
import newsReducer from "./features/getNews/newsSlice";
import advancedCryptoReducer from "./features/complexCoin/complexSlice";
import historyReducer from "./features/history/historySlice"
export const store = configureStore({
    reducer: {
        crypto:cryptoReducer,
        news:newsReducer,
        advancedCrypto: advancedCryptoReducer,
        history:historyReducer,
    },
    });
    