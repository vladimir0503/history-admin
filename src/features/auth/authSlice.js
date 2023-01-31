import { createSlice } from "@reduxjs/toolkit";
import { API } from "../../api/api";
import { toggleModal } from "../modal/sliceModal";

const initialState = {
    isAuth: false,
    isLoading: false
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logIn: state => {
            state.isAuth = true
        },
        logOut: state => {
            state.isAuth = false
        },
        toggleLoading: (state, action) => {
            state.isLoading = action.payload
        }
    }
});

export const { logIn, logOut, toggleLoading } = authSlice.actions;

export const fetchLogIn = (userLogin, userPassword) => async dispatch => {
    dispatch(toggleLoading(true));
    const { login, password } = await API.getData('admin');

    if (userLogin === login && userPassword === password) {
        sessionStorage.setItem('authData', JSON.stringify({ login, password }))
        dispatch(logIn());
    } else {
        dispatch(toggleModal({
            open: true,
            text: 'Неверный логин или пароль!'
        }))
    };

    dispatch(toggleLoading(false));
};

export default authSlice.reducer;