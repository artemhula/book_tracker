import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import type { Book } from '../../models/Book';

export type Option =
  | {
      id: string;
      title: string;
    }
  | Book;

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
      <div className="relative w-64">
        <p className="text-lg">Select option:</p>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full mt-2 flex justify-between items-center bg-white border border-gray-300 rounded-lg shadow-xs px-4 py-3 text-left text-gray-700 "
        >
          {options.find((option) => option.id === selectedOption)?.title}
          <IoIosArrowDown />
        </button>

        {isOpen && (
          <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
            {options.map((option) => (
              <li
                key={option.id!}
                onClick={() => {
                  handleSelect(option.id!);
                  setIsOpen(false);
                }}
                className={`cursor-pointer flex select-none px-4 py-2 h-15 items-center text-gray-700 hover:bg-blue-100 border-b border-gray-200 last:border-0 ${
                  selectedOption === option.id! ? 'bg-gray-100' : ''
                }`}
              >
                {option.coverUrl && (
                  <img
                    src={option.coverUrl}
                    alt="book cover"
                    className="h-10 mr-3"
                  />
                )}
                {option.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
