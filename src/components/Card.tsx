import noCover from '../assets/images/no-cover.png';

export default function Card() {
  return (
    <div className="w-65 h-90 overflow-hidden shadow-sm hover:shadow-lg hover:scale-110  hover:cursor-pointer rounded-2xl transition duration-300">
      <img
        className="h-55 object-contain block mx-auto"
        src={noCover}
        alt="Cover"
      />
      <div className="px-6 py-4">
        <p className="font-geist text-gray-900 font-semibold text-lg mb-1 text-center">
          The Coldest Sunset
        </p>
        <p className="font-geist text-gray-500 font-md text-center">Author</p>
        <p className="font-geist text-2xl text-black font-bold text-center my-3">
          78%
        </p>
      </div>
    </div>
  );
}
