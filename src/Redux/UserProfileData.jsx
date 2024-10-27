import { createSlice } from "@reduxjs/toolkit";
import {LoadState ,StoreData ,RemoveData} from './SessionStorage';
const SessionKey = "User"


const UserData = createSlice({
    name:"User",
    initialState:{
        data:LoadState(SessionKey,[]),
        
    },
    reducers:{
        UserProfileData(state,action){
            state.data = action.payload;
			StoreData(SessionKey,state.data);

        },
        
        removeUserprofileData(state){
            state.data =[];
			RemoveData(SessionKey)
        }
    }
})

export const {UserProfileData,removeUserprofileData}  = UserData.actions;

export default UserData.reducer;