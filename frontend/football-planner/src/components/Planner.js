import React, { Component } from 'react'
import MonthYearNavbar from './MonthYearNavbar'
import Week from './Week'

export default class Planner extends Component {
    constructor(props) {
        super(props)

        this.state = { date: new Date() }
    }

    lastWeek = () => {
        this.setState((prevState) => {
            const toLastWeek = new Date(prevState.date)
            toLastWeek.setDate(prevState.date.getDate() - 7)
            return { date: toLastWeek }
        })
    }

    nextWeek = () => {
        this.setState((prevState) => {
            const toNextWeek = new Date(prevState.date)
            toNextWeek.setDate(prevState.date.getDate() + 7)
            return { date: toNextWeek }
        })
    }

    render() {
        const { date } = this.state

        return (
            <div>
                <MonthYearNavbar
                    currentMonth={date.getMonth() + 1}
                    currentYear={date.getFullYear()}
                    onLastWeek={this.lastWeek}
                    onNextWeek={this.nextWeek}
                >
                </MonthYearNavbar>

                <Week currentDate={date}>
                </Week>
            </div>
        )
    }
}