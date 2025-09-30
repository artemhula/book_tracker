import { useState } from 'react';
import { createGrid, toSortedCells, weekDays } from '../../utils/heatmap';

type Props = { data: Record<string, number> };

export default function MonthHeatMap({ data }: Props) {
  const [hovered, setHovered] = useState<{
    x: number;
    y: number;
    date: string;
    pages: number;
  } | null>(null);

  const cells = toSortedCells(data);

  const { firstRow, columns } = createGrid(cells);

  return (
    <div className="relative flex">
      <div className="flex flex-col mr-2">
        {weekDays.map((wd) => (
          <div
            key={wd}
            className="h-[35px] lg:h-[40px] flex items-center justify-end pr-1 text-gray-500"
            style={{ minWidth: 28 }}
          >
            {wd}
          </div>
        ))}
      </div>

      <div
        className="grid gap-[3px] lg:gap-[5px]"
        style={{
          gridTemplateRows: 'repeat(7, 1fr)',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridAutoFlow: 'column',
        }}
      >
        {cells.map((cell, idx) => {
          const intensity =
            cell.pages > 30
              ? 'bg-orange-500'
              : cell.pages > 15
              ? 'bg-orange-400'
              : cell.pages > 0
              ? 'bg-orange-200'
              : 'bg-gray-200';

          return (
            <div
              key={cell.date}
              className={`w-8 h-8 lg:w-9 lg:h-9 rounded-lg ${intensity} cursor-pointer`}
              style={idx === 0 ? { gridRowStart: firstRow } : undefined}
              onMouseEnter={(e) =>
                setHovered({
                  x: e.clientX,
                  y: e.clientY,
                  date: cell.date,
                  pages: cell.pages,
                })
              }
              onMouseLeave={() => setHovered(null)}
            />
          );
        })}
      </div>

      {hovered && (
        <div
          className="fixed bg-white px-4 py-4 rounded-lg shadow text-md pointer-events-none z-50"
          style={{
            top: hovered.y - 40,
            left: hovered.x - 20,
          }}
        >
          {hovered.date} <br />
          <span className="text-orange-500">pages: {hovered.pages}</span>
        </div>
      )}
    </div>
  );
}
