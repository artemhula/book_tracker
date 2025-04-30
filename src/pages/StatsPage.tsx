import { useEffect, useState } from 'react';
import AnimatedBlobs from '../components/AnimatedBlobs';
import { Header } from '../components/Header';
import Notifier from '../components/Notifier';
import { useDispatch, useSelector } from 'react-redux';
import { selectBooks } from '../redux/slices/librarySlice';
import Selector, { type Option } from '../components/Stats/Selector';
import type { AppDispatch } from '../redux/store';
import {
  fetchStats,
  selectStats,
  selectStatsLoading,
} from '../redux/slices/statsSlice';

export default function StatsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const books = useSelector(selectBooks);
  const stats = useSelector(selectStats);
  const isLoading = useSelector(selectStatsLoading);

  const [selectedOption, setSelectedOption] = useState('all');
  const options: Option[] = [{ id: 'all', title: 'All books' }, ...books];

  useEffect(() => {
    const bookId = selectedOption === 'all' ? undefined : selectedOption;
    dispatch(fetchStats(bookId));
  }, [selectedOption]);

  const handleSelect = (value: string) => {
    setSelectedOption(value);
  };

  return (
    <>
      <Header />

      <main className="font-geist">
        <Selector
          options={options}
          selectedOption={selectedOption}
          handleSelect={handleSelect}
        />
        <AnimatedBlobs />
      </main>

      <Notifier />
    </>
  );
}
