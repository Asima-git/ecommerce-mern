import {configureStore} from '@reduxjs/toolkit';
import authReducer from './auth-slice'
import adminProductSlice from './admin/product-slice'
import shopProductSlice from './shop/product-slice/index'
import shopCartSlice from './shop/cart-slice/index'
import shopAddressSlice from './shop/address-slice/index'
import shopOrderSlice from './shop/order-slice/index'
import adminOrderSlice from './admin/order-slice/index'
import shopSearchSlice from './shop/search-slice/index'
import shopReviewSlice from "./shop/review-slice/index";
import commonFeatureSlice from "./common-slice/index";

const store = configureStore({
    reducer : {
        auth:authReducer,
        adminProducts:adminProductSlice,
        adminOrder:adminOrderSlice,
        shopProducts:shopProductSlice,
        shopCart:shopCartSlice,
        shopAddress:shopAddressSlice,
        shopOrder:shopOrderSlice,
        shopSearch: shopSearchSlice,
        shopReview: shopReviewSlice,
        commonFeature: commonFeatureSlice,
    }
})

export default store