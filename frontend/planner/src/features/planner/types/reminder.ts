import type { Priority } from "../utils/priorityUtils";

export interface Reminder {
    id:string;
    text: string;
    priority: Priority;
    completed: boolean;
    day: number;
    createdAt: number;
}

export interface WeekData {
    reminders: Reminder[];
    currentWeek: Date;
}