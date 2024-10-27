import {createSlice} from "@reduxjs/toolkit";
import {LoadState ,StoreData ,RemoveData} from './SessionStorage';
const SessionKey = "allProduct"


const StoreAllProductDetails = createSlice({
    name:"AllProduct",
    initialState:{
        data:LoadState(SessionKey,[]),
        
    },
    reducers:{
        AllProductDetails(state,action){
            state.data = action.payload;
			StoreData(SessionKey,state.data);

        },
        
        RemoveAllProductDetails(state){
            state.data =[];
			RemoveData(SessionKey)
        }
    }
})

export const {AllProductDetails,RemoveAllProductDetails}  = StoreAllProductDetails.actions;

export default StoreAllProductDetails.reducer;