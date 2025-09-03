import { IoAddCircle } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { showModal } from '../redux/slices/modalSlice';

export default function AddBookCard() {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => dispatch(showModal({ modalAction: 'Add' }))}
      className="w-65 h-20 min-[540px]:h-90 z-10 bg-white overflow-hidden shadow-sm hover:shadow-none hover:scale-105 hover:bg-gray-500 hover:opacity-60 hover:cursor-pointer rounded-2xl transition duration-300 flex group"
    >
      <div className="m-auto flex items-center-safe  min-[540px]:block">
        <IoAddCircle
          className="mx-auto text-gray-400 group-hover:text-white transition-colors"
          size={40}
        />
        <div className="min-[540px]:px-6  min-[540px]:py-4 ml-2 min-[540px]:ml-0">
          <div className="text-gray-700 font-semibold text-xl min-[540px]:mb-1 text-center group-hover:text-white group-hover:opactiy-20 transition-colors">
            Add new book
          </div>
        </div>
      </div>
    </div>
  );
}
