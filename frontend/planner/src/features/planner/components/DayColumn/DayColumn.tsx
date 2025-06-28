import { isToday } from "date-fns";
import type { Reminder } from "../../types/reminder";
import { priorityOrder, type Priority } from "../../utils/priorityUtils";
import styles from "./DayColumn.module.css";
import { formatDate } from "../../utils/dateUtils";
import { ReminderItem } from "../ReminderItem/ReminderItem";
import { AddReminderForm } from "../AddReminderForm/AddReminderForm";

interface DayColumnProps {
    date: Date;
    dayIndex: number;
    reminders: Reminder[];
    onAddReminder: (dayIndex: number, text: string, priority: Priority) => void;
    onToggleReminder: (id: string) => void;
    onEditReminder: (id: string, newText: string, priority: Priority) => void;
    onDeleteReminder: (id: string) => void;
}

const dayNames = [
    'Dom', 'Seg', 'Ter', 'Qua',
    'Qui', 'Sex', 'Sáb',
]

export const DayColumn = ({ date, dayIndex, reminders, onAddReminder, onToggleReminder, onEditReminder, onDeleteReminder }: DayColumnProps) => {
    const completed = reminders.filter(r => r.completed).length;
    const total = reminders.length;
    const isCurrentDay = isToday(date);

    const sortedReminders = [...reminders].sort((a, b) => {
        if (a.completed !== b.completed) {
            return a.completed ? 1 : -1;
        }

        const aPriority = priorityOrder.indexOf(a.priority);
        const bPriority = priorityOrder.indexOf(b.priority);

        if (aPriority !== bPriority) {
            return aPriority - bPriority;
        }

        return a.createdAt - b.createdAt;
    });

    const getCounterClass = () => {
        if(completed === total){
            return styles.completedCounter;
        }

        if(isCurrentDay){
            return styles.currentDayCounter;
        }

        return styles.defaultCounter;
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.dayName}>
                    {dayNames[dayIndex]}
                </div>

                <div>
                    <div>
                        {formatDate(date)}
                    </div>
                    {total > 0 && (
                        <div className={`${getCounterClass()}`}>
                            {completed}/{total}
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.reminderItemContainer}>
                {sortedReminders.map((reminder) => (
                   <ReminderItem key={reminder.id} reminder={reminder} onToggle={onToggleReminder} onEdit={onEditReminder} onDelete={onDeleteReminder} /> 
                ))}

                <AddReminderForm onAdd={(text, priority) => onAddReminder(dayIndex, text, priority)} />
            </div>
        </div>
    )
}