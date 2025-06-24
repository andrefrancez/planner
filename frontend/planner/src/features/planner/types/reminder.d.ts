export type Priority = 'baixa' | 'media' | 'alta';

export interface Reminder {
    id:string;
    title: string;
    priority: Priority;
    hour?: string;
    notes?: string;
    day: string;
}