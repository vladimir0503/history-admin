import { createSlice } from "@reduxjs/toolkit";
import { API } from "../../api/api";
import objToArray from "../common/objToArray";
import { toggleModal } from "../modal/sliceModal";

const initialState = {
    priceData: [],
    update: false
};

export const priceSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loadPrice: (state, action) => {
            state.priceData = objToArray(action.payload);
        },
        changePrice: (state, action) => {
            state.priceData = action.payload
        },
        addPrice: (state, action) => {
            state.priceData = [...state.priceData, action.payload]
        },
        deletePrice: (state, action) => {
            state.priceData = state.priceData.filter(item => item.key !== action.payload)
        },
        toggleUpdate: (state, action) => {
            state.update = action.payload
        }
    }
});

export const { loadPrice, toggleUpdate, changePrice, addPrice, deletePrice } = priceSlice.actions;

export const fetchPriceData = () => async dispatch => {
    dispatch(toggleUpdate(true));
    const data = await API.getData('prices');

    if (data.error) {
        dispatch(toggleModal({
            open: true,
            text: 'Ошибка сервера'
        }));
        console.log(data.error)
    } else {
        dispatch(loadPrice(data));
    };

    dispatch(toggleUpdate(false));
};

export const changePriceData = (data, key, i) => async dispatch => {
    const priceItem = data.filter(item => item.key === key);

    try {
        await API.changeData('prices', priceItem[0], key);
        dispatch(changePrice(data));
    } catch (error) {
        dispatch(toggleModal({
            open: true,
            text: 'Ошибка сервера'
        }));
        console.log(error);
    };
};

export const addPriceItem = item => async dispatch => {
    dispatch(toggleUpdate(true));

    try {
        const { name } = await API.addData('prices', item);
        const currentItem = {...item, key: name}
        await API.changeData('prices', currentItem, name);
        dispatch(addPrice(currentItem));
        console.log(name);
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

export const deletePriceItem = key => async dispatch => {
    try {
        await API.deleteData('prices', key);
        dispatch(deletePrice(key));
    } catch (error) {
        dispatch(toggleModal({
            open: true,
            text: 'Ошибка сервера'
        }));
        console.log(error);
    };
};

export default priceSlice.reducer;