import { format } from "date-fns";
import type { Reminder } from "../types/reminder";
import ReminderCard from "./ReminderCard";
import ReminderForm from "./ReminderForm";

interface DayColumnProps {
    date: string;
    reminders: Reminder[];
    onAddReminder: (r: Reminder) => void;
}

const DayColumn = ({ date, reminders, onAddReminder }: DayColumnProps) => {
    return (
        <div>
            <h3>{format(new Date(date), 'EEE dd MMM')}</h3>
            <div>
                {reminders.map((reminder) => (
                    <ReminderCard key={reminder.id} reminder={reminder} />
                ))}
            </div>
            <ReminderForm date={date} onAdd={onAddReminder} />
        </div>
    )
}

export default DayColumn;