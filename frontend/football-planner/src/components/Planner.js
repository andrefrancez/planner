import React, { useState } from 'react'
import MonthNavbar from './MonthYearNavbar'
import Week from './Week'

const Planner = () => {
    const [date, setDate] = useState(new Date())

    return (
        <div>
            <MonthNavbar
                currentMonth={date.getMonth() + 1}
                currentYear={date.getFullYear()}
            >
            </MonthNavbar>
            <div>
                <Week></Week>
            </div>
        </div>
    )
}

export default Planner