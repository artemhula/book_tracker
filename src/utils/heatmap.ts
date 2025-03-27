type HeatmapCell = { date: string; pages: number };

export const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function parseDateUTC(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

export function toSortedCells(data: Record<string, number>): HeatmapCell[] {
  return Object.keys(data)
    .sort((a, b) => a.localeCompare(b))
    .map((date) => ({ date, pages: data[date] }));
}

export function createGrid(cells: HeatmapCell[]): {
  firstRow: number;
  columns: number;
} {
  if (!cells.length) return { firstRow: 1, columns: 1 };
  const firstWeekdayUTC = parseDateUTC(cells[0].date).getUTCDay();
  const firstRow = firstWeekdayUTC + 1;
  const columns = Math.ceil((firstRow - 1 + cells.length) / 7);
  return { firstRow, columns };
}
