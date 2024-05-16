import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
          name: 'modal',
          initialState: {
                    showModal: false,
                    modalWidth: null,
                    modalHeight: null,
                    modalContent: null,
                    modalRounded: true,
          },
          reducers: {
                    setShowModal: (state, action) => {
                              state.showModal = action.payload;
                    },
                    setModalContent: (state, action) => {
                              state.modalContent = action.payload;
                    },
                    setModalWidth: (state, action) => {
                              state.modalWidth = action.payload;
                    },
                    setModalRounded: (state, action) => {
                              state.modalRounded = action.payload;
                    },
                    setModalHeight: (state, action) => {
                              state.modalHeight = action.payload;
                    },
          },
});

export const { setShowModal, setModalContent, setModalWidth, setModalHeight, setModalRounded } = modalSlice.actions;
export default modalSlice.reducer;