import {createSlice} from "@reduxjs/toolkit";
import {LoadState ,StoreData ,RemoveData} from './SessionStorage';
const SessionKey = "SingleProduct"


const StoreSingleProductDetails = createSlice({
    name:"SingleProduct",
    initialState:{
        data:LoadState(SessionKey,[]),
        
    },
    reducers:{
        SingleProductDetails(state,action){
            state.data = action.payload;
			StoreData(SessionKey,state.data);

        },
        
        RemoveSingleProductDetails(state){
            state.data =[];
			RemoveData(SessionKey)
        }
    }
})

export const {SingleProductDetails,RemoveSingleProductDetails}  = StoreSingleProductDetails.actions;

export default StoreSingleProductDetails.reducer;