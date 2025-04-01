import React from "react";
import ChatGptModal from './ChatGptModal.js'
import "../layout/navbar/AppNavbar.css"

const MonthSelector = ({ currentMonth, currentYear, onLastWeek, onNextWeek }) => {
    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril',
        'Maio', 'Junho', 'Julho', 'Agosto',
        'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ]

    return (
        <>
            <div className="navbar">
                <div className="nav-group">
                    <button className="nav-button" onClick={onLastWeek}>
                        &lt; Semana anterior
                    </button>
                </div>

                <span className="nav-title">
                    {months[currentMonth - 1]} / {currentYear}
                </span>

                <div className="nav-group">
                    <ChatGptModal />
                    <button className="nav-button" onClick={onNextWeek}>
                        Próxima semana &gt;
                    </button>
                </div>
            </div>
        </>

    )
}

export default MonthSelector