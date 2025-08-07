import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <AiOutlineLoading3Quarters
        className="animate-spin text-gray-600 justify-center"
        size={40}
      />
    </div>
  );
};
