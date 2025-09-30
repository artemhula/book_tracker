import type { Statistic } from '../../models/Statistic';
import MonthHeatMap from './MonthHeatMap';

export default function MonthStatistic(stats: Statistic) {
  return (
    <div className="min-w-40 lg:w-[45%] h-64 lg:h-90">
      <p className="text-lg text-center text-gray-800">
        Pages read per month: <b>{stats.totalPages}</b>
      </p>
      <div className="flex items-center justify-center h-full">
        <MonthHeatMap data={stats.pagesPerDays} />
      </div>
    </div>
  );
}
