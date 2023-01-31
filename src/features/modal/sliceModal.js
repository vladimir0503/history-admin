import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    text: ''
};

export const sliceModal = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        toggleModal: (state, action) => {
            state.isOpen = action.payload.open;
            state.text = action.payload.text
        },
    }
});

export const { toggleModal } = sliceModal.actions;

export default sliceModal.reducer;