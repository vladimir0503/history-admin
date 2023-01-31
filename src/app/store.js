import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice';
import adminReducer from '../features/admin/adminSlice';
import priceReducer from '../features/price/priceSlice';
import sliderReducer from '../features/slider/sliderSlice';
import modalReducer from '../features/modal/sliceModal';
import reviewsReducer from "../features/reviews/reviewsSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        admin: adminReducer,
        price: priceReducer,
        slider: sliderReducer,
        modal: modalReducer,
        reviews: reviewsReducer
    }
});