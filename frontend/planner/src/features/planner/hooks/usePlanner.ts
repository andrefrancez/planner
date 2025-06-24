import { useState } from "react";
import type { Reminder } from "../types/reminder";

export const usePlanner = () => {
    const [reminders, setReminders] = useState<Reminder[]>([]);

    const addReminder = (reminder: Reminder) => {
        setReminders((prev) => [...prev, reminder]);
    };

    const getRemindersByDay = (day: string) => reminders.filter((r) => r.day === day);

    return {
        reminders,
        addReminder,
        getRemindersByDay,
    };
}