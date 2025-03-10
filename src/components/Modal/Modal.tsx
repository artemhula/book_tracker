import { IoMdClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { closeModal } from '../../redux/slices/modalSlice';
import Changer from '../Changer';
import { selectBookByISBN } from '../../redux/slices/librarySlice';
import Add from './Add';

export default function Modal() {
  const { isOpened, modalAction, selectedBook } = useSelector(
    (state: RootState) => state.modal
  );
  const dispatch = useDispatch();
  const book = useSelector((state: RootState) =>
    selectBookByISBN(state, selectedBook?.isbn ?? null)
  );
  if (!isOpened) return null;

  return (
    <div className="fixed inset-0 backdrop-opacity-50 backdrop-blur-xl bg-black/60 flex items-center justify-center z-50 duration-200">
      <div
        className="relative w-full max-w-lg max-h-full h-[450px] bg-white rounded-lg shadow-
       "
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h3 className="text-2xl font-geist font-bold text-gray-900 ">
            {modalAction}
          </h3>
          <button
            onClick={() => dispatch(closeModal())}
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-800 rounded-lg w-10 h-10"
          >
            <IoMdClose size={32} className="text-gray-900 m-auto" />
          </button>
        </div>
        <div className="p-5">
          {modalAction === 'Add' ? (
            <Add />
          ) : modalAction === 'Track' && book ? (
            <Changer book={book} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
