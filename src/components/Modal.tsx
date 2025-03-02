import { IoMdClose } from 'react-icons/io';

type ModalProps = {
  title: string;
  isOpened: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({
  title,
  isOpened,
  onClose,
  children,
}: ModalProps) {
  if (!isOpened) return null;

  return (
    <div className="fixed inset-0 backdrop-opacity-50 backdrop-blur-xl bg-black/60 flex items-center justify-center z-50">
      <div
        className="relative w-full max-w-lg max-h-full bg-white rounded-lg shadow-
       "
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h3 className="text-2xl font-geist font-bold text-gray-900 ">
            {title}
          </h3>
          <button
            onClick={onClose}
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-800 rounded-lg w-10 h-10"
          >
            <IoMdClose size={32} className="text-gray-900 m-auto" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
