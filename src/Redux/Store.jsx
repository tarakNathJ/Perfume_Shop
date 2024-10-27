import {combineReducers,configureStore} from "@reduxjs/toolkit";
import UserProfileData from "./UserProfileData";
import UserSignUpdata from "./UserSignUpdata";
import {AllProductDetails} from "./AllProduct";
import SingleProduct from "./SingleProductData";
const CombineRedusers = combineReducers({
	ProfileData: UserProfileData,
	UserSignUpdata: UserSignUpdata,
	AllProduct: AllProductDetails,
	SingleProduct: SingleProduct
})

export const store = configureStore({
	reducer: CombineRedusers,
})
