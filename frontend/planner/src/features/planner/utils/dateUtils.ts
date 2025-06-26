export const getDaysOfWeek = (date: Date): Date[] => {
  const start = new Date(date);
  start.setDate(start.getDate() - start.getDate());

  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(start);
    day.setDate(start.getDate() + i);
    return day;
  });
};

export const formatDate = (date: Date): string => date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' });

export const formatWeekRange = (start: Date): string => {
  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  const sameMonth =
    start.toLocaleDateString('pt-BR', { month: 'short' }) ===
    end.toLocaleDateString('pt-BR', { month: 'short' });

  if (sameMonth) {
    return `${start.getDate()} - ${end.getDate()} ${start.toLocaleDateString('pt-BR', { month: 'short' })}`;
  }

  return `${start.getDate()} ${start.toLocaleDateString('pt-BR', { month: 'short' })} - ${end.getDate()} ${end.toLocaleDateString('pt-BR', { month: 'short' })}`;
};

export const isToday = (date: Date): boolean =>
  new Date().toDateString() === date.toDateString();

export const getWeekKey = (date: Date): string => {
  const start = new Date(date);
  start.setDate(start.getDate() - start.getDay());
  return start.toISOString().split('T')[0];
};