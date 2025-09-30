import type { Statistic } from '../../models/Statistic';
import WeekBarChart from './WeekBarChart';

export default function WeekStatistic(stats: Statistic) {
  return (
    <div className="min-w-40 lg:w-[45%] h-64 lg:h-90">
      <p className="text-lg text-center text-gray-800">
        Pages read per week: <b>{stats.totalPages}</b>
      </p>

      <WeekBarChart data={stats.pagesPerDays} />
    </div>
  );
}
