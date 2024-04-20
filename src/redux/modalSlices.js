import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
          name: 'modal',
          initialState: {
                    showModal: false,
                    modalWidth: null,
                    modalHeight: null,
                    modalContent: null,
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
                    setModalHeight: (state, action) => {
                              state.modalHeight = action.payload;
                    },
          },
});

export const { setShowModal, setModalContent, setModalWidth, setModalHeight } = modalSlice.actions;
export default modalSlice.reducer;