import { createSlice } from "@reduxjs/toolkit";
import { API } from "../../api/api";

const initialState = {
    adminData: null,
    isLoading: false
};

export const adminSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loadData: (state, action) => {
            state.adminData = action.payload
        },
        toggleLoading: (state, action) => {
            state.isLoading = action.payload
        }
    }
});

export const { loadData, toggleLoading } = adminSlice.actions;

export const fetchAdminData = () => async dispatch => {
    try {
        dispatch(toggleLoading(true));
        const data = await API.getData('admin');
        dispatch(loadData(data));
    } catch (error) {
        alert('Неизвестная ошибка');
        console.log(error);
    } finally {
        dispatch(toggleLoading(false));
    };
};

export const changeAdminData = data => async (dispatch, getState) => {
    const { login, password } = getState().admin.adminData;

    try {
        dispatch(toggleLoading(true));
        const current = {
            login: data.login ? data.login : login,
            password: data.password ? data.password : password
        };
        await API.changeData('admin', current);
    } catch (error) {
        alert('Неизвестная ошибка');
        console.log(error);
    } finally {
        dispatch(toggleLoading(false));
    }
};

export default adminSlice.reducer;