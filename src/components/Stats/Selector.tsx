import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

export type Option = {
  id: string;
  title: string;
  coverUrl?: string;
};

type Props = {
  options: Option[];
  selectedOption: string;
  handleSelect: (id: string) => void;
};

export default function Selector({
  options,
  selectedOption,
  handleSelect,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-center mt-8">
      <div className="w-64 flex flex-col items-center md:flex-row md:w-full md:items-baseline md:justify-center">
        <p className="text-lg font-semibold md:w-35 truncate">Select option:</p>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative mt-2 w-80 flex justify-between items-center bg-white border border-gray-300 rounded-lg shadow-xs px-4 py-3 text-left text-gray-700 "
        >
          {options.find((option) => option.id === selectedOption)?.title}
          <IoIosArrowDown />
          {isOpen && (
            <ul className="absolute z-10 top-12 w-full right-0 bg-white border border-gray-300 rounded-xl shadow-lg overflow-y-auto max-h-[36vh]">
              {options.map((option) => (
                <li
                  key={option.id!}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(option.id!);
                    setIsOpen(false);
                  }}
                  className={`cursor-pointer flex select-none px-4 py-2 h-15 truncate items-center text-gray-700 hover:bg-blue-100 border-b border-gray-200 last:border-0 ${
                    selectedOption === option.id! ? 'bg-gray-100' : ''
                  }`}
                >
                  {option.coverUrl && (
                    <img
                      src={option.coverUrl}
                      alt="book cover"
                      className="h-10 w-7 object-fill mr-3"
                    />
                  )}
                  {option.title}
                </li>
              ))}
            </ul>
          )}
        </button>
      </div>
    </div>
  );
}
