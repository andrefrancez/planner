import { addDays, format, startOfWeek } from "date-fns"

export const getWeekDates = (): string[] => {
    const start = startOfWeek(new Date(), { weekStartsOn: 1 });
    
    return Array.from({ length: 7 }, (_, i) => {
        const day = addDays(start, i);
        return format(day, 'yyyy-MM-dd');
    });
};