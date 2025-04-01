import React, {useState} from 'react'
import Week from './Week.js'
import MonthSelector from './common/MonthSelector.js'

const Planner = () => {
    const [date, setDate] = useState(new Date())

    const lastWeek = () => {
        setDate((prevDate) => {
            const toLastWeek = new Date(prevDate)
            toLastWeek.setDate(prevDate.getDate() - 7)
            return toLastWeek
        })
    }

    const nextWeek = () => {
        setDate((prevDate) => {
            const toNextWeek = new Date(prevDate)
            toNextWeek.setDate(prevDate.getDate() + 7)
            return toNextWeek
        })
    }

    return (
        <div>
            <MonthSelector 
                currentMonth={date.getMonth() + 1}
                currentYear={date.getFullYear()}
                onLastWeek={lastWeek}
                onNextWeek={nextWeek}
            />

            <Week currentDate={date} />
        </div>
    )
}

export default Planner