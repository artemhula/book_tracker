import { useEffect, useState } from 'react';
import AnimatedBlobs from '../components/AnimatedBlobs';
import { Header } from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { selectBooks } from '../redux/slices/librarySlice';
import Selector, { type Option } from '../components/Stats/Selector';
import type { AppDispatch } from '../redux/store';
import {
  fetchStats,
  selectStats,
  selectStatsLoading,
} from '../redux/slices/statsSlice';
import WeekStatistic from '../components/Stats/WeekStatistic';
import MonthStatistic from '../components/Stats/MonthStatistic';
import { LoadingSpinner } from '../components/LoadingSpinner';

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

      <main className="font-geist mx-5 md:mx-20">
        <Selector
          options={options}
          selectedOption={selectedOption}
          handleSelect={handleSelect}
        />
        {isLoading ? (
          <div className="min-h-[60vh] grid place-items-center">
            <LoadingSpinner />
          </div>
        ) : stats ? (
          stats.monthly.totalPages > 0 ? (
            <div className="mt-5 flex flex-col lg:flex-row lg:justify-evenly gap-15">
              <WeekStatistic {...stats.weekly} />
              <MonthStatistic {...stats.monthly} />
            </div>
          ) : (
            <div className="grid place-content-center h-[70vh]">
              <p className="text-2xl text-center">
                <b>No data</b>
                <br /> Please read at least a little bit
              </p>
            </div>
          )
        ) : null}

        <AnimatedBlobs />
      </main>
    </>
  );
}
