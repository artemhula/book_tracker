import type { Book } from '../../types/Book';
import type { ModalAction } from '../../types/ModalAction';
import { createSlice } from '@reduxjs/toolkit';

export type ModalState = {
  isOpened: boolean;
  modalAction: ModalAction | null;
  selectedBook: Book | null;
};
const initialState: ModalState = {
  isOpened: false,
  modalAction: null,
  selectedBook: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal(state, action) {
      return {
        isOpened: true,
        modalAction: action.payload.modalAction,
        selectedBook: action.payload.selectedBook ?? null,
      };
    },
    closeModal() {
      return { ...initialState };
    },
  },
});

export default modalSlice.reducer;
export const { showModal, closeModal } = modalSlice.actions;
