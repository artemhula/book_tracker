export const NotFound = () => {
  return (
    <div className="flex flex-col mx-auto">
      <p className="font-geist text-lg text-gray-800 m-auto"> Book not Found</p>
      <button
        type="button"
        className="px-2 py-1 bg-gray-800 font-geist text-sm text-white rounded-lg"
      >
        Add the book manually
      </button>
    </div>
  );
};
