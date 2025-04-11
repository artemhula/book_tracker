import { IoAddCircle } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { showModal } from '../redux/slices/modalSlice';

export default function AddBookCard() {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => dispatch(showModal({ modalAction: 'Add' }))}
      className="w-65 h-90 overflow-hidden shadow-sm hover:shadow-none hover:scale-105 hover:bg-gray-400 hover:cursor-pointer rounded-2xl transition duration-300 flex group"
    >
      <div className="m-auto">
        <IoAddCircle
          className="mx-auto text-gray-400 group-hover:text-white transition-colors"
          size={120}
        />
        <div className="px-6 py-4">
          <div className="font-geist text-gray-700 font-semibold text-xl mb-1 text-center group-hover:text-white transition-colors">
            Add new book
          </div>
        </div>
      </div>
    </div>
  );
}
