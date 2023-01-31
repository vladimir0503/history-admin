import { createSlice } from "@reduxjs/toolkit";
import { API } from "../../api/api";
import objToArray from "../common/objToArray";
import { toggleModal } from "../modal/sliceModal";

const initialState = {
    slides: [],
    loadingSlide: false
};

export const sliderSlice = createSlice({
    name: 'slider',
    initialState,
    reducers: {
        loadSlides: (state, action) => {
            state.slides = objToArray(action.payload)
        },
        addSlide: (state, action) => {
            state.slides = [...state.slides, action.payload]
        },
        deleteSlide: (state, action) => {
            state.slides = state.slides.filter(slide => slide.key !== action.payload)
        },
        toggleLoadingSlide: (state, action) => {
            state.loadingSlide = action.payload
        }
    }
});

export const { loadSlides, toggleLoadingSlide, addSlide, deleteSlide } = sliderSlice.actions;

export const fetchSlides = () => async dispatch => {
    try {
        const slides = await API.getData('slider');
        dispatch(loadSlides(slides))
    } catch (error) {
        dispatch(toggleModal({
            open: true,
            text: 'Ошибка сервера'
        }));
        console.log(error);
    };
};

export const addSliderItem = slide => async dispatch => {
    dispatch(toggleLoadingSlide(true));
    try {
        const { name } = await API.addData('slider', slide);
        const currentData = { ...slide, key: name }
        await API.changeData('slider', currentData, name);
        dispatch(addSlide(currentData));
    } catch (error) {
        dispatch(toggleModal({
            open: true,
            text: 'Ошибка сервера'
        }));
        console.log(error);
    } finally {
        dispatch(toggleLoadingSlide(false));
    };
};

export const deleteSliderItem = key => async dispatch => {
    try {
        await API.deleteData('slider', key);
        dispatch(deleteSlide(key));
    } catch (error) {
        dispatch(toggleModal({
            open: true,
            text: 'Ошибка сервера'
        }));
        console.log(error);
    };
};

export default sliderSlice.reducer;