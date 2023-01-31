import { createSlice } from "@reduxjs/toolkit";
import { API } from "../../api/api";
import objToArray from "../common/objToArray";
import { toggleModal } from "../modal/sliceModal";

const initialState = {
    reviews: [],
    update: false
};

export const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        loadReviews: (state, action) => {
            state.reviews = objToArray(action.payload);
        },
        changeReview: (state, action) => {
            state.reviews = state.reviews.map(item => item.key === action.payload.key ? action.payload : item);
        },
        addReview: (state, action) => {
            state.reviews = [...state.reviews, action.payload];
        },
        deleteReview: (state, action) => {
            state.reviews = state.reviews.filter(item => item.key !== action.payload);
        },
        toggleUpdate: (state, action) => {
            state.update = action.payload;
        }
    }
});

export const { loadReviews, toggleUpdate, changeReview, addReview, deleteReview } = reviewsSlice.actions;

export const fetchReview = () => async dispatch => {
    dispatch(toggleUpdate(true));
    const data = await API.getData('reviews');
    
    if (!data) {
        dispatch(loadReviews([]));
    } else if (data.error) {
        dispatch(toggleModal({
            open: true,
            text: 'Ошибка сервера'
        }));
        console.log(data.error)
    } else {
        dispatch(loadReviews(data));
    };

    dispatch(toggleUpdate(false));
};

export const changeReviewsData = data => async dispatch => {

    try {
        await API.changeData('reviews', data, data.key);
        dispatch(changeReview(data));
    } catch (error) {
        dispatch(toggleModal({
            open: true,
            text: 'Ошибка сервера'
        }));
        console.log(error);
    };
};

export const addReviewsItem = item => async dispatch => {
    dispatch(toggleUpdate(true));

    try {
        const { name } = await API.addData('reviews', item);
        const currentItem = { ...item, key: name }
        await API.changeData('reviews', currentItem, name);
        dispatch(addReview(currentItem));
    } catch (error) {
        dispatch(toggleModal({
            open: true,
            text: 'Ошибка сервера'
        }));
        console.log(error);
    } finally {
        dispatch(toggleUpdate(false));
    };
};

export const deleteReviewsItem = key => async dispatch => {
    try {
        await API.deleteData('reviews', key);
        dispatch(deleteReview(key));
    } catch (error) {
        dispatch(toggleModal({
            open: true,
            text: 'Ошибка сервера'
        }));
        console.log(error);
    };
};

export default reviewsSlice.reducer;