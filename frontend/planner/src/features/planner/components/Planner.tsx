import {getWeekDates} from '../utils/dateUtils';
import DayColumn from './DayColumn';
import { usePlanner } from '../hooks/usePlanner';

const Planner = () => {
    const week = getWeekDates();
    const { addReminder, getRemindersByDay} = usePlanner();

    return (
        <div style={{display: 'flex', gap:'1rem'}}>
            {week.map((date) => (
                <DayColumn 
                    key={date}
                    date={date}
                    reminders={getRemindersByDay(date)}
                    onAddReminder={addReminder}
                />
            ))}
        </div>
    )
}

export default Planner;