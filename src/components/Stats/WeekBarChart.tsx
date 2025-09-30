import { Bar, ResponsiveContainer, BarChart, XAxis, Tooltip } from 'recharts';

type Props = {
  data: Record<string, number>;
};

export default function WeekBarChart({ data }: Props) {
  const chartData = Object.entries(data).map(([day, pages]) => ({
    day: new Date(day).toLocaleDateString('en-US', { weekday: 'short' }),
    pages,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} title="Total Pages">
        <XAxis
          dataKey="day"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 15, fill: '#64748b' }}
        />
        <Tooltip
          contentStyle={{
            borderRadius: 10,
            background: 'white',
            border: 'none',
            boxShadow: '0 2px 8px #0001',
          }}
        />
        <Bar dataKey="pages" fill="#ff701d" radius={[10, 10, 10, 10]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
