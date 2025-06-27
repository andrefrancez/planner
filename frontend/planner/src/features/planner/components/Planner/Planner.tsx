import { useCallback, useState } from "react";
import { PlannerNavbar } from "../PlannerNavbar/PlannerNavbar.tsx";
import styles from "./Planner.module.css";
import { DayColumn } from "../DayColumn/DayColumn.tsx";
import type { Reminder } from "../../types/reminder.ts";
import { getDaysOfWeek } from "../../utils/dateUtils.ts";
import type { Priority } from "../../utils/priorityUtils.ts";
import { v4 as uuidv4 } from "uuid";

const Planner = () => {
    const [currentWeek, setCurrentWeek] = useState(new Date());
    const [reminders, setReminders] = useState<Reminder[]>([]);
    const days = getDaysOfWeek(currentWeek);

    const navigateWeek = useCallback((direction: 'prev' | 'next') => {
        setCurrentWeek(prev => {
            const newDate = new Date(prev);
            newDate.setDate(prev.getDate() + (direction === 'next' ? 7 : -7));
            return newDate;
        });
    }, []);

    const handleToday = useCallback(() => {
        setCurrentWeek(new Date());
    }, []);

    const handleAddReminder = (dayIndex: number, text: string, priority: Priority) => {
        const newReminder: Reminder = {
            id: uuidv4(),
            text,
            completed: false,
            day: dayIndex,
            priority,
            createdAt: Date.now(),
        };

        setReminders((prev) => [...prev, newReminder]);
    };

    const handleToggleReminder = (id: string) => {
        setReminders((prev) =>
            prev.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r))
        );
    };

    const handleEditReminder = (id: string, newText: string, priority: Priority) => {
        setReminders((prev) =>
            prev.map((r) => (r.id === id ? { ...r, text: newText, priority } : r))
        );
    };

    const handleDeleteReminder = (id: string) => {
        setReminders((prev) => prev.filter((r) => r.id !== id));
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <PlannerNavbar
                    currentWeek={currentWeek}
                    onPreviousWeek={() => navigateWeek('prev')}
                    onNextWeek={() => navigateWeek('next')}
                    onToday={handleToday}
                />

                <div className={styles.grid}>
                    {days.map((day, index) => {
                        const remindersForDay = reminders.filter((r) => r.day === index);

                        return (
                            <DayColumn
                                key={index}
                                date={day}
                                dayIndex={index}
                                reminders={remindersForDay}
                                onAddReminder={handleAddReminder}
                                onToggleReminder={handleToggleReminder}
                                onEditReminder={handleEditReminder}
                                onDeleteReminder={handleDeleteReminder} />
                        );
                    })}
                </div>
            </div>

            <div className={styles.footer}>
            </div>
        </div>
    )
}

export default Planner;