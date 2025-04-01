import React from 'react'
import MonthSelector from "../../common/MonthSelector.js"
import "./AppNavbar.css"

const AppNavbar = ({children}) => {

    return(
        <nav className='navbar'>
            {children}
        </nav>
    )
}

export default AppNavbar