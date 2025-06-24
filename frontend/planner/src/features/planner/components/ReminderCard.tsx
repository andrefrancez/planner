import type { Reminder } from "../types/reminder";

interface ReminderCardProps{
    reminder: Reminder;
}

const ReminderCard = ({reminder}: ReminderCardProps) => {
    return(
        <div>
            <strong>{reminder.title}</strong>
            {reminder.hour && <div>Hora: {reminder.hour}</div>}
            <div>Importância: {reminder.priority}</div>
            {reminder.notes && <div>Obs: {reminder.notes}</div>}
        </div>
    );
}

export default ReminderCard;