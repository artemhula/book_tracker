import type { Book } from '../../models/Book';
import { createSlice } from '@reduxjs/toolkit';

export type ModalAction = 'Add' | 'Delete' | 'Change' | 'Track';

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
    showModal(_, action) {
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
