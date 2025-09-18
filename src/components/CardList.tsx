import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, selectBooks } from '../redux/slices/librarySlice';
import Card from './Card';
import AddBookCard from './AddBookCard';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { useEffect, useState } from 'react';
import { selectUser } from '../redux/slices/userSlice';
import type { AppDispatch } from '../redux/store';

const tabs = ['All', 'In progress', 'Unopened', 'Completed'];

export default function CardList() {
  const books = useSelector(selectBooks);
  const user = useSelector(selectUser);
  const [tabIndex, setTabIndex] = useState(0);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchBooks());
    }
  }, [user, dispatch]);

  const getFilteredBooks = (index: number) => {
    switch (index) {
      case 0:
        return books;
      case 1:
        return books.filter(
          (b) => b.totalPages && b.currentPage && b.currentPage < b.totalPages
        );
      case 2:
        return books.filter((b) => !b.currentPage);
      case 3:
        return books.filter(
          (b) => b.currentPage === b.totalPages && b.totalPages
        );
      default:
        return books;
    }
  };

  return (
    <div className="mt-6">
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList className="flex flex-row w-full whitespace-nowrap justify-center gap-3 overflow-auto">
          {tabs.map((tab, index) => (
            <Tab
              key={tab}
              className={`px-2 md:px-4 py-1 rounded-lg border-2 transition-colors duration-200 cursor-pointer
                ${
                  index === tabIndex
                    ? 'bg-gray-900 text-white border-gray-900 shadow'
                    : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-100'
                }
                `}
            >
              {tab}
            </Tab>
          ))}
        </TabList>
        {tabs.map((tab, index) => (
          <TabPanel key={index}>
            <div className="my-6 flex flex-wrap justify-center gap-5 md:gap-10">
              {tab === 'All' && <AddBookCard />}
              {getFilteredBooks(index).map((book) => (
                <Card key={book.isbn} {...book} />
              ))}
              {tab !== 'All' && getFilteredBooks(index).length === 0 && (
                <div className="text-lg md:text-xl text-gray-700 mt-10 text-center">
                  There are no such books.
                  <br />
                  Try to add new book!
                </div>
              )}
            </div>
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
}
